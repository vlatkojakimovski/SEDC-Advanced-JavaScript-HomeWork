let navService = {
    navItems: document.getElementsByClassName("nav-item"),
    navSearch: document.getElementById("citySearchInput"),
    searchBtn: document.getElementById("citySearchBtn"),
    pages: document.getElementById("pages").children,
    tempHtml: document.getElementById("tempHtml"),
    humHtml: document.getElementById("humHtml"),
    windHtml: document.getElementById("windHtml"),
    ajaxCallsCount: [0,'0',0,{}], // [daily counter, minute, yearly counter, object]
    nextBtn: document.getElementById("nextBtn"),
    prevBtn: document.getElementById("prevBtn"),


    activateItem: function(item) {
        for (let navItem of this.navItems) {
            navItem.classList.remove("active")
        }
        item.classList.add("active")
    },
    showPage: function(page) {
        for (let pageElement of this.pages) {
            pageElement.style.display = "none"
        }
        page.style.display = "block"
    },
    registerNavListeners: function() {
        for (let i = 0; i < this.navItems.length; i++) {
            this.navItems[i].addEventListener("click", function() {
                navService.activateItem(this)
                navService.showPage(navService.pages[i])
            })
        }
        this.searchBtn.addEventListener("click", function(event) {
            event.preventDefault()
            weatherService.city = navService.navSearch.value
            weatherService.getData()
        })
        

    },
    currentDate: function () {
        let dateObj = new Date();
        return {
            month: dateObj.getMonth()+1,
            day: dateObj.getDate(),
            hour: dateObj.getHours(),
            minute: dateObj.getMinutes()
        }
    },
    clearAjaxCounter: function() {
        if(navService.ajaxCallsCount[1]!==navService.currentDate().minute){
            navService.ajaxCallsCount[0]=0;
            navService.ajaxCallsCount[1]=navService.currentDate().minute;
            console.log("Resetting daily AJAX calls counter to 0 ");
        }
        if (
         navService.ajaxCallsCount[3].month > navService.currentDate().month
         && navService.ajaxCallsCount[3].day > navService.currentDate().day
        ){
            navService.ajaxCallsCount[2]=0;
            navService.ajaxCallsCount[3].month = navService.currentDate().month;
            navService.ajaxCallsCount[3].day = navService.currentDate().day;
        }
    },
    
}

navService.ajaxCallsCount[1] = navService.currentDate().minute;
navService.ajaxCallsCount[3] = navService.currentDate();

