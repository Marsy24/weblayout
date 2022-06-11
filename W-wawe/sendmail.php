<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpMailer/src/Exception.php';
  require 'phpMailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpMailer/language');
  $mail->IsHTML(true);

  $mail->setFrom('info@wwave.com', 'W-Wave Radio');
  $mail->('temkoo23211@icloud.com');
  $mail->Subject = 'Форма';

  if (trim(!empty($_POST['Comment']))) {
    $body.='<p><strong>Комментарий:</strong> '.$_POST['Comment'].'</p>';
  }

  if (trim(!empty($_POST['Name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['Name'].'</p>';
  }

  if (trim(!empty($_POST['eMail']))) {
    $body.='<p><strong>E-mail:</strong> '.$_POST['eMail'].'</p>';
  }

  if (!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
