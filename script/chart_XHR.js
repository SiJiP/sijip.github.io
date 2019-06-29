let submitButton = document.getElementById('chart-button');
let currency = document.getElementById('currency');
let startDate = document.getElementById('start-date'); // "dd-mm-yyyy"
let endDate = document.getElementById('end-date'); // "dd-mm-yyyy"
let finalData = [];
let curVal = currency.value;
let iteration = 0;
let containerForChart = document.querySelector('.container-for-chart');
const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode="




endDate.addEventListener('change', function () {
    startDate.setAttribute("max", endDate.value)
});
startDate.addEventListener('change', function(){
    endDate.setAttribute('min', startDate.value )
});

submitButton.addEventListener('click', function () {
    appendChart();
    finalData = [];
    let countDay = miliToCountDate(calcRangeDate(startDate, endDate));
    let startDateSplit = startDate.value.split('-');                                     // ["dd", "mm", "yyyy"]                                
    let newDate = new Date(startDateSplit[0], startDateSplit[1] - 1, startDateSplit[2]); /* newDate need for add date +1 day every iteration*/
    iteration = 0;
    timeoutCycle();


    function timeoutCycle() {
        if (iteration <= countDay) {
            let dayRequest = new Date(newDate.getFullYear(),
                newDate.getMonth(), newDate.getDate() + iteration);
            let stringDate = dateToString(dayRequest);
            let _URI = `${BASE_URL}${curVal}&date=${stringDate}&json`;
            XHRrequest(_URI);

            function XHRrequest(URI) {
                let XHR = new XMLHttpRequest();
                XHR.open("GET", URI);
                XHR.send();

                XHR.addEventListener("readystatechange", function () {
                    if ((XHR.readyState === 4) && (XHR.status === 200)) {
                        let data = JSON.parse(XHR.responseText);
                        let temporaryArr = [];
                        if (data[0] != undefined) { // check if data exist
                            let dateArr = data[0].exchangedate.split('.');
                            let correctDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);


                            temporaryArr.push(correctDate.getTime() + 86400000);    //HighChart accepts date in milliseconds
                            temporaryArr.push(data[0].rate);
                            finalData.push(temporaryArr);
                            iteration++;
                            setTimeout(timeoutCycle, 3);
                        } else {                                                    // show error massage
                            document.querySelector('.loader').remove();
                            let error = new Error('Something went wrong! Please try again...');
                            let err = document.createElement('div');
                            err.className = 'error-massage';
                            err.innerText = error.message;
                            document.querySelector('#container-chart').appendChild(err);
                            console.log(error);
                        }
                    }
                }, false);
            }
        } else {
            finalData.sort(function (a, b) { // sort all data in the end
                return (a[0] - b[0]);
            });
            createChart();                   // call function what create chart after sort

        }
    }
});

/* Create chart dashboard */
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


document.getElementById("end-date").setAttribute("max", definesToday());
document.getElementById("start-date").setAttribute("max", definesToday());