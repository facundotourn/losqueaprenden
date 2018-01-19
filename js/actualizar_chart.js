// IDEA: traer un array de [paisA, paisB, paisC] para poder mostrar más de un país a la vez
var years = [];

function actualizarChart(year, paisA, paisB) {
  console.log("PAIS A: ");
  console.log(paisA);

  var cant = paisA.length;

  for(var i = 0; i < cant; i++) {
    years[i] = year + i;
    console.log("Dentro del for: " + years[i]);
    console.log("CANT:" + cant);
  }

  console.log(years);

  const CHART = $("#lineChart");

  let lineChart = new Chart(CHART, {
    type: 'line',
    data: {
      labels: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
      datasets: [
        {
          label: "paisA",
          fill: true,
          lineTension: 0.2,
          backgroundColor: "rgba(75,75,192,0.4)",
          borderColor: "rgba(75,72,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,72,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,72,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: paisA
        },
        {
          label: "paisB",
          fill: true,
          lineTension: 0.2,
          backgroundColor: "rgba(0,75,192,0.4)",
          borderColor: "rgba(0,72,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(0,72,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(0,72,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: paisB
        }
      ]
    }
  });
}
