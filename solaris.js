let planets = [];
let planetsContainerEl = document.querySelector('.planets-container');
let currentPlanetIndex;
let overlay = document.querySelector(".close-overlay")
let nextPlanet = document.querySelector('#next_btn')
let prevPlanet = document.querySelector('#previous_btn')
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input')

//  -------------------- FETCH PLANETS FROM API FUNCTION --------------------  

async function getSolarSystem() {
    try {
        let resp = await fetch('https://majazocom.github.io/Data/solaris.json');
        fetchedPlanets = await resp.json();
        planets = fetchedPlanets;
        renderPlanetsToUi(fetchedPlanets)
    }
    catch (error) {
        console.log(error);
    }
}
getSolarSystem();

//  -------------------- RENDERING PANETS TO UI FUNCTION --------------------  

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
            overlayOn(chosenPlanet)

        })

    });
}

//  -------------------- OVERLAY FUNCTION --------------------  

function overlayOn(chosenPlanet) {
    document.querySelector(".planets-info__overlay").style.display = "block";
    console.log(chosenPlanet.name);
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

    //  -------------------- PAGINATION FUNCTION --------------------  

    nextPlanet.addEventListener('click', () => {
        let id = chosenPlanet.id;
        id = id + 1;
        planets.find(planet => {
            if (planet.id === id) {
                chosenPlanet = planet;
                console.log(id)
            }
        })
        overlayOn(chosenPlanet);
        console.log(chosenPlanet)

    })

    prevPlanet.addEventListener('click', () => {
        let id = chosenPlanet.id;
        id = id - 1;
        planets.find(planet => {
            if (planet.id === id) {
                chosenPlanet = planet;
                console.log(id)
            }
        })
        overlayOn(chosenPlanet);
        console.log(chosenPlanet)

    })


}

//  -------------------- CLOSING FUNCTION --------------------  

overlay.addEventListener('click', () => {
    overlayOff()
})
function overlayOff() {
    document.querySelector(".planets-info__overlay").style.display = "none";
}

//  -------------------- SEARCH PLANETS FUNCTION --------------------  

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