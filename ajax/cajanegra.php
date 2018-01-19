<?php

// Verificaciones que hizo el tipo del video, en el confiamos
// https://www.youtube.com/watch?v=Yb3c-HljFro

if(isset($_POST['ctry']) === true && empty($_POST['ctry']) === false && isset($_POST['yr']) === true && empty($_POST['yr']) === false) {
  require '../../requires/connect.php';
  $anio = $_POST['yr'];

  // Yendo a buscar el pbi del país en cuestión
  $sql = "SELECT pbi FROM tablitax WHERE pais = \"". $_POST['ctry'] ."\" AND (year = ". $anio ." OR year = 2015);";
  $pbisArgentina = mysqli_query($dbc, $sql) or die("No hay pbi para vos, mamu: $sql");

  $i = 0;
  while($row = mysqli_fetch_assoc($pbisArgentina)) {
    $pbisOrigen[$i] = "{$row['pbi']}";
    $i++;
  }

  // Obteniendo lista de países con pbi inferior en 1960
  $sql = "SELECT pais FROM tablitax WHERE pbi < $pbisOrigen[0] AND year = ". $anio .";";
  $result1 = mysqli_query($dbc, $sql) or die("ERROR001");

  $i = 0;
  while($row = mysqli_fetch_assoc($result1)) {
    $paisesInf[$i] = "{$row['pais']}";
    ++$i;
  }

  // Obteniendo lista de países con pbi mayor en 2015
  $sql = "SELECT pais FROM tablitax WHERE pbi > $pbisOrigen[1] AND year = 2015;";
  $result1 = mysqli_query($dbc, $sql) or die("ERROR002");

  $i = 0;
  while($row = mysqli_fetch_assoc($result1)) {
    $paisesSup[$i] = "{$row['pais']}";
    ++$i;
  }

  // Armando una lista final de países que superaron al país en cuestión
  $i = 0;
  foreach($paisesInf as $paisA) {
    foreach($paisesSup as $paisB) {
      if($paisA == $paisB) {
        $arrayFinal[$i] = $paisA;
        $i++;
        break;
      }
    }
  }

  echo "". $i ." países superaron el PBI de ". $_POST['ctry'] ." entre ". $anio ." y 2015:.";

  // Enviando la lista
  foreach($arrayFinal as $result) {
    echo "$result/";
  }

  mysqli_close($dbc);
}

?>
