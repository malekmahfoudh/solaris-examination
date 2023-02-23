let planets = [];
let planetsContainerEl = document.querySelector('.planets-container');
const searchInput = document.querySelector('#search-input')
let currenPlanetIndex;

async function getSolarSystem() {
    try {
        let resp = await fetch('https://majazocom.github.io/Data/solaris.json');
        let fetchedPlanets = await resp.json();
        planets = fetchedPlanets;
        renderPlanetsToUi(fetchedPlanets)
    }
    catch(error) {
        console.log(error);
    }
}
getSolarSystem();

function renderPlanetsToUi(planets) {
    let planetsArticle = document.createElement('article');
    planetsArticle.classList.add('planets')
    planetsContainerEl.appendChild(planetsArticle)
    planets.forEach(planet => {
        let planetEl = document.createElement('section')
        planetEl.classList.add(planet.name + '-element')
        planetsArticle.appendChild(planetEl)
        planetEl.addEventListener('click', () => {
            chosenPlanet = planet;
            overlayOn()
        })
    });
}

function overlayOn() {
    document.querySelector(".planets-info__overlay").style.display = "block";
    currenPlanetIndex = planets.findIndex(p => p.name === chosenPlanet.name)
    let overlayContent = `
    <article class="planet-info">
        <section class="planet-info__name-desc">
            <h2 class="chosen-planet__name">${chosenPlanet.name}</h2>
            <h3 class="chosen-planet__latin">${chosenPlanet.latinName}</h3>
            <p class="chosen-planet__desc">${chosenPlanet.desc}</p>
            <input class="expand-desc__btn" type="checkbox">
        </section>
        <div class="break-line"></div>
        <section class="planet-info__temp-dist">
            <h4>OMKRETS<br><p>${chosenPlanet.circumference} km</p></h4>
            <h4>KM FRÅN SOLEN<br><p>${chosenPlanet.distance} km</p></h4>
            <h4>MAX TEMPERATUR<br><p>${chosenPlanet.temp.day} °C</p></h4>
            <h4>MIN TEMPERATUR<br><p>${chosenPlanet.temp.night} °C</p></h4>
        </section>
        <div class="break-line"></div>
        <section class="planet-info__moons">
            <h4>MÅNAR<br>
                <p>${chosenPlanet.moons.map((moon) => `${moon}`).join(" | ")}</p>
                <input class="expand-moons__btn" type="checkbox"> 
            </h4>
        </section>
    </article>`;
    document.querySelector(".overlay-info").innerHTML = overlayContent;


}


let nextPlanet = document.querySelector('#next_btn')

nextPlanet.addEventListener('click', () => {
    console.log('click')
    overlayOn(planets[currenPlanetIndex + 1]);

})




let overlay = document.querySelector(".close-overlay")
overlay.addEventListener('click', () => {
    overlayOff()
})
function overlayOff() {
    document.querySelector(".planets-info__overlay").style.display = "none";
}



let errorMessage = document.querySelector('#error-message');
searchInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    errorMessage.innerHTML = "";
    if (event.keyCode === 13) {
        let planetIndex = planets.findIndex(planet => planet.name.toLowerCase().includes(event.target.value.toLowerCase()))
        console.log(planetIndex);
        if (planetIndex > -1) {
            chosenPlanet = planets[planetIndex]
            overlayOn()
        } else {
            errorMessage.innerHTML = 'Vänligen sök på en planet' + `<br>` + 'i vårt solsystem'
        }
    }
});



// få in rätt bild på planet i overlay
// få in planetnamn på fram och bak knapparna så man vet vilken planet som kommer före och näst 
// kunna bläddra mellan planeterna i overlay

// ::before content attr(url) <-- pysa in en kul bild
// position relative på planeten