let weatherService = {
    apiKey: "74e59f6374abe0d9b758877616ae444c",
    city: "skopje",
    apiUrl: "https://api.openweathermap.org/data/2.5/forecast",
    itemsToShow: 10,
    startItemsToShow: 0,


    getData: async function () {
        // $.ajax({
        //     url: `${this.apiUrl}?q=${this.city}&units=metric&appid=${this.apiKey}`,
        //     success: function(response) {
            navService.clearAjaxCounter();
        if (navService.ajaxCallsCount[2] <= 1000000) {
            if (navService.ajaxCallsCount[0] <= 60) {
                uiService.toggleLoader(true);
                let data = await fetch(
                    `${this.apiUrl}?q=${this.city}&units=metric&appid=${this.apiKey}`
                );
                let response = await data.json();
                uiService.toggleLoader(false);

                console.log(response);
                uiService.loadStatistics(response);
                
                let tempResult = helperService.chunkArray(response.list,this.itemsToShow);
                console.log(tempResult[0]);

                uiService.loadHourlyTable(response);
                uiService.statisticsCity.innerHTML = response.city.name;
                uiService.hdCity.innerHTML = response.city.name;
                // Sorting by Temperature, Humidity or Wind
                navService.tempHtml.addEventListener("click", function () {
                    helperService.sortByHumOrWindOrTemp(response, "temp");
                    uiService.loadHourlyTable(response);
                });
                navService.humHtml.addEventListener("click", function () {
                    helperService.sortByHumOrWindOrTemp(response, "humidity");
                    uiService.loadHourlyTable(response);
                });
                navService.windHtml.addEventListener("click", function () {
                    helperService.sortByHumOrWindOrTemp(response, "wind");
                    uiService.loadHourlyTable(response);
                });
                navService.ajaxCallsCount[0]++;
                navService.ajaxCallsCount[2]++;

                navService.nextBtn.addEventListener('click', function () {
                    console.log(weatherService.startItemsToShow);
                    if(weatherService.startItemsToShow < tempResult.length-1){
                        weatherService.startItemsToShow++;
                        uiService.loadHourlyTableSmall(tempResult[weatherService.startItemsToShow]);
                        helperService.buttonsToggle(weatherService.startItemsToShow)
                    }
                })
                navService.prevBtn.addEventListener('click', function () {
                    if(weatherService.startItemsToShow - weatherService.itemsToShow >= 0) {
                        console.log(`Start items to show before reduce: ${weatherService.startItemsToShow}`);
                        weatherService.startItemsToShow -= weatherService.itemsToShow;
                        console.log(`Start items to show after reduce: ${weatherService.startItemsToShow}`);
                    } else{ alert("This is first page")}
                    console.log(`Load Hourly Table`);
                    uiService.loadHourlyTable(response);
                })

                // console.log(`AJAX Counter: = ${navService.ajaxCallsCount} `);

                // console.log(`AJAX Counter: = ${navService.ajaxCallsCount} `);
            } else console.log(`You have reached the minute limit to 60 API calls`);
        } else {console.log(`You have reached the monthly limit to 1000000 API calls`);

        }
    },

    //         error: function(error) {
    //             console.log("The request has failed")
    //             console.log(error.responseText)
    //         }
    //     })
    // },
    aggregateStatistics: function (data) {
        let temperatureSum = 0;
        let highestTemperature = data.list[0];
        let lowestTemperature = data.list[0];
        let humiditySum = 0;
        let highestHumidity = data.list[0];
        let lowestHumidity = data.list[0];

        for (let reading of data.list) {
            temperatureSum += reading.main.temp;
            humiditySum += reading.main.humidity;

            if (highestTemperature.main.temp < reading.main.temp) {
                highestTemperature = reading;
            }

            if (highestTemperature.main.temp > reading.main.temp) {
                lowestTemperature = reading;
            }

            if (highestHumidity.main.humidity < reading.main.humidity) {
                highestHumidity = reading;
            }

            if (lowestHumidity.main.humidity > reading.main.humidity) {
                lowestHumidity = reading;
            }
        }

        return {
            temperature: {
                highest: highestTemperature.main.temp,
                average: temperatureSum / data.list.length,
                lowest: lowestTemperature.main.temp,
            },
            humidity: {
                highest: highestHumidity.main.humidity,
                average: humiditySum / data.list.length,
                lowest: lowestHumidity.main.humidity,
            },
            warmentsTime: helperService.unixTimeStampToDate(
                highestTemperature.dt
            ),
            coldestTime: helperService.unixTimeStampToDate(
                lowestTemperature.dt
            ),
        };
    },
};

