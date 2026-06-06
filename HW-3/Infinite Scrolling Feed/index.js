let feed = document.getElementById("feed");
let loader = document.getElementById("loader");

let postNumber = 1;
let isLoading = false;


function createPost() {

    let card = document.createElement("div");

    card.style.border = "1px solid black";
    card.style.margin = "10px";
    card.style.padding = "10px";

    let img = document.createElement("img");
    img.src = `https://picsum.photos/400/300?random=${postNumber}`;
    img.style.width = "100%";

    let caption = document.createElement("p");
    caption.textContent = `Post ${postNumber}`;

    card.appendChild(img);
    card.appendChild(caption);

    feed.appendChild(card);

    postNumber++;
}


function loadMoreData() {

    
    if (isLoading) {
        return;
    }

    isLoading = true;

    loader.style.display = "block";

    setTimeout(() => {

        for (let i = 0; i < 5; i++) {
            createPost();
        }

        loader.style.display = "none";

        isLoading = false;

    }, 2000);
}


loadMoreData();


window.addEventListener("scroll", () => {

    if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100
    ) {
        loadMoreData();
    }

});