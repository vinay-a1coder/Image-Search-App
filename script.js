const accessKey = "ZpPUlH_n4nKk5W_IoVUCQt2i6BjUCV4m_dqfblgf2V4";

const formEle = document.querySelector("form");
const inputEle = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    try {
        inputData = inputEle.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if(page === 1){
            searchResults.innerHTML = "";
        }
        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        })
        page++;
        if(page > 1){
            showMore.style.display = "block";
        }
    } catch (error) {
        console.log(error);
    }
    
}

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})