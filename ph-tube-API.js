//console.log("script");
const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
let selectedCategory = 1000;
const errorContainer = document.getElementById("error-element");

const callAPI = async () =>{
    const fetchData = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await fetchData.json();
    const cards =data.data;
    dynamicBtn(cards);
}

const dynamicBtn = (cards) =>{
    cards.forEach(card => {
        const newBtn = document.createElement('button');
        newBtn.classList= "category-btn btn px-[20px] text-lg font-medium";
        newBtn.innerText = card.category;
        newBtn.addEventListener('click', () => fetchDataByCategories(card.category_id));
        btnContainer.appendChild(newBtn);
    });
}

const fetchDataByCategories =async (categoryId) =>{
    selectedCategory = categoryId;
    const fetchCategory = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await fetchCategory.json();
    const idData =data.data;
    console.log(idData);
    if(idData.length === 0){
        errorContainer.classList.remove("hidden");
    } else{
        errorContainer.classList.add('hidden');
    }
    cardContainer.innerHTML='';
    idData.forEach(video => {
        let varifiedBadge = '';
        if(video.authors[0].verified){
            varifiedBadge = `<img src="./images/badge.png" class ="ml-0 w-6 h-6">`
        }
        const newCard = document.createElement('div');
        newCard.innerHTML=`
        <div class="card card-compact">
        <figure class="h-[200px]">
        <img src="${video.thumbnail}" alt="video" class="h-full  rounded-t-3xl w-full" /></figure>
        <div class="card-body">
        <div class="flex gap-3 justify-start items-start">
          <div>
          <img src="${video.authors[0].profile_picture}" class="w-8 h-8 rounded-full"> 
          </div> 
          <div>
          <h2 class="card-title">${video.title}</h2>
          <div class="flex">
          <p class="pb-[8px] w-auto inline-block">${video.authors[0].profile_name}</p>
          ${varifiedBadge}
          </div>
          <p>${video.others.views}<span> Views</span></p>
          </div>
          </div>
          <div>
          </div>
        </div>
      </div>`
        cardContainer.appendChild(newCard);
    });
}

fetchDataByCategories(selectedCategory)
callAPI();

