const searchInput =
document.getElementById("searchInput");

const results =
document.getElementById("results");

const products = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Grapes",
    "Watermelon",
    "Pineapple",
    "Strawberry",
    "Kiwi",
    "Papaya",
    "Cherry",
    "Blueberry"
];


// Render List

function renderItems(items){

    results.innerHTML = "";

    if(items.length === 0){

        results.innerHTML =
        "<li>No results found</li>";

        return;
    }

    items.forEach(item => {

        const li =
        document.createElement("li");

        li.textContent = item;

        results.appendChild(li);
    });

}


// Initial Render

renderItems(products);


// Search Function

function searchProducts(query){

    const filteredProducts =
    products.filter(product =>

        product
        .toLowerCase()
        .includes(
            query.toLowerCase()
        )
    );

    renderItems(filteredProducts);
}


// Debounce Function

function debounce(callback, delay){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };
}


// Debounced Search

const debouncedSearch =
debounce(searchProducts, 300);


// Input Event

searchInput.addEventListener(
    "input",
    (event) => {

        debouncedSearch(
            event.target.value
        );

    }
);