let uiService = {
    statisticResult: document.getElementById("statisticsResult"),
    tableResult: document.getElementById("tableResult"),
    hdCity: document.getElementById("hdCity"),
    statisticsCity: document.getElementById("statisticsCity"),
    loader: document.getElementById("loader"),
    loadStatistics: function(data) {
        let statisticsData = weatherService.aggregateStatistics(data)
        this.statisticResult.innerHTML = `
            <div class="mb-5">
                <div class="row">
                    <div class="col-md-6">MAX TEMP: ${Math.round(statisticsData.temperature.highest)} C</div>
                    <div class="col-md-6">MAX HUMD: ${statisticsData.humidity.highest} %</div>
                </div>
                <div class="row">
                    <div class="col-md-6">AVG TEMP: ${statisticsData.temperature.average.toFixed(1)} C</div>
                    <div class="col-md-6">AVG HUMD: ${statisticsData.humidity.average} %</div>
                </div>
                <div class="row">
                    <div class="col-md-6">LOW TEMP: ${Math.round(statisticsData.temperature.lowest)} C</div>
                    <div class="col-md-6">LOW HUMD: ${statisticsData.humidity.lowest} %</div>
                </div>
            </div>
            <h4>Warmest time of the following period: ${statisticsData.warmentsTime.toDateString()} </h4>
            <h4>Coldest time of the following period: ${statisticsData.coldestTime.toDateString()} </h4>
        `
    },
    loadHourlyTableSmall: function(data) {
        this.tableResult.innerHTML = ""
            console.log(`In load Hourly Table function !!!`);
            console.log(data);
            for(let i = weatherService.startItemsToShow; i < weatherService.startItemsToShow + weatherService.itemsToShow; i++){
            this.tableResult.innerHTML += `
                <div class="row table">
                <div class="col-md-2">
                    <img src="http://openweathermap.org/img/w/${data[i].weather[0].icon}.png" alt="weahter-icon">
                </div>
                    <div class="col-md-2">${data[i].weather[0].description}</div>
                    <div class="col-md-2">${helperService.unixTimeStampToDate(data[i].dt).toDateString()}</div>
                    <div class="col-md-2">${data[i].main.temp} C (${data[i].main.feels_like} C)</div>
                    <div class="col-md-2">${data[i].main.humidity}</div>
                    <div class="col-md-2">${data[i].wind.speed}</div>
                </div>
            `;
        }
    },
    loadHourlyTable: function(data) {
        this.tableResult.innerHTML = ""
        // for (let reading of data.list) {
        //     // for(let i = navService.startItemsToShow; i < navService.itemsToShow){
        //     this.tableResult.innerHTML += `
        //         <div class="row table">
        //         <div class="col-md-2">
        //             <img src="http://openweathermap.org/img/w/${reading.weather[0].icon}.png" alt="weahter-icon">
        //         </div>
        //             <div class="col-md-2">${reading.weather[0].description}</div>
        //             <div class="col-md-2">${helperService.unixTimeStampToDate(reading.dt).toDateString()}</div>
        //             <div class="col-md-2">${reading.main.temp} C (${reading.main.feels_like} C)</div>
        //             <div class="col-md-2">${reading.main.humidity}</div>
        //             <div class="col-md-2">${reading.wind.speed}</div>
        //         </div>
        //     `
        // }
        // for (let reading of data.list) {
            console.log(`In load Hourly Table function !!!`);
            console.log(data);
            for(let i = weatherService.startItemsToShow; i < weatherService.startItemsToShow + weatherService.itemsToShow; i++){
            this.tableResult.innerHTML += `
                <div class="row table">
                <div class="col-md-2">
                    <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" alt="weahter-icon">
                </div>
                    <div class="col-md-2">${data.list[i].weather[0].description}</div>
                    <div class="col-md-2">${helperService.unixTimeStampToDate(data.list[i].dt).toDateString()}</div>
                    <div class="col-md-2">${data.list[i].main.temp} C (${data.list[i].main.feels_like} C)</div>
                    <div class="col-md-2">${data.list[i].main.humidity}</div>
                    <div class="col-md-2">${data.list[i].wind.speed}</div>
                </div>
            `;
        }
    },
    toggleLoader: function(toggle) {
        if (toggle) this.loader.style.display = "block";
        else this.loader.style.display = "none";
    },
}



let helperService = {
    unixTimeStampToDate: function(unixTimeStamp) {
        return new Date(unixTimeStamp * 1000)
    },
// Helper method for sorting table results by temperature humidity and wind speed
    sortByHumOrWindOrTemp: function(obj, value){
        if (value === 'temp'){
            function compare(a,b){
                return a.main.temp - b.main.temp;
            }
        } else if (value === 'humidity'){
            function compare(a,b){
                return a.main.humidity - b.main.humidity;
            }
        }else if ( value === 'wind') {
            function compare(a,b){
                return a.wind.speed - b.wind.speed;
            }
        }
        obj.list.sort(compare);
    },

    chunkArray: function (myArray, chunk_size){
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];
        
        for (index = 0; index < arrayLength; index += chunk_size) {
            myChunk = myArray.slice(index, index+chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }
    
        return tempArray;
    },

    buttonsToggle: function (position){
        if(position === weatherService.tempResult) {
            navService.nextBtn.disabled = true ; 
        } else if (position === 0){
            navService.prevBtn.disabled = true ;
        } else {
            navService.nextBtn.disabled = false ; 
            navService.prevBtn.disabled = false ;
        }
    }


}

function selectedVal (sel) {
    weatherService.itemsToShow = parseInt(sel.options[sel.selectedIndex].text);
    console.log(weatherService.itemsToShow);
}

navService.registerNavListeners()
weatherService.getData()