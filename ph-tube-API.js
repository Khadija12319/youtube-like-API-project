//console.log("script");
const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
let selectedCategory = 1000;

const callAPI = async () =>{
    const fetchData = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await fetchData.json();
    const cards =data.data;
    dynamicBtn(cards);
}

const dynamicBtn = (cards) =>{
    cards.forEach(card => {
        const newBtn = document.createElement('button');
        newBtn.classList= "btn px-[20px] text-lg font-medium";
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
    //console.log(idData);
    cardContainer.innerHTML='';
    idData.forEach(video => {
        const newCard = document.createElement('div');
        newCard.innerHTML=`
        <div class="card card-compact">
        <figure class="h-[200px]">
        <img src="${video.thumbnail}" alt="video" class="h-full  rounded-t-3xl w-full" /></figure>
        <div class="card-body">
          <h2 class="card-title">${video.title}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>`
        cardContainer.appendChild(newCard);
    });
}

fetchDataByCategories(selectedCategory)
callAPI();