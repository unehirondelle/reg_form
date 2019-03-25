$().ready(function () {
    $("#newUserForm").validate(
        {
            rules:
                {
                    firstName: {
                        required: true,
                        maxlength: 50
                    },
                    middleName: {
                        maxlength: 50
                    },
                    lastName: {
                        required: true,
                        maxlength: 50
                    },
                    username: {
                        required: true,
                        maxlength: 30
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    confirmEmail: {
                        required: true,
                        email: true,
                        equalTo: "#email"
                    },
                    address01: "required",
                    city: "required",
                    stateRegion: "required",
                    zip: "required",
                    country: "required",
                    phone: {
                        required: true,
                        /*regex: true*/
                    },
                    birthDate: "date",
                    gender: "required",
                    password: {
                        required: true,
                        /*pattern: true*/
                    },
                    confirmPassword: {
                        required: true,
                        /*pattern: true,*/
                        equalTo: "#password"
                    },
                    controlValidation02: "required"

                },
            messages: {
                firstName: {
                    required: "Please enter your firstname",
                    maxlenght: "No more than 50 alphabetic characters please"
                },
                middleName: "No more than 50 alphabetic characters please",
                lastName: {
                    required: "Please enter your firstname",
                    maxlenght: "No more than 50 alphabetic characters please"
                },
                username: {
                    required: "Please enter your username",
                    maxlength: "No more than 30 characters please"
                },
                email: {
                    required: "Please enter you email",
                    email: "Please enter a valid email"
                },
                confirmEmail: {
                    required: "Please enter you email",
                    email: "Please enter a valid email",
                    equalTo: "Your emails should match each other"
                },
                address01: "Please enter your street number",
                city: "Please enter your city name",
                stateRegion: "Please enter your state or region name. If you don't have any - type N/A",
                zip: "Please enter your zip code",
                country: "Please enter your country name",
                phone: {
                    required: "Please enter your phone number",
                    regex: "Please enter only numbers upto 12 digits"
                },
                birthDate: {
                    date: "Please enter your date of birth in the right format"
                },
                gender: "Please choose one of the options",
                password: {
                    required: "Please enter your password",
                    pattern: "Your password must consist from at least one number, one uppercase, minimum 8 characters"
                },
                confirmPassword: {
                    required: "Please enter your password",
                    pattern: "Your password must consist from at least one number, one uppercase, minimum 8 characters",
                    equalTo: "Your passwords should match each other"
                },
                controlValidation02: "You have to agree with terms and conditions"
            },
        });
    //propose username by combining firstname and lastname
     $("#username").focus(function(){
         let firstName=$("#firstName").val();
         let lastName=$("#lastName").val();
         if (firstName && lastName && !this.value){
             this.value=firstName + "." + lastName;
         }
     });
    /*$.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please, check your input"
    );*/

   /* $.validator.addMethod(
        /!* The value you can use inside the email object in the validator. *!/
        "regex",

        /!* The function that tests a given string against a given regEx. *!/
        function(value, element, regexp)  {
            /!* Check if the value is truthy (avoid null.constructor) & if it's not a RegEx. *!/
            if (regex && regexp.constructor != RegExp) {
                /!* Create a new regular expression using the regex argument. *!/
                regexp = new RegExp(regexp);
            }

            /!* Check whether the argument is global and, if so set its last index to 0. *!/
            else if (regexp.global) regexp.lastIndex = 0;

            /!* Return whether the element is optional or the result of the validation. *!/
            return this.optional(element) || regexp.test(value);
        }
    );*/
});


/*
$(function () {
    let validator = $("#customValidation").validate(
        {
            rules:
                {
                    validationCustomPhone: {
                        required: true,
                        regex: true
                    }
                },
            messages:
                {
                    validationCustomPhone: {
                        required: "Please, enter your first name",
                        regex: "Please, enter only numeric characters and spaces"
                    }
                },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please, check your input"
    );
    $("#validationCustomPhone").rules("add", {regex: "^\\d{12}$"});
    $('#validationCustomPhone').keyup(function () {
        validator.submitted["validationCustomPhone"] = "Please enter only numbers and spaces upto 12 digits";
    });
});

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
}) ();*/