let navigationService = {
    peopleBtn: document.getElementById("peopleBtn"),
    shipBtn: document.getElementById("shipsBtn"),
    planetsBtn: document.getElementById("planetsBtn"),
    nextBtn: document.getElementById("nextBtn"),
    previousBtn: document.getElementById("prevBtn"),
    currentPage: 1,
    pageType: "",
    tempRes: "",
    ajaxCallsCount: [0,''],

    registerListeners: function () {
        this.ajaxCallsCount[1] = this.currentDate();
        this.peopleBtn.addEventListener("click", function () {
            if (navigationService.pageType === "people") return;

            uiService.toggleLoader(true);
            starWarsApiService.getPeople(1);
            navigationService.currentPage = 1;
            navigationService.pageType = "people";
        }),
            this.shipBtn.addEventListener("click", function () {
                if (navigationService.pageType === "ships") return;

                uiService.toggleLoader(true);
                starWarsApiService.getShips(1);
                navigationService.currentPage = 1;
                navigationService.pageType = "ships";
            }),
            this.planetsBtn.addEventListener("click", function () {
                if (navigationService.pageType === "planets") return;

                uiService.toggleLoader(true);
                starWarsApiService.getPlanets(1);
                navigationService.currentPage = 1;
                navigationService.pageType = "planets";
            }),
            this.nextBtn.addEventListener("click", this.nextPage),
            this.previousBtn.addEventListener("click", this.previousPage);
    },
    nextPage: function () {
        navigationService.currentPage++;
        uiService.toggleLoader(true);
        if (navigationService.pageType === "people")
            starWarsApiService.getPeople(navigationService.currentPage);
        if (navigationService.pageType === "ships")
            starWarsApiService.getShips(navigationService.currentPage);
        if (navigationService.pageType === "planets")
            starWarsApiService.getPlanets(navigationService.currentPage);
    },
    previousPage: function () {
        navigationService.currentPage--;
        uiService.toggleLoader(true);
        if (navigationService.pageType === "people")
            starWarsApiService.getPeople(navigationService.currentPage);
        if (navigationService.pageType === "ships")
            starWarsApiService.getShips(navigationService.currentPage);
        if (navigationService.pageType === "planets")
            starWarsApiService.getPlanets(navigationService.currentPage);
    },
    navButtonsCheck: function (response) {
        if (response.next === null) {
            this.nextBtn.style.display = "none";
        } else {
            this.nextBtn.style.display = "block";
        }

        if (response.previous === null) {
            this.previousBtn.style.display = "none";
        } else {
            this.previousBtn.style.display = "block";
        }
    },
    // Sorting current 10 results and load
    sortingResults: function () {
        console.log(tempRes);
        console.log(typeof tempRes);
        function compareName(a, b) {
            const name1 = a.name.toUpperCase();
            const name2 = b.name.toUpperCase();

            let comparison = 0;
            if (name1 > name2) {
                comparison = 1;
            } else if (name1 < name2) {
                comparison = -1;
            }
            return comparison;
        }
        tempRes.sort(compareName);
        if (navigationService.pageType === "people") {
            uiService.loadPeoplePage(tempRes);
        } else if (navigationService.pageType === "ships") {
            uiService.loadShipsPage(tempRes);
        } else if (navigationService.pageType === "planets") {
            uiService.loadPlanetsPage(tempRes);
        }
    },
    currentDate: function () {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        return year + "/" + month + "/" + day;
    },
    clearAjaxCounter: function() {
        if(navigationService.ajaxCallsCount[1]!==navigationService.currentDate()){
            navigationService.ajaxCallsCount[0]=0;
            console.log("Resetting daily AJAX calls counter to 0 ");
        } else {
            // console.log("Still is same day");
        }
    }
};

let starWarsApiService = {
    url: "https://swapi.dev/api/",
    getPeople: function (page) {
        let peopleUrl = `${this.url}people/?page=${page}`;
        navigationService.clearAjaxCounter();
        if (navigationService.ajaxCallsCount[0] < 10) {
            $.ajax({
                url: peopleUrl,
                success: function (response) {
                    //console.log("success")
                    //console.log(response)
                    navigationService.ajaxCallsCount[0]++;
                    console.log(navigationService.ajaxCallsCount[0]);
                    navigationService.navButtonsCheck(response);
                    uiService.loadPeoplePage(response.results);
                    tempRes = response.results;
                },
                error: function (response) {
                    console.warn("error has occured");
                    uiService.loadError();
                },
                complete: function () {
                    uiService.toggleLoader(false);
                },
            });
        } else {
            alert("Sorry you reached your day limit ajax calls");
        }
    },
    getShips: function (page) {
        let shipsUrl = `${this.url}starships/?page=${page}`;
        navigationService.clearAjaxCounter();
        if (navigationService.ajaxCallsCount[0] < 10) {
            console.log(navigationService.ajaxCallsCount);
            $.ajax({
                url: shipsUrl,
                success: function (response) {
                    //console.log("success")
                    //console.log(response)
                    navigationService.ajaxCallsCount[0]++;
                    navigationService.navButtonsCheck(response);
                    uiService.loadShipsPage(response.results);
                    tempRes = response.results;
                },
                error: function (response) {
                    console.warn("error has occured");
                    uiService.loadError();
                },
                complete: function () {
                    uiService.toggleLoader(false);
                },
            });
        } else {
            alert("Sorry you reached your day limit ajax calls");
        }
    },
    getPlanets: function (page) {
        let planetUrl = `${this.url}planets/?page=${page}`;
        navigationService.clearAjaxCounter();
        if (navigationService.ajaxCallsCount[0] < 10) {
            console.log(navigationService.ajaxCallsCount);
            $.ajax({
                url: planetUrl,
                success: function (response) {
                    //console.log("success")
                    //console.log(response)
                    navigationService.ajaxCallsCount[0]++;
                    navigationService.navButtonsCheck(response);
                    uiService.loadPlanetsPage(response.results);
                    tempRes = response.results;
                },
                error: function (response) {
                    console.warn("error has occured");
                    uiService.loadError();
                },
                complete: function () {
                    uiService.toggleLoader(false);
                },
            });
        } else {
            alert("Sorry you reached your day limit ajax calls");
        }
    },
};

