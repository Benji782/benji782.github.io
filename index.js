function Card(title, medium, sourceIMG){
    this.title = title;
    this.medium = medium;
    this.sourceIMG = sourceIMG;
}

const example1 = new Card("exampleTitle", "website", "")
const example2 = new Card("exampleTwo", "design", "")
const example3 = new Card("exampleThree", "design", "")
var allCards = [example1, example2, example3]


const designButton = document.getElementById("design")
const websitesButton = document.getElementById("websites")

designButton.addEventListener("click", function(){
    workDisplay("design")
})
websitesButton.addEventListener("click", function(){
    workDisplay("website")
})



function workDisplay(mediumType){
    let workContainer = document.getElementById("workContainer")
    workContainer.innerHTML = "";
    for (var i = 0; i < allCards.length; i++){
        if (allCards[i].medium === mediumType){
            var cardElement = document.createElement("div")
            var title = document.createElement("h3");
            title.textContent = allCards[i].title;

            var image = document.createElement("img");
            image.src = allCards[i].sourceIMG;
            image.width = 150;

            cardElement.appendChild(title);
            cardElement.appendChild(image);
            workContainer.appendChild(cardElement);
        }
    }
}