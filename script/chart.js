let submitButton = document.getElementById('chart-button');
let currency = document.getElementById('currency');
let startDate = document.getElementById('start-date');     // "dd-mm-yyyy"
let endDate = document.getElementById('end-date');         // "dd-mm-yyyy"
let finalData = [];



submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    finalData = [];
    let currencyValue = currency.value.toUpperCase();
    let countDay = miliToCountDate(calcRangeDate(startDate, endDate));
    let startDateSplit = startDate.value.split('-'); // ["dd", "mm", "yyyy"]
    let newDate = new Date(startDateSplit[0], startDateSplit[1] - 1, startDateSplit[2]); // Tue Jun 25 2019 12:48:44 GMT+0300 (Eastern European Summer Time)
    let iteration = 0;
    timeoutCycle();

    function timeoutCycle() {
        if (iteration < countDay) {
            let dayRequest = new Date(newDate.getFullYear(),
                newDate.getMonth(), newDate.getDate() + iteration)
            dateToString(dayRequest);

            $.ajax({
                type: "GET",
                url: "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=" +
                    currencyValue + "&date=" + dateToString(dayRequest) + "&json",
                dataType: "json",
               // async: false,
                success: function (data) {
                    let temporaryArr = [];
                    if (data.length != 0) {                    // check if data exist
                        let dateArr = data[0].exchangedate.split('.');
                        let correctDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);

                        temporaryArr.push(correctDate.getTime()); 
                        temporaryArr.push(data[0].rate);
                        finalData.push(temporaryArr);
                        iteration++;
                        setTimeout(timeoutCycle, 3);
                    } else {                                  // else make request again without iteration++
                        setTimeout(timeoutCycle, 3);
                    }
                }
            });
        } else {
            finalData.sort(function (a, b) {                  // sort all data in the end
                return (a[0] - b[0]);
            });

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

        } //end else
    } // end timeoutCycle



}); //end add eventListener

/*convert date to correct request string */
function dateToString(date) {
    let dateStr = '';
    dateStr += date.getFullYear();
    (date.getMonth() < 10) ? dateStr += "0" + (date.getMonth() + 1) : dateStr += date.getMonth() + 1;
    (date.getDate() < 10) ? dateStr += "0" + date.getDate() : dateStr += date.getDate();
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

// TODO do this normall
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
document.getElementById("start-date").setAttribute("max", today);



 