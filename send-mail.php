<?php
// ============================================
// ОБРАБОТЧИК ФОРМ ДЛЯ ОТПРАВКИ ПИСЕМ
// ============================================

// ===== ЗАГРУЖАЕМ ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ ИЗ .env =====
$envFile = dirname(__DIR__) . '/.env'; // Файл на уровень выше (в /www/npkekolog/)
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            putenv(trim($key) . '=' . trim($value));
        }
    }
}

// Получаем пароль из переменной окружения
$smtpPassword = getenv('SMTP_PASSWORD') ?: '';

// Функция валидации
function getPostValue($key) {
    return isset($_POST[$key]) ? strip_tags(trim($_POST[$key])) : '';
}

$form_type = getPostValue('form_type');
$page_url = getPostValue('page_url');
$name = getPostValue('name');
$phone = getPostValue('phone');
$email = getPostValue('email');
$task = getPostValue('task');

if (empty($name) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Заполните обязательные поля']);
    exit;
}

switch ($form_type) {
    case 'callback-form':
        $subject = 'Новая заявка с сайта (модальная форма)';
        break;
    case 'footer-custom-form':
        $subject = 'Новая заявка с сайта (форма "Не нашли оборудование")';
        break;
    default:
        $subject = 'Новая заявка с сайта';
}

// Формируем HTML письма
$html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #006259; padding: 20px; color: white; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 5px; }
        .label { font-weight: bold; color: #006259; }
        .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Новая заявка с сайта npkekolog.ru</h2>
    </div>
    <div class="content">
        <div class="field"><span class="label">Форма:</span> ' . htmlspecialchars($form_type) . '</div>
        <div class="field"><span class="label">Страница:</span> ' . htmlspecialchars($page_url) . '</div>
        <div class="field"><span class="label">Контактное лицо:</span> ' . htmlspecialchars($name) . '</div>
        <div class="field"><span class="label">Телефон:</span> ' . htmlspecialchars($phone) . '</div>
        <div class="field"><span class="label">Email:</span> ' . htmlspecialchars($email) . '</div>
        <div class="field"><span class="label">Задача:</span> ' . nl2br(htmlspecialchars($task)) . '</div>
    </div>
    <div class="footer">
        Письмо отправлено с сайта npkekolog.ru
    </div>
</body>
</html>';

$text = "Новая заявка с сайта npkekolog.ru\n\n";
$text .= "Форма: {$form_type}\n";
$text .= "Страница: {$page_url}\n";
$text .= "Контактное лицо: {$name}\n";
$text .= "Телефон: {$phone}\n";
$text .= "Email: {$email}\n";
if ($task) $text .= "Задача: {$task}\n";

// ===== ОТПРАВКА ЧЕРЕЗ SMTP VK WorkMail (с паролем из переменной окружения) =====
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

try {
    $mail = new PHPMailer(true);
    
    $mail->isSMTP();
    $mail->Host       = 'smtp.mail.ru';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@npkekolog.ru';
    $mail->Password   = $smtpPassword;          // ← пароль из переменной окружения
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    
    $mail->setFrom('info@npkekolog.ru', 'НПК ЭКОЛОГ');
    $mail->addAddress('info@npkekolog.ru', 'НПК ЭКОЛОГ');
    
    if (!empty($email)) {
        $mail->addReplyTo($email, $name);
    }
    
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = $subject;
    $mail->Body    = $html;
    $mail->AltBody = $text;
    
    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Сообщение отправлено']);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка при отправке: ' . $mail->ErrorInfo]);
}
?>