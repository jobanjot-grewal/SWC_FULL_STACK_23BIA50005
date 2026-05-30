const itemList =
document.getElementById("itemList");

// Render 1000 items
function renderItems(){

    let html = "";

    for(let i = 1; i <= 1000; i++){

        html += `
            <li class="list-item"
                data-id="${i}">

                <span>
                    Product ${i}
                </span>

                <button
                    class="delete-btn">

                    Delete
                </button>

            </li>
        `;
    }

    itemList.innerHTML = html;
}

renderItems();


// Event Delegation
itemList.addEventListener("click",
function(event){

    if(
        event.target.classList
        .contains("delete-btn")
    ){

        const listItem =
        event.target.closest(".list-item");

        listItem.remove();
    }

});