const cardContainer = document.getElementById("cardContainer");

const loader = document.getElementById("loader");

let page = 1;

let isLoading = false;

// Create real content card
function createCard(id){

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
        <div class="card-header">

            <div class="avatar"></div>

            <div>
                <h3>User ${id}</h3>
                <p>Posted just now</p>
            </div>

        </div>

        <div class="content">

            <p>
                This is dynamically loaded content card number ${id}.
                Infinite scrolling is working properly.
            </p>

        </div>
    `;

    return card;
}

// Create skeleton loader card
function createSkeleton(){

    const skeleton = document.createElement("div");

    skeleton.className = "skeleton-card";

    skeleton.innerHTML = `
        <div class="skeleton-header">

            <div class="skeleton skeleton-avatar"></div>

            <div>

                <div class="skeleton skeleton-line line1"></div>

                <div class="skeleton skeleton-line line2"></div>

            </div>

        </div>

        <div class="skeleton skeleton-line line3"></div>

        <div class="skeleton skeleton-line line4"></div>

        <div class="skeleton skeleton-line line5"></div>
    `;

    return skeleton;
}

// Show skeleton loaders
function showSkeletons(){

    for(let i = 0; i < 3; i++){

        loader.appendChild(createSkeleton());
    }
}

// Remove skeleton loaders
function removeSkeletons(){

    loader.innerHTML = "";
}

// Load new cards
function loadCards(){

    if(isLoading) return;

    isLoading = true;

    showSkeletons();

    // Simulate API delay
    setTimeout(() => {

        removeSkeletons();

        for(let i = 1; i <= 5; i++){

            const card = createCard((page - 1) * 5 + i);

            cardContainer.appendChild(card);
        }

        page++;

        isLoading = false;

    }, 1500);
}

// Infinite scroll detection
window.addEventListener("scroll", () => {

    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    // Near bottom
    if(scrollTop + clientHeight >= scrollHeight - 100){

        loadCards();
    }
});

// Initial load
loadCards();