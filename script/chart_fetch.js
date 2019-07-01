let submitButton = document.getElementById('chart-button');
let currency = document.getElementById('currency');
let startDate = document.getElementById('start-date'); // "dd-mm-yyyy"
let endDate = document.getElementById('end-date'); // "dd-mm-yyyy"
let finalData = [];
let iteration = 0;
let countDay = 0;
let newDate, curVal;
let containerForChart = document.querySelector('.container-for-chart');
const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode="



submitButton.addEventListener('click', function () {
    appendChart();
    finalData = [];
    curVal = currency.value;
    countDay = miliToCountDate(calcRangeDate(startDate, endDate));
    let startDateSplit = startDate.value.split('-'); // ["dd", "mm", "yyyy"]                                
    newDate = new Date(startDateSplit[0], startDateSplit[1] - 1, startDateSplit[2]); /* newDate need for add date +1 day every iteration*/
    iteration = 0;
    timeoutCycle();
})

function timeoutCycle() {
    if (iteration <= countDay) {
        let dayRequest = new Date(newDate.getFullYear(),
            newDate.getMonth(), newDate.getDate() + iteration);
        let stringDate = dateToString(dayRequest);
        let _URI = `${BASE_URL}${curVal}&date=${stringDate}&json`;
        fetchRequest(_URI);
    }
}

function fetchRequest(URI) {
    fetch(URI, {
            method: "GET",
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
            let temporaryArr = [];
            if (data[0] != undefined) { // check if data exist
                let dateArr = data[0].exchangedate.split('.');
                let correctDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);

                temporaryArr.push(correctDate.getTime() + 10800000); //HighChart accepts date in milliseconds
                temporaryArr.push(data[0].rate);
                finalData.push(temporaryArr);
                iteration++;
                setTimeout(timeoutCycle, 3);
            } 
        })
        .then(function () {
            if (iteration > countDay) {
                finalData.sort(function (a, b) { // sort all data in the end
                    return (a[0] - b[0]);
                });
                createChart();
            }
        })
        .catch(function(){
            document.querySelector('.loader').remove();
            let error = new Error('Something went wrong! Please try again...');
            let err = document.createElement('div');
            err.className = 'error-massage';
            err.innerText = error.message;
            document.querySelector('#container-chart').appendChild(err);
            throw error;
        })
}


function checkStatus(responce) {
    if (responce.status >= 200 && responce.status < 300) {
        return responce
    } else {
        let error = new Error(responce.statusText)
        error.responce = responce;
        throw error
    }
}

function parseJSON(responce) {
    return responce.json();
}


/* Create chart board */
function createChart() {
    Highcharts.chart('container-chart', {
        chart: {
            style: "fontFamily: 'Roboto', sans-serif",
            zoomType: 'x'
        },
        title: {
            text: 'UAH to ' + currency.value.toUpperCase() + ' exchange rate over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'UAH to ' + currency.value.toUpperCase(),
            data: finalData
        }]
    });
}

/*return milliseconds of range date */
function calcRangeDate(startEl, endEl) {
    let startResult = Date.parse(startEl.value);
    let endResult = Date.parse(endEl.value);
    return endResult - startResult;
}

/* convert milliseconds to digit days */
function miliToCountDate(milliseconds) {
    let seconds = milliseconds / 1000;
    let minutes = seconds / 60;
    let hour = minutes / 60;
    let day = hour / 24;
    return day;
}

/*convert date to correct request string */
function dateToString(date) {
    let dateStr = '';
    dateStr += date.getFullYear();
    (date.getMonth() < 9) ? dateStr += "0" + (date.getMonth() + 1): dateStr += date.getMonth() + 1;
    (date.getDate() < 9) ? dateStr += "0" + date.getDate(): dateStr += date.getDate();
    return dateStr;
}

/*add chart or loader to page */
function appendChart() {
    if (document.querySelector('#container-chart')) {
        document.querySelector('#container-chart').remove();
    }

    let chartContainer = document.createElement('div');
    let loader = document.createElement('div');

    chartContainer.setAttribute('id', 'container-chart');
    containerForChart.appendChild(chartContainer);
    loader.className = "loader";
    chartContainer.appendChild(loader);
}

function definesToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

endDate.addEventListener('change', function () {
    startDate.setAttribute("max", endDate.value)
});
startDate.addEventListener('change', function () {
    endDate.setAttribute('min', startDate.value)
});

document.getElementById("end-date").setAttribute("max", definesToday());
document.getElementById("start-date").setAttribute("max", definesToday());