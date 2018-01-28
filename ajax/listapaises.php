<?php

require '../../requires/connect.php';
$sql = "SELECT distinct pais FROM tablitax;";
$paisessql = mysqli_query($dbc, $sql) or die("No hay paises para vos, mamu: $sql");

while($row = mysqli_fetch_assoc($paisessql)) {
  echo "{$row['pais']}/";
}

 ?>
