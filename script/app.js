//select dom elements
const productContainer = document.getElementById("procduct-container");
const searchInput = document.getElementById('search-input');
const showAllContainer = document.getElementById('show-all-container')

const loading = document.getElementById('loading-container')

//load data
const loadData = async (searchText = '13', isShowAll) => {
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
            <button onclick = "handleShowDetails('${phones.slug}')"
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

const handleShowDetails = async (id) => {
  const res = await fetch (` https://openapi.programming-hero.com/api/phone/${id}`);

  const data = await res.json();
  console.log(data);

  const phone = data.data;

  //
  showphonsDetails(phone)
}

const showphonsDetails = (phone) =>{
  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
  <div class = 'flex justify-center'>
  <img src="${phone.image}" alt="">
  </div>
  <p class = 'font-medium text-2xl mt-3'>${phone.name} </p>
  <p class = ''>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <p> <span class = 'font-medium'>Storage :</span> ${phone?.mainFeatures?.storage}</p>
  <p> <span class = 'font-medium'>Display : </span>${phone?.mainFeatures?.displaySize}</p>
  <p> <span class = 'font-medium'>Chepset : </span> ${phone?.mainFeatures?.chipSet}</p>
  <p> <span class = 'font-medium'>slug : </span> ${phone?.slug}</p>
  <p> <span class = 'font-medium'>Relase Date : </span> ${phone?.releaseDate || 'not found' }</p>
  <p> <span class = 'font-medium'>Brand: </span> ${phone?.brand}</p>
  <p> <span class = 'font-medium'>Gps: </span> ${phone?.others?.GPS || 'not found'}</p>

  `
  console.log(phone)
  //
  show_details_modal.showModal();
}

const searchHandle = (isShowAll) => {
  const searchText = searchInput.value;
  if(searchText === ''){
    toggleLoading(false)
  }else{
    toggleLoading(true)
  }
    loadData(searchText, isShowAll);
}
loadData();

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


