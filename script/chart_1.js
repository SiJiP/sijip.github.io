// PROTOTYPE FOR CHART
// VERSION 1.0
// MAKARON STYLE


let submitButton = document.getElementById('chart-button');
let currency = document.getElementById('currency');
let startDate = document.getElementById('start-date');
let endDate = document.getElementById('end-date');
let finalArray = [];
let baseDate = new Date(0);



submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    finalArray = [];
    let currencyValue = currency.value.toUpperCase();
    let countDay = miliToCountDate(calcRangeDate(startDate, endDate)); // count of days  
    let someDate = startDate.value.split('-');
    let newDate = new Date(someDate[0], someDate[1], someDate[2] );

    for (let i = 0; i <= countDay; i++) {
        let dayRequst = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + i)
        dateToString(dayRequst);

        $.getJSON(
            "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=" + currencyValue + "&date=" + dateToString(dayRequst) + "&json",

            function (data) {
                let arr = [];
                let dateArr = data[0].exchangedate.split('.');
                let correctDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);

                arr.push(correctDate.getTime());
                arr.push(data[0].rate);
                
                finalArray.push(arr);
                finalArray.sort(function(a,b){
                    return (a[0] - b[0]);
                })
               
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
                        data: finalArray
                    }]
                })
                
                
            });
    }
})

/*convert date to correct request string */
function dateToString(date) {
    let dateStr = '';
    dateStr += date.getFullYear();
    (date.getMonth() < 10) ? dateStr += "0" + date.getMonth(): dateStr += date.getMonth();
    (date.getDate() < 10) ? dateStr += "0" + date.getDate(): dateStr += date.getDate();
    return dateStr;
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



/*copypast for max date input*/
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("end-date").setAttribute("max", today);


 
















