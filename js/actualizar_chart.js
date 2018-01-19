// IDEA: traer un array de [paisA, paisB, paisC] para poder mostrar más de un país a la vez
var years = [];

function actualizarChart(year, paisA, paisB, sel, base) {
  var cant = 2015 - year;

  for(var i = 0; i < cant + 1; i++) {
    years[i] = parseInt(year) + i;
  }

  CHART.data.labels = years;
  CHART.data.datasets[0].data = paisA;
  CHART.data.datasets[1].data = paisB;
  CHART.data.datasets[0].label = base;
  CHART.data.datasets[1].label = sel;
  CHART.update();
}
