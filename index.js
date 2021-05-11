//STABLE ELEMENTS
const animeList = document.getElementById("anime-list")
const animeDetail = document.querySelector('#anime-detail')
const detailImage = animeDetail.querySelector('.detail-image')
const detailName = animeDetail.querySelector('.animeName')
const detailEpisodeCount = animeDetail.querySelector('.episodes')
const animeDescription = document.querySelector('#description')
const animeLikes = document.querySelector('#likes')
const animeRating = document.querySelector('#rating')

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
  animeImg.addEventListener('click', () => {
    detailImage.src = animeObj.image   // will change to square img later with img2
    detailName.innerText = animeObj.name 
    detailEpisodeCount.innerText = `episodes: ${animeObj.episodes}`
    animeDescription.innerText = animeObj.description
    animeLikes.innerText = `Likes: ${animeObj.likes}`
    animeRating.innerText = ``
  })
}
