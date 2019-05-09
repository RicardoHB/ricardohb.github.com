<?php

if(isset($_POST['message']))
{
	if($_POST['message'] != '')
	{
		$to      = 'ricardohb@me.com';
		$subject = 'Contacto ricardohb.com';
		$message = $_POST['message'];
		$headers = 'From: web@ricardohb.com' . "\r\n" .
		'Reply-To: web@ricardohb.com' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();

		mail($to, $subject, $message, $headers);
	}
}

header("Location: http://ricardohb.com/contacto.html");
die();

?>