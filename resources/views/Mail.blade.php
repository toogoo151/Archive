<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Баталгаажуулах код</title>
    <style>
        /* CSS styles for the email template */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
            text-align: center;
            margin-top: 0;
        }
        p {
            color: #777777;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        .otp {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .otp-number {
            display: inline-block;
            padding: 10px;
            background-color: #3490dc;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
            border-radius: 5px;
            margin: 5px;
        }
        .footer {
            text-align: center;
            color: #777777;
        }
        .footer a {
            color: #3490dc;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Баталгаажуулах код</h1>
        <p>Сайн байна уу! {{$name}}.</p>
        <p>Таны имейл хаягаа баталгаажуулах код:</p>
        <div class="otp">
            <span class="otp-number">{{ $otp }}</span>
        </div>
        <p>Энэ кодыг имейлээ баталгаажуулахдаа ашиглаарай.</p>
        {{-- <p class="footer">If you did not request this OTP, please ignore this email. For any further assistance, please <a href="#">contact our support team</a>.</p> --}}
    </div>
</body>
</html>