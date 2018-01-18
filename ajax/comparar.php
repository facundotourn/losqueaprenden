<?php

if(isset($_POST['yr']) === true && empty($_POST['yr']) === false && isset($_POST['ctryBase']) === true && empty($_POST['ctryBase']) === false) {
  $paisBase = $_POST['ctryBase'];
  $yearBase = $_POST['yr'];

  require '../../requires/connect.php';

  // Yendo a buscar los pbis del país base
  $sql = "SELECT pbi FROM tablitax WHERE pais = \"". $paisBase ."\" AND year >= ". $yearBase .";";
  $pbisBase = mysqli_query($dbc, $sql) or die("No se pudo obtener los pbis: $sql");

  while($row = mysqli_fetch_assoc($pbisBase)) {
    echo "{$row['pbi']}/";
  }
}

?>
