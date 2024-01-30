const API = "88e9c03db26b4558bfc323ba24d2d42b";
const url ="https://newsapi.org/v2/everything?q=";


window.addEventListener("load" , ()=>fetchNews("India"));
async function fetchNews(query){
   const res = await fetch(`${url}${query}&apiKey=${API}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(element){

    const cardsContainer = document.getElementById("cards_container");
    const NewsTemplate = document.getElementById("template_news_card");
    cardsContainer.innerHTML=" ";

    element.forEach(ele => {
        if(!ele.urlToImage)  return;
        const cardClone =NewsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone , ele);
        cardsContainer.appendChild(cardClone);
    });
   
}

function fillDataInCard(cardClone , ele){
    const newsImg = cardClone.querySelector("#news_img");
    const newstitle = cardClone.querySelector("#news_title");

    const newssrc = cardClone.querySelector("#news_source");

    const newsdesc = cardClone.querySelector("#news_desc");
    newsImg.src=ele. urlToImage;
    newstitle.innerHTML=ele.title;
    newsdesc.innerHTML=ele.description;
    const date = new Date(ele.publishedAt).toLocaleString("en-us" ,{
        timeZone:"Asia/Jakarta"
    });
    newssrc.innerHTML =`${ele.source.name} • ${date}`;
    cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(ele.url ,"_blank")
    })
}

let curSlecteIteam = null;
function onNavClick(id){
     fetchNews(id);
    const navIteam = document.getElementById(id);
    curSlecteIteam?.classList.remove('active');
    curSlecteIteam = navIteam;
    curSlecteIteam.classList.add('active');
}
const search_btn = document.getElementById("search_btn");
const input = document.getElementById("news_input");
search_btn.addEventListener('click' ,()=>{
    const query = input.value;
    if(!query)  return;
    fetchNews(query);
    curSlecteIteam?.classList.remove('active');

})

function reload(){
    window.location.reload();
}