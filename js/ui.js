$(document).ready(function(){

  // submit handler for the sign up form
  var sendForm = function(event){
    var form = $("#sign-up-form");
    event.preventDefault();
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr('method'),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      complete: function(jqXHR,textStatus){
        // show response message to user, on a notifacation bar
        if ( textStatus != "success" ){
          $("#thanks-for-signup .container p").html("Uh oh, something went wrong! Please try entering your information again.");
        }
        $("#sign-up-form input[name='EMAIL']").val("");
        $("#sign-up-form #privacy-check").attr("checked", false);
        $("#thanks-for-signup").slideDown(500,function(){
          setTimeout(function () {
            $("#thanks-for-signup").slideUp(500);
          }, 4000);
        });
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
    });
  };

  // if there's any missing field, unbind the submit handler
  if (  !validateForm( $("#sign-up-form") )  ){
    $("#sign-up-form").unbind("submit", sendForm);
  }

  // validate the from as user types
  $("#sign-up-form").keyup(function(event){
     if ( validateForm($(this)) ){
      $("#sign-up-form").unbind("submit", sendForm).bind("submit", sendForm);
     }
  });

  $("#privacy-check").click(function(event){
    if ( validateForm($("#sign-up-form")) ){
      $("#sign-up-form").unbind("submit", sendForm).bind("submit", sendForm);
     }
  });

  // form validator
  function validateForm(form){
    var fields = form.find("input");
    $.each(fields,function(i,field){
      var validation = $(field);
      // checkbox validation
      if ( ($(field).attr("type") == "checkbox") ){
        if ( !$(field).is(":checked") ){
          $("#privacy div").addClass("invalid-field");
          form.find("button[type='submit']").attr("disabled","");
        }else {
          $("#privacy div").removeClass("invalid-field");
        }
      }else{ // validation for other fields
        if( !field.value || ( $(field).attr("type") == "email" && !validateEmail(field.value) ) ){
            validation.addClass("invalid-field");
            form.find("button[type='submit']").attr("disabled","");
        }else {
          $(field).removeClass("invalid-field");
        }
      }
    });

    if ( $(".invalid-field").length == 0 ){
      form.find("button[type='submit']").removeAttr("disabled");
      return true;
    }else{
      return false;
    }
  }

  function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }


});
