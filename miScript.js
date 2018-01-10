function ingresarEdad() {
    document.getElementById("tEdad").style.color = "red";

    var x = document.getElementById("inputEdad").value;

    var myArray = new Array();
    myArray[0] = "Paraguay";
    myArray[1] = "Bolivia";
    myArray[2] = "Rusia";
    myArray[3] = "Canadá";
    myArray[4] = "Egipto";
    myArray[5] = "Sudáfrica";
    myArray[6] = "Morón Sur";

    var myTable= "<table class=\"table-striped\"><thead><tr><th style='width: 100px; color: red;'>Pais</th>";
    myTable+= "<th style='width: 100px; color: red; text-align: right;'>Posición</th>";
    myTable+="<th style='width: 100px; color: red; text-align: right;'>PBI</th></tr></thread>";

  for (var i=0; i<8; i++) {
    myTable+="<tbody><tr><td style='width: 100px;'>" + myArray[i] + "</td>";
    myTable+="<td style='width: 100px; text-align: right;'>" + i + "</td>";
    myTable+="<td style='width: 100px; text-align: right;'>" + x + "</td></tr></tbody>";
  }
   myTable+="</table>";

 document.getElementById('tablePrint').innerHTML = myTable;
}
