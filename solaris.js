let chosenPlanet = [];
async function getSolarSystem() {
    let resp = await fetch('https://majazocom.github.io/Data/solaris.json');
    let planets = await resp.json();

    renderPlanetsToUi(planets)


    console.log(planets);
}
getSolarSystem();

function renderPlanetsToUi(planets) {

    let planetsContainerEl = document.querySelector('.planets-container');
    let planetsArticle = document.createElement('article')
    planetsArticle.classList.add('planets')
    planetsContainerEl.appendChild(planetsArticle)
    planets.forEach(planet => {
        let planetEl = document.createElement('section')
        planetEl.classList.add(planet.name + '-element')
        planetsArticle.appendChild(planetEl)
        planetEl.addEventListener('click',() => {
            console.log(planet);
            chosenPlanet = planet;
        })
    });

}