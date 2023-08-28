//select dom elements
const productContainer = document.getElementById("procduct-container");

//load data
const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );

  const data = await res.json();
  const phones = data.data;
  showData(phones);
};

const showData = (phones) => {
  phones.forEach((phones) => {
    console.log(phones);
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
};

loadData();
