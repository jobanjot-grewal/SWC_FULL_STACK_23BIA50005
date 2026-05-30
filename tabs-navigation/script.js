const tabButtons =
document.querySelectorAll(".tab-btn");

const contents =
document.querySelectorAll(".content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active tab
        tabButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        // Hide all content
        contents.forEach(content =>
            content.classList.remove("active-content")
        );

        // Activate clicked tab
        button.classList.add("active");

        // Get target content
        const targetId =
        button.dataset.tab;

        document
            .getElementById(targetId)
            .classList
            .add("active-content");

    });

});