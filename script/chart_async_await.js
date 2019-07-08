let submitButton = document.getElementById("chart-button");
let currency = document.getElementById("currency");
let startDate = document.getElementById("start-date"); // "dd-mm-yyyy"
let endDate = document.getElementById("end-date"); // "dd-mm-yyyy"
let containerForChart = document.querySelector(".container-for-chart");
const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=";
const ONE_DAY = 86400000;
let newD, startDay, endDay, endData;


submitButton.addEventListener('click', () => {
  startDay = Date.parse(startDate.value);
  endDay = Date.parse(endDate.value);
  let fullURL = defineURL(startDay);
  endData = [];
  
  handlerData(fullURL, endData, startDay, endDay);
})



async function handlerData(URL, array, start, end){
  let data = await getDataRequest(URL);
  let dataArray = await dataProcessing(data)
  let newDate = await checkDate(start, end)
  array.push(dataArray);
  return newDate;
}

function checkDate(start, end){
  if(start < end){
    start += ONE_DAY
    handlerData(defineURL(start), endData, start, endDay);  // return URL with next day
  }else{
    endData.sort((a, b)=> a[0] - b[0]);
    createChart(endData)
  }
}

async function getDataRequest(URL) {
  let responce = await fetch(URL);
  let data = await responce.json();
  return data
}

function dataProcessing(data) {
  let temporaryArr = [];
  let dataDate = data[0].exchangedate.split('.');
  let correctDate = new Date(dataDate[2], dataDate[1] - 1, dataDate[0]); // month -1, cause January = 0;
  temporaryArr.push(correctDate.getTime() + 10800000);
  temporaryArr.push(data[0].rate);
  console.log(temporaryArr)
  return temporaryArr;
}


function defineURL(date) {
  let thisDate = new Date(date);
  let day = (thisDate.getDate() < 10) ? "0" + thisDate.getDate() : thisDate.getDate();
  let month = (thisDate.getMonth() < 10) ? "0" + (thisDate.getMonth() + 1) : thisDate.getMonth();
  let _URL = `${BASE_URL}${currency.value}&date=${thisDate.getFullYear()}${month}${day}&json`
  return _URL;
}

/*Function create a chart in the end with final data */
function createChart(data) {
  Highcharts.chart("container-chart", {
    chart: {
      style: "fontFamily: 'Roboto', sans-serif",
      zoomType: "x"
    },
    title: {
      text: "UAH to " + currency.value.toUpperCase() + " exchange rate over time"
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        "Click and drag in the plot area to zoom in" : "Pinch the chart to zoom in"
    },
    xAxis: {
      type: "datetime"
    },
    yAxis: {
      title: {
        text: "Exchange rate"
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
            [
              1,
              Highcharts.Color(Highcharts.getOptions().colors[0])
              .setOpacity(0)
              .get("rgba")
            ]
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
      type: "area",
      name: "UAH to " + currency.value.toUpperCase(),
      data: data
    }]
  });
}