const feed =
document.getElementById("feed");

const loader =
document.getElementById("loader");

let page = 1;

let isLoading = false;

// Create Post Card

function createPost(id){

    const post =
    document.createElement("div");

    post.className = "post";

    post.innerHTML = `
        <h3>Post ${id}</h3>

        <p>
            This is content for post ${id}.
            Loaded dynamically using
            infinite scrolling.
        </p>
    `;

    return post;
}


// Simulated API Call

function fetchPosts(){

    if(isLoading) return;

    isLoading = true;

    loader.style.display = "block";

    setTimeout(() => {

        for(let i = 1; i <= 5; i++){

            const postId =
            (page - 1) * 5 + i;

            feed.appendChild(
                createPost(postId)
            );
        }

        page++;

        loader.style.display = "none";

        isLoading = false;

    }, 1500);

}


// Scroll Detection

window.addEventListener(
    "scroll",
    () => {

        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if(
            scrollTop + clientHeight
            >=
            scrollHeight - 150
        ){

            fetchPosts();
        }

    }
);


// Initial Load

fetchPosts();
