const carouselSlide = document.getElementById("carouselSlide");

const images = document.querySelectorAll(".carousel-slide img");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const dotsContainer = document.getElementById("dotsContainer");

const carousel = document.getElementById("carousel");

let currentIndex = 0;

let autoSlide;

let isTransitioning = false;

// Handle single image gracefully
if(images.length <= 1){

    prevBtn.style.display = "none";

    nextBtn.style.display = "none";
}

// Create dots dynamically
images.forEach((_, index) => {

    const dot = document.createElement("div");

    dot.classList.add("dot");

    if(index === 0){

        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {

        goToSlide(index);
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Update slide position
function updateCarousel(){

    carouselSlide.style.transform =
        `translateX(-${currentIndex * 800}px)`;

    updateDots();
}

// Update active dot
function updateDots(){

    dots.forEach(dot => {

        dot.classList.remove("active");
    });

    dots[currentIndex].classList.add("active");
}

// Go to next slide
function nextSlide(){

    if(isTransitioning) return;

    isTransitioning = true;

    currentIndex++;

    // Loop back after last image
    if(currentIndex >= images.length){

        currentIndex = 0;
    }

    updateCarousel();

    setTimeout(() => {

        isTransitioning = false;

    }, 500);
}

// Go to previous slide
function prevSlide(){

    if(isTransitioning) return;

    isTransitioning = true;

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = images.length - 1;
    }

    updateCarousel();

    setTimeout(() => {

        isTransitioning = false;

    }, 500);
}

// Jump to specific slide
function goToSlide(index){

    if(isTransitioning) return;

    isTransitioning = true;

    currentIndex = index;

    updateCarousel();

    setTimeout(() => {

        isTransitioning = false;

    }, 500);
}

// Button events
nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);

// Auto slide
function startAutoSlide(){

    autoSlide = setInterval(() => {

        nextSlide();

    }, 3000);
}

// Pause on hover
carousel.addEventListener("mouseenter", () => {

    clearInterval(autoSlide);
});

carousel.addEventListener("mouseleave", () => {

    startAutoSlide();
});

// Start auto sliding
startAutoSlide();