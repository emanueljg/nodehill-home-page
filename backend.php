<?php

$db = new MongoDB\Driver\Manager("mongodb://localhost:27017");

$query = new MongoDB\Driver\Query([]);

header('Content-Type: application/json; charset=utf-8');

if(isset($_GET['menuStructure'])) {
  $result = $db->executeQuery('nodehillContent.menuStructure', $query);
  echo json_encode(iterator_to_array($result));
}
else if(isset($_GET['markdownContent'])) {
  $result = $db->executeQuery('nodehillContent.markdownContent', $query);
  echo json_encode(iterator_to_array($result));
}
else {
  echo 'null';
}