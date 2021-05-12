//STABLE ELEMENTS
const animeList = document.getElementById("anime-list")
const animeDetail = document.querySelector('#anime-detail')
const detailImage = animeDetail.querySelector('.detail-image')
const detailName = animeDetail.querySelector('.animeName')
const detailEpisodeCount = animeDetail.querySelector('.episodes')
const animeDescription = document.querySelector('#description')
const animeLikes = document.querySelector('#likes')
const animeRating = document.querySelector('#rating')
const likeButtonContainer = document.getElementById('likeButtonContainer')
const likeButton = document.getElementById('button')
const commentRatingForm = document.querySelector('#anime-rating')

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
    animeRating.innerText = `Rating: `
     //building like button
    
     const likeButton = document.createElement('img')
     likeButton.src = "https://cpng.pikpng.com/pngl/s/167-1675201_mario-grid-aphmau-pixel-art-clipart.png"
     likeButtonContainer.innerHTML= " "
     likeButtonContainer.appendChild(likeButton)
     
   
     //LIKES FUNCTIONALITY
     
     likeButton.addEventListener('click', () => {
     
      
     animeLikes.innerText = `Likes: ${(animeObj.likes)+=1}`

     data = {likes: animeObj.likes}

     
    fetch(`http://localhost:3000/anime/${animeObj.id}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      })
      .then((r) => r.json())
      ;
})
    // ratings 
    commentRatingForm.addEventListener('submit', (e) => {
      e.preventDefault()
      animeObj.rating.push(parseInt(commentRatingForm.rating.value))
      console.log(animeObj.rating)
      const adder = (accumulator, currentValue) => accumulator + currentValue
      const ratingTotal = animeObj.rating.reduce(adder)
      const ratingArrayLength = animeObj.rating.length
      animeRating.innerText = `Rating: ${(ratingTotal / ratingArrayLength)}`
      // console.log(ratingTotal)
      // console.log(ratingArrayLength)
      fetch(`http://localhost:3000/anime/${animeObj.id}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: animeObj.rating
      }),
      })
      .then((r) => r.json())
    })
    

})
}


