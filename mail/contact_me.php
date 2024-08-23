<?php
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['empresa'])   ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$empresa = strip_tags(htmlspecialchars($_POST['empresa']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Email content
$email_subject = "Formulario de cotización: $name";
$email_body = "
<html>
<head>
<title>Formulario de cotización</title>
</head>
<body style='font-family: Arial, sans-serif; background-color: #F4F4F4; padding: 20px;'>
  <div style='background-color: #70BE56; padding: 10px; text-align: center;'>
    <img src='https://orarecolte.com.mx/images/ORARECOLTE_LOGO.png' alt='Orarecolte Logo' style='width: 200px;'>
  </div>
  <div style='background-color: #CDF3D0; padding: 20px;'>
    <h2 style='color: #00BDF2;'>Gracias por contactarnos, $name!</h2>
    <p style='color: #333;'>Tu solicitud para cotización.</p>
    <p style='color: #333;'>Estos son los detalles:</p>
    <ul style='list-style-type: none; padding: 0;'>
      <li><strong>Nombre:</strong> $name</li>
      <li><strong>Empresa:</strong> $empresa</li>
      <li><strong>Email:</strong> $email_address</li>
      <li><strong>Teléfono:</strong> $phone</li>
      <li><strong>Mensaje:</strong></li>
      <p style='color: #333;'>$message</p>
    </ul>
    <p style='color: #333;'>Te contactaremos a la brevedad para enviarte la cotización.</p>
  </div>
  <div style='background-color: #70BE56; padding: 10px; text-align: center; color: #FFF;'>
    <p>&copy; " . date("Y") . " Orarecolte. Todos los derechos reservados.</p>
  </div>
</body>
</html>
";

// Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: no-contestar@orarecolte.com.mx\n";
$headers .= "Reply-To: $email_address";

// Send the email
mail("sergiomisael91@gmail.com", $email_subject, $email_body, $headers);

return true;
?>