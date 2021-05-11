//STABLE ELEMENTS
const animeList = document.getElementById("anime-list")


//FETCHING ALL ELEMENTS TO DISPLAY THEM AT THE TOP


fetch("http://localhost:3000/anime")
  .then((r) => r.json())
  .then((animesArray) => {animesArray.forEach((animeObj) => {

    renderAnime(animeObj)
      
  });

});



//RENDER ONE ANIME OBJ

function renderAnime(animeObj){
 let animeImg = document.createElement('img')
 animeImg.src = animeObj.image

animeList.appendChild(animeImg)
}
