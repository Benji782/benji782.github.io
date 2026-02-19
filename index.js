
//Card Constructor
function Card(title, medium, sourceIMG, description){
    this.title = title;
    this.medium = medium;
    this.sourceIMG = sourceIMG;
    this.description = description;
}







const project1 = new Card("Butterfly", "design", "images/butterfly.png","A simple illustration of butterflies cresting on a sunset")
const project2 = new Card("Snapped", "design", "images/snapped.jpg", "A physical ink drawing of a resting figure in wrapped bandages")
const project3 = new Card("Support", "design", "images/support.png", "A peach tree sprouts from hands of stone")
const project4 = new Card("The Nexus", "website", "images/theNexus.png", "A mock website for an assignment designed to emulate the brand identity of Meow Wolf")
const project5 = new Card("Sustainable Food Systems", "website", "images/foodSystems.png", "Professional work commissioned by the head of Sustainable Food at CSUSB")

//REMEMBER TO ADD THE PROJECT AS A CONST AND ADD TO THE ARRAY
var allCards = [project1, project2, project3, project4, project5]






//Search on load
window.addEventListener("DOMContentLoaded",function(){
    const designButton = document.getElementById("design")
    const websitesButton = document.getElementById("websites")
        designButton.addEventListener("click", function(){
            workDisplay("design")})
        websitesButton.addEventListener("click", function(){
            workDisplay("website")})
    
    
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category === "design") workDisplay("design");
    if (category === "websites") workDisplay("website")

})



//THE FILTER. Shows items on click
function workDisplay(mediumType){
    let workContainer = document.getElementById("workContainer");
    let popUp = document.getElementById("popUp");
    workContainer.innerHTML = "";
    
    for (let i = 0; i < allCards.length; i++){
        if (allCards[i].medium === mediumType){
            let cardData = allCards;
            let cardElement = document.createElement("div")
            let title = document.createElement("h3");
            title.textContent = allCards[i].title;

            let image = document.createElement("img");
            image.src = allCards[i].sourceIMG;
            image.width = 150;

            cardElement.appendChild(title);
            cardElement.appendChild(image);
            workContainer.appendChild(cardElement);

            cardElement.addEventListener("click", function(){
                popUp.innerHTML = "";
                popUp.classList.remove("hidden")
                let bigTitle = document.createElement("h2");
                    bigTitle.textContent = allCards[i].title
                let bigImage = document.createElement("img");
                    bigImage.src = allCards[i].sourceIMG;
                let description = document.createElement("p");
                    description.textContent = allCards[i].description;
                let backBtn = document.createElement("a");
                    backBtn.href = "#"
                    backBtn.textContent = "BACK";
                backBtn.addEventListener("click", function(e){
                    e.preventDefault();
                    popUp.classList.add("hidden")
                })
                popUp.appendChild(bigTitle);
                popUp.appendChild(bigImage);
                popUp.appendChild(description);
                popUp.appendChild(backBtn);

            })
        }
    }
}
