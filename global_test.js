var pbisBase = [];
var pbisSel = [];

var canvas = $("#lineChart");
var CHART = new Chart(canvas, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: '',
        fill: true,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        pointBorderColor: "rgba(75,72,192,1)",
        pointHoverBackgroundColor: "rgba(75,72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        data: []
      },
      {
        label: '',
        fill: true,
        backgroundColor: "rgba(0,75,192,0.4)",
        borderColor: "rgba(0,72,192,1)",
        pointBorderColor: "rgba(0,72,192,1)",
        pointHoverBackgroundColor: "rgba(0,72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        data: []
      }
    ]
  },
  options: {
    responsive: true
  }
});

Chart.defaults.global.maintainAspectRatio = false;
// se crea el chart, pelado

$(document).ready( function () {
  // Click en el botón "Aceptar"
  $('#button-aceptar').on("click", function() {
    $("#paises").empty();
    var pais = $('input#input-pais').val();
    var year = $('input#input-year').val();
    var size = 2015 - year;

    if($.trim(pais) != '' && $.trim(year) != '') {
      // NOTE: Agregar un selector para los países
      $("#year-group").removeClass("has-error");
      $("#pais-group").removeClass("has-error");
      $("#input-year").prop("disabled", true);
      $("#input-pais").prop("disabled", true);
      $("#button-aceptar").addClass("disabled");
      $("#button-cambiar").removeClass("disabled");

      // trae los países que lo superaron
      $.post('ajax/cajanegra.php', {ctry: pais, yr: year}, function(data) {
        $('#mini-titulo').text(data.split('.')[0]);

        var paisesRes = data.split('.')[1].split('/');

        for(var i = 0; i < paisesRes.length - 1; i++) {
          $("#paises").append('<li role="presentation" class="list-element" id="' + i + '"><a class="btn">' + paisesRes[i] + '</a></li>');
        }
      });

      // agrega el nombre del pais base a la tabla
      $("#basetable").append("<td>" + pais + "</td>");

      // le pasa los años relevantes a la tabla
      $("#htable").append("<th></th>");
      for(var i = 0; i < size + 1; i++) {
        $("#htable").append("<th>" + (parseInt(year) + i) + "</th>");
        years[i] = parseInt(year) + i;
      }

      // trae los PBIs del país base y los tira a la lista, que todavía está oculta
      $.post("ajax/comparar.php", {ctryBase: pais, yr: year}, function(data) {
        var pbiString = data.split('/');

        for(var i = 0; i < size + 1; i++) {
          pbisBase[i] = parseFloat(pbiString[i]);
          $("#basetable").append("<td>" + pbisBase[i] + "</td>");
          CHART.data.datasets[0].label = pais;
          CHART.data.datasets[0].data = pbisBase;
          CHART.data.labels = years;
          CHART.update();
        }
// le pasa la data y el nombre del pais base y los años al grafico

      });



    }


    // mostrar error en los campos de input en caso de estar vacíos
    if($.trim(pais) == '') {
      $("#pais-group").addClass("has-error");
    } else {
      $("#pais-group").removeClass("has-error");
    }
    if($.trim(year) == '') {
      $("#year-group").addClass("has-error");
    } else {
      $("#year-group").removeClass("has-error");
    }
  });

  // Selección de un país de la lista
  $("#paises").on("click", "li", function() {

    $("#objetivo").removeClass("hidden");

    // Sacarle la visualización de activo a todos los elementos de la lista de paises
    $(".list-element").removeClass("active");

    // Ponerle la visualización de activo al país que se seleccionó
    $(this).addClass("active");

    // Vaciar tabla
    $("#seltable").empty();
    // NOTE: solo borrar header y base cuando se modifica

    var selected = $(this).text();
    var base = $("#input-pais").val();
    var year = $("#input-year").val();
    var size = 2015 - year;

    $("#seltable").append("<td>" + selected + "</td>");

    // al clickear un pais de la lista, trae los PBIs
    $.post("ajax/comparar.php", {ctryBase: selected, yr: year}, function(data) {
      var pbiString = data.split('/');

      for(var i = 0; i < size + 1; i++) {
        pbisSel[i] = parseFloat(pbiString[i]);
        $("#seltable").append("<td>" + pbisSel[i] + "</td>");
      }


      CHART.data.datasets[1].data = pbisSel;
      CHART.data.datasets[1].label = selected;
      CHART.update();

    });




    // Mostrar el chart
   $("#compare-chart").removeClass("hidden");
  });

  // Click en el botón "Modificar"
  $("#button-cambiar").on("click", function() {
    $("#input-year").prop("disabled", false);
    $("#input-pais").prop("disabled", false);
    $("#paises").empty();
    $("#mini-titulo").text("");
    $("#button-cambiar").addClass("disabled");
    $("#button-aceptar").removeClass("disabled");
    $("#objetivo").addClass("hidden");
    $("#compare-chart").addClass("hidden");
    $("#htable").empty();
    $("#basetable").empty();

    while(CHART.data.labels.length > 0) {
       CHART.data.labels.pop();
    }
    CHART.update();
  })
});
