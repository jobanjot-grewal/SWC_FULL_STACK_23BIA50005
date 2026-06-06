const form =
document.getElementById("loginForm");

const email =
document.getElementById("email");

const password =
document.getElementById("password");

const emailError =
document.getElementById("emailError");

const passwordError =
document.getElementById("passwordError");


// -------------------------
// REUSABLE VALIDATORS
// -------------------------

function validateRequired(value){

    return value.trim() !== "";
}

function validateEmail(email){

    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

function validatePassword(password){

    // Minimum:
    // 8 chars
    // 1 uppercase
    // 1 lowercase
    // 1 digit
    // 1 special char

    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return passwordRegex.test(password);
}

function clearErrors(){

    emailError.textContent = "";
    passwordError.textContent = "";
}


// -------------------------
// FORM SUBMIT
// -------------------------

form.addEventListener("submit",
function(event){

    event.preventDefault();

    clearErrors();

    let isValid = true;

    // EMAIL REQUIRED

    if(
        !validateRequired(email.value)
    ){

        emailError.textContent =
        "Email is required";

        isValid = false;
    }

    else if(
        !validateEmail(email.value)
    ){

        emailError.textContent =
        "Invalid email format";

        isValid = false;
    }

    // PASSWORD REQUIRED

    if(
        !validateRequired(password.value)
    ){

        passwordError.textContent =
        "Password is required";

        isValid = false;
    }

    else if(
        !validatePassword(password.value)
    ){

        passwordError.textContent =
        "Password must contain at least 8 characters, uppercase, lowercase, digit and special character";

        isValid = false;
    }

    if(isValid){

        alert("Login Successful");

        form.reset();
    }

});
