//select dom elements
const productContainer = document.getElementById("procduct-container");
const searchInput = document.getElementById('search-input');
const showAllContainer = document.getElementById('show-all-container')

const loading = document.getElementById('loading-container')

//load data
const loadData = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );

  const data = await res.json();
  const phones = data.data;
  showData(phones, isShowAll);
};

const showData = (phones, isShowAll) => {
    productContainer.textContent = '';
    if( phones.length > 10 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }

    if(!isShowAll){
      phones = phones.slice(0,10)

    }
    console.log('is show all', isShowAll)
  phones.forEach((phones) => {
    // console.log(phones);
    const cards = document.createElement("div");
    cards.classList = `bg-white rounded-xl border`;
    cards.innerHTML = `
    <div class="px-5 py-3 rounded-xl space-y-5">
    <div class="bg-slate-100 p-10 rounded-xl flex justify-center">
        <img src="${phones.image}" alt="">
    </div>
    <div class="font-roboto text-center">
        <h3 class = 'font font-medium text-lg '>${phones.phone_name}</h3>
        <p> Brand : ${phones.brand}</p>
    </div> 
    <div class="flex justify-center items-center">
        <div>
            <button
            class="lg:p-3 p-3 md:p-3 bg-gradient-to-r from-[#A4BC46] to-[#85A019] text-white font-semibold border-0 rounded-xl"
          >
           Show Details
          </button>
        </div>
    </div>
    </div>
    
    `;
    productContainer.appendChild(cards);
  });
  toggleLoading(false)
};

const searchHandle = (isShowAll) => {
  const searchText = searchInput.value;
  if(searchText === ''){
    toggleLoading(false)
  }else{
    toggleLoading(true)
  }
    loadData(searchText, isShowAll);
}

const toggleLoading = (isLoading) =>{
  if (isLoading) {
    
    loading.classList.remove('hidden')
  }else{
    loading.classList.add('hidden')

  }
}

const showAllHandle = () => {
  searchHandle(true)
}


