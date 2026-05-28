const textInput = document.getElementById("textInput");

const charCount = document.getElementById("charCount");

const submitBtn = document.getElementById("submitBtn");

const MAX_LIMIT = 200;

textInput.addEventListener("input", updateCounter);

function updateCounter(){

    // Handle pasted large text
    if(textInput.value.length > MAX_LIMIT){

        textInput.value = textInput.value.substring(0, MAX_LIMIT);
    }

    const currentLength = textInput.value.length;

    const remaining = MAX_LIMIT - currentLength;

    // Update remaining text
    charCount.textContent =
        `${remaining} characters remaining`;

    // Remove previous warning classes
    charCount.classList.remove("warning");
    charCount.classList.remove("danger");

    // Warning colors
    if(currentLength >= 160 && currentLength < 180){

        charCount.classList.add("warning");
    }

    else if(currentLength >= 180){

        charCount.classList.add("danger");
    }

    // Enable submit only if valid
    if(currentLength > 0 && currentLength <= MAX_LIMIT){

        submitBtn.disabled = false;
    }

    else{

        submitBtn.disabled = true;
    }
}

submitBtn.addEventListener("click", function(){

    const text = textInput.value.trim();

    // Prevent empty submit
    if(text === ""){

        alert("Input cannot be empty!");

        return;
    }

    alert("Post Submitted Successfully!");

    // Clear textarea
    textInput.value = "";

    updateCounter();
});