let uiService = {
    resultElement: document.getElementById("result"),
    loader: document.getElementById("loader"),
    loadPeoplePage: function(data) {
        this.resultElement.innerHTML = "";
        this.resultElement.innerHTML += `
            <div class="row yellow padding">
                <div class="col-md-3 nameSort" onclick="navigationService.sortingResults()">Name</div>
                <div class="col-md-2">Height</div>
                <div class="col-md-2">Mass</div>
                <div class="col-md-2">Gender</div>
                <div class="col-md-2">Birth Year</div>
                <div class="col-md-1">Films</div>
            </div>
        `;
        for (let person of data) {
            this.resultElement.innerHTML += `
            <div class="row white padding">
                <div class="col-md-3">${person.name}</div>
                <div class="col-md-2">${person.height}</div>
                <div class="col-md-2">${person.mass}</div>
                <div class="col-md-2">${person.gender}</div>
                <div class="col-md-2">${person.birth_year}</div>
                <div class="col-md-1">${person.films.length}</div>
            </div>
            `;
        }
    },
    loadShipsPage: function(data) {
        this.resultElement.innerHTML = "";
        this.resultElement.innerHTML += `
            <div class="row yellow padding">
                <div class="col-md-3 nameSort" onclick="navigationService.sortingResults()">Name</div>
                <div class="col-md-2">Model</div>
                <div class="col-md-2">Manufacturer</div>
                <div class="col-md-2">Cost</div>
                <div class="col-md-2">Capacity</div>
                <div class="col-md-1">Class</div>
            </div>
        `;
        for (let ship of data) {
            this.resultElement.innerHTML += `
            <div class="row white padding">
                <div class="col-md-3">${ship.name}</div>
                <div class="col-md-2">${ship.model}</div>
                <div class="col-md-2">${ship.manufacturer}</div>
                <div class="col-md-2">${ship.cost_in_credits}</div>
                <div class="col-md-2">${ship.passengers}</div>
                <div class="col-md-1">${ship.starship_class}</div>
            </div>
            `;
        }
    },
    loadPlanetsPage: function(data) {
        this.resultElement.innerHTML = "";
        this.resultElement.innerHTML += `
            <div class="row yellow padding">
                <div class="col-md-3 nameSort" onclick="navigationService.sortingResults()">Name</div>
                <div class="col-md-2">Diameter</div>
                <div class="col-md-2">Climate</div>
                <div class="col-md-2">Gravity</div>
                <div class="col-md-2">Terrain</div>
                <div class="col-md-1">Population</div>
            </div>
        `;
        for (let planet of data) {
            this.resultElement.innerHTML += `
            <div class="row white padding">
                <div class="col-md-3">${planet.name}</div>
                <div class="col-md-2">${planet.diameter}</div>
                <div class="col-md-2">${planet.climate}</div>
                <div class="col-md-2">${planet.gravity}</div>
                <div class="col-md-2">${planet.terrain}</div>
                <div class="col-md-1">${planet.population}</div>
            </div>
            `;
        }
    },
    loadError: function(){
        this.resultElement.innerHTML = `
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <img src="src/img/error.gif" alt="Error is occured" class="center small">
            </div>
            <div class="col-md-3"></div>
        </div>
        <div class="row yellow padding">
            <div class="col-md-3"></div>
            <div class="col-md-6 yellow padding" >THE SHEEP ENGINE IS BROKEN, PLEASE TRY AGAIN LATER ...</div>
            <div class="col-md-3"></div>
        </div>
        `;
    },
    toggleLoader: function(toggle) {
        if (toggle) this.loader.style.display = "block";
        else this.loader.style.display = "none";
    }
}

navigationService.registerListeners()

// console.log(navigationService.currentDate());
// console.log(navigationService.ajaxCallsCount);