<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>
  <p>Holululuu</p>
  <div class="row">

  </div>
  <div class="row">
    <div class="col-sm-4"><h1 id="tEdad">Edad</h1></div>
    <div class="col-sm-6"><input id="inputEdad" type="text" name="" value=""></div>
    <div class="col-sm-2"><button id="bAceptar" onclick="ingresarEdad()" class="btn btn-primary" type="button" name="button">Aceptar</button></div>
  </div>
  <div class="container">
    <table id="tablePrint"></table>
  </div>

  <?php
  require '../requires/connect.php';

  $sql = "SELECT pbi FROM tablitax WHERE pais = \"Argentina\" AND (year = 1960 OR year = 2015);";
  $pbisArgentina = mysqli_query($dbc, $sql) or die("No hay pbi para vos, mamu: $sql");

  $i = 0;
  while($row = mysqli_fetch_assoc($pbisArgentina)) {
    $pbisOrigen[$i] = "{$row['pbi']}";
    $i++;
  }

  echo "$pbisOrigen[0] $pbisOrigen[1]";

  $sql = "SELECT pais FROM tablitax WHERE pbi < $pbisOrigen[0] AND year = 1960;";
  $result1 = mysqli_query($dbc, $sql) or die("ERROR001");

  $i = 0;
  while($row = mysqli_fetch_assoc($result1)) {
    $paisesInf[$i] = "{$row['pais']}";
    ++$i;
  }

  echo '<p></p>';
  foreach($paisesInf as $result) {
    echo "$result ";
  }

  $sql = "SELECT pais FROM tablitax WHERE pbi > $pbisOrigen[1] AND year = 2015;";
  $result1 = mysqli_query($dbc, $sql) or die("ERROR002");

  $i = 0;
  while($row = mysqli_fetch_assoc($result1)) {
    $paisesSup[$i] = "{$row['pais']}";
    ++$i;
  }

  echo '<p></p>';
  foreach($paisesSup as $result) {
    echo "$result ";
  }

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

  echo '<p></p>';
  foreach($arrayFinal as $result) {
    echo "$result ";
  }

  // $sql = "SELECT pbi FROM tablitax WHERE pais = \"Argentina\" AND year = 2015;";
  //
  // $result = mysqli_query($dbc, $sql) or die("Mala query, papu: $sql");
  //
  // echo "<p>";
  // while($row = mysqli_fetch_assoc($result)) {
  //   echo "{$row['pbi']}";
  //   $pbiSelected = "{$row['pbi']}";
  // }
  // echo "</p>";
  //
  // $sql = "SELECT pais, pbi FROM tablitax WHERE year = 2015 AND pbi > $pbiSelected;";
  //
  // $result = mysqli_query($dbc, $sql) or die ("Mala query, papu: $sql");
  //
  // echo "<table border='1'>";
  // echo "<tr><td>Pais</td><td>PBI</td><tr>";
  // while($row = mysqli_fetch_assoc($result)) {
  //   echo "<tr><td>{$row['pais']}</td><td>{$row['pbi']}</td><tr>";
  // }
  // echo "</table>";
  ?>

  <script src="js/jquery.js" type="text/javascript"></script>
  <script src="miScript.js" type="text/javascript"></script>
</body>
</html>
