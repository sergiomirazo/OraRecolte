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
$email_body = '
<html>
<head>
<title>Formulario de cotización</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #F4F4F4; padding: 20px;">
  <div style="background-color: #70BE56; padding: 10px; text-align: center;">
    <p style="color: white"> ORA RECOLTE | Control de fluidos </p>
  </div>
  <div style="background-color: #CDF3D0; padding: 20px;">
    <h2 style="color: #00BDF2;">Gracias por contactarnos, ' . $name . '!</h2>
    <img src="https://orarecolte.com.mx/images/ORARECOLTE_LOGO.png" alt="Orarecolte Logo" style="width: 200px;">
    <p style="color: #333;">Tu solicitud para cotización.</p>
    <p style="color: #333;">Estos son los detalles:</p>
    <ul style="list-style-type: none; padding: 0;">
      <li><strong>Nombre:</strong> ' . $name . '</li>
      <li><strong>Empresa:</strong> ' . $empresa . '</li>
      <li><strong>Email:</strong> ' . $email_address . '</li>
      <li><strong>Teléfono:</strong> ' . $phone . '</li>
      <li><strong>Mensaje:</strong></li>
      <p style="color: #333;">' . $message . '</p>
    </ul>
    <h2 style="color: #00BDF2;">Te contactaremos a la brevedad</h2>
  </div>
  <div style="background-color: #70BE56; padding: 10px; text-align: center; color: #FFF;">
    <p>&copy; ' . date("Y") . ' Orarecolte. Todos los derechos reservados.</p>
  </div>
</body>
</html>
';

// Headers for the email to the company
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: info@orarecolte.com.mx\r\n";
$headers .= "Reply-To: $email_address\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send the email to the company
mail("info@orarecolte.com.mx", $email_subject, $email_body, $headers);

// Headers for the email copy to the user
$user_headers = "MIME-Version: 1.0" . "\r\n";
$user_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$user_headers .= "From: info@orarecolte.com.mx\r\n"; // Keep the same "From" email
$user_headers .= "Reply-To: info@orarecolte.com.mx\r\n"; // Reply to the company's email
$user_headers .= "X-Mailer: PHP/" . phpversion();

// Send the email copy to the user
mail($email_address, "Copia de tu solicitud: " . $email_subject, $email_body, $user_headers);

echo "Email sent successfully.";

return true;
?>