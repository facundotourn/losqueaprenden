var pbisBase = [];
var pbisSel = [];

$(document).ready( function () {
  // Click en el botón "Aceptar"
  $('#button-aceptar').on("click", function() {
    $("#paises").empty();
    var pais = $('input#input-pais').val();
    var year = $('input#input-year').val();
    var first = 1;

    if($.trim(pais) != '' && $.trim(year) != '') {
      $("#year-group").removeClass("has-error");
      $("#pais-group").removeClass("has-error");
      $("#input-year").prop("disabled", true);
      $("#input-pais").prop("disabled", true);
      $("#button-aceptar").addClass("disabled");
      $("#button-cambiar").removeClass("disabled");

      $.post('ajax/cajanegra.php', {ctry: pais, yr: year}, function(data) {
        $('#mini-titulo').text(data.split('.')[0]);

        var paisesRes = data.split('.')[1].split('/');

        for(var i = 0; i < paisesRes.length - 1; i++) {
          $("#paises").append('<li role="presentation" class="list-element" id="' + i + '"><a class="btn">' + paisesRes[i] + '</a></li>');
          //$('li#' + i).text(paisesRes[i]);
        }
      });
    }

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
    $("#compare-chart").removeClass("hidden");
    $(".list-element").removeClass("active");
    $(this).addClass("active");
    $("#basetable").empty();
    $("#seltable").empty();
    $("#htable").empty();

    var selected = $(this).text();
    var base = $("#input-pais").val();
    var year = $("#input-year").val();
    var size = 2015 - year;

    $("#basetable").append("<td>" + base + "</td>");
    $("#seltable").append("<td>" + selected + "</td>");

    $("#htable").append("<th>PBI en el año</th>");
    for(var i = 0; i < size + 1; i++) {
      $("#htable").append("<th>" + (parseInt(year) + i) + "</th>");
    }

    $.post("ajax/comparar.php", {ctryBase: base, yr: year}, function(data) {
      var pbiString = data.split('/');

      for(var i = 0; i < size + 1; i++) {
        pbisBase[i] = parseFloat(pbiString[i]);
        $("#basetable").append("<td>" + pbisBase[i] + "</td>");
      }
    });

    $.post("ajax/comparar.php", {ctryBase: selected, yr: year}, function(data) {
      var pbiString = data.split('/');

      for(var i = 0; i < size + 1; i++) {
        pbisSel[i] = parseFloat(pbiString[i]);
        $("#seltable").append("<td>" + pbisSel[i] + "</td>");
      }
    });

    console.log(year);
    console.log("PAIS B ANTES DE LLAMAR: ");
    console.log(pbisSel);
    console.log("PAIS A ANTES DE LLAMAR: ");
    console.log(pbisBase);

    actualizarChart(year, pbisBase, pbisSel);
  });

  // Click en el botón "Modificar"
  $("#button-cambiar").on("click", function() {
    $("#input-year").prop("disabled", false);
    $("#input-pais").prop("disabled", false);
    $("#paises").empty();
    $("#mini-titulo").text("");
    $("#button-cambiar").addClass("disabled");
    $("#button-aceptar").removeClass("disabled");
  })
});
