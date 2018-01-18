<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Testing</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
<p>Tri-tri.</p>

<?php
require '../requires/connect.php';

$sql = "SELECT pbi FROM tablitax WHERE pais = \"Argentina\" AND (year >= 1960 AND year <= 1966);";
$arraysql = mysqli_query($dbc, $sql) or die("No hay pbis para vos, mamu: $sql");

$i = 0;
while($row = mysqli_fetch_assoc($arraysql)) {
  $pbisA[$i] = "{$row['pbi']}";
  ++$i;
 }


 $sql = "SELECT pbi FROM tablitax WHERE pais = \"Chile\" AND (year >= 1960 AND year <= 1966);";
 $arraysql = mysqli_query($dbc, $sql) or die("No hay pbis para vos, mamu: $sql");

 $j = 0;
 while($row = mysqli_fetch_assoc($arraysql)) {
   $pbisB[$j] = "{$row['pbi']}";
   ++$j;
  }




?>




<canvas id="popChart" width="600" height="400"></canvas>

</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.js"></script>

<script>

var jArrayA= <?php echo json_encode($pbisA ); ?>;
var jArrayB= <?php echo json_encode($pbisB );?>;
// traigo el array desde php

var anio = 1960;
anios = [];

for (var i = 0; i<=6; i++){
    anio = anio + i
    anios[i] = anio
    anio = anio - i
}

var speedCanvas = document.getElementById("popChart");
var dataFirst = {
  label: "PBI ppc País A",
  data: jArrayA,
  // le paso los pbis a la variable que va a ser ploteada
  borderColor: 'red',
  fill: false,
  // Set More Options
};

var dataSecond = {
  label: "PBI ppc País B",
  data: jArrayB,
  borderColor: 'blue',
  fill: false,

  // Set More Options
};

var speedData = {
  labels: anios,
  datasets: [dataFirst, dataSecond]
};


var lineChart = new Chart(speedCanvas, {
  type: 'line',
  data: speedData
});


</script>
</html>
