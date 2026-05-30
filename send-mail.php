<?php
// ============================================
// ОБРАБОТЧИК ФОРМ ДЛЯ ОТПРАВКИ ПИСЕМ
// ============================================

$to_email = 'info@npkekolog.ru';
$to_name = 'НПК ЭКОЛОГ';

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

$html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #006259; padding: 20px; color: white; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
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

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: Сайт НПК ЭКОЛОГ <noreply@npkekolog.ru>',
    'Reply-To: ' . (!empty($email) ? $email : $to_email),
    'X-Mailer: PHP/' . phpversion()
];

if (mail($to_email, $subject, $html, implode("\r\n", $headers))) {
    echo json_encode(['success' => true, 'message' => 'Сообщение отправлено']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка при отправке']);
}
?>