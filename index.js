//STABLE ELEMENTS
const animeList = document.getElementById("anime-list")
const animeDetail = document.querySelector('#anime-detail')
const detailImage = animeDetail.querySelector('.detail-image')
const detailName = animeDetail.querySelector('.animeName')
const detailEpisodeCount = animeDetail.querySelector('.episodes')
const animeDescription = document.querySelector('#description')
const animeLikes = document.querySelector('#likes')
const likeButtonContainer = document.getElementById('likeButtonContainer')
const likeButton = document.getElementById('button')
const commentSection = document.getElementById('commentSection')
const formContainer = document.getElementById('formContainer')
const videoContainer = document.querySelector('#videoContainer')

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
    commentSection.innerHTML = " "//will clear the comment section after each click
    detailImage.src = animeObj.image   // will change to square img later with img2
    detailName.innerText = animeObj.name 
    detailEpisodeCount.innerText = `episodes: ${animeObj.episodes}`
    animeDescription.innerText = animeObj.description
    animeLikes.innerText = `Likes: ${animeObj.likes}`
    
    //animeRating.innerText = `Rating:`
     
    //building like button
    
    const likeButton = document.createElement('img')
    likeButton.src = "https://cpng.pikpng.com/pngl/s/167-1675201_mario-grid-aphmau-pixel-art-clipart.png"
    likeButton.dataset.id = animeObj.id
    likeButtonContainer.innerHTML= " "
    likeButtonContainer.appendChild(likeButton)
     
    //building submission form
    formContainer.innerHTML = " "
    const commentRatingForm = document.createElement('form')
    commentRatingForm.innerHTML = `<label for="rating">Rating: </label>
    <input type="text" name="rating" id="rating" value="Insert Rating out of 10" onfocus = 'this.value = ""'/>
    <label for="comment">Comment: </label>
    <textarea name="comment" id="comment" onfocus = 'this.value = ""'>Insert Comment Here</textarea>
    <input type="submit" value="submit" />`
     
    const animeRating = document.querySelector('#rating')
    const adder = (accumulator, currentValue) => accumulator + currentValue
    const ratingTotal = animeObj.rating.reduce(adder)
    const ratingArrayLength = animeObj.rating.length
    animeRating.innerText = `Rating: ${(ratingTotal / ratingArrayLength)}`
     
    formContainer.appendChild(commentRatingForm)


    // VIDEO FUNCTIONALITY
    
      videoContainer.innerHTML = ''
      const animeVideo = document.createElement('div')
      animeVideo.innerHTML = animeObj.video
      videoContainer.appendChild(animeVideo)
    

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
      .then((r) => r.json())})
    

    // FORM FUNCTIONALITY


    commentRatingForm.addEventListener('submit', (e) => {
          e.preventDefault()
        
          animeObj.rating.push(parseInt(commentRatingForm.rating.value))
          animeObj.comment.push(commentRatingForm.comment.value)

          console.log(animeObj)
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
                        rating: animeObj.rating,
                        comment: animeObj.comment
                      }),
                      })
                      .then((r) => r.json())
                      .then((newAnimeObj) => {
                          //Getting ARRAY OF COMMENTS INTO THEIR CONTAINER AT THE BOTTOM
                            commentSection.innerHTML = " "
                            newAnimeObj.comment.forEach((indyComment)=>{
                            
                                    let commenth4 = document.createElement('h4')
                                    commenth4.innerText = `"${indyComment}"`
                                    commentSection.appendChild(commenth4)})
                                
                            //GETTING ARRAY OF RATINGS INTO THEIR ANIMERATING.INNERTEXT    
                                
                                // const newRatingTotal = newAnimeObj.rating.reduce(adder)
                                // const newRatingArrayLength = newAnimeObj.rating.length
                                // animeRating.innerText = `Rating: ${(newRatingTotal / newRatingArrayLength)}`
                                
                                
                                })
                            
                            
                       })//end of form functionality
    
})






}

