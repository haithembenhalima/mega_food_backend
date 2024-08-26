
// this message is for the reset password message
const forgotPasswordMessage = (resetCode, name) => {
    const message = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333;
            font-size: 36px;
          }
          p{
          font-weight: bold;
          }
          .reset-code {
          font-size: 25px;
          font-weight: bold;
          color: #000000;
          padding: 10px;
          font-family: "Rubik", sans-serif;
          border-radius: 40px;
          padding: 20px;
          display: inline-block;
          letter-spacing: 10px;
          margin: 20px 0;
          background-color: #ddd;
          }
        </style>
      </head>
<body>
    <div class="container">
      <h1>رمز تغيير كلمة السر</h1>
      <p>مرحبا ، <b>${name}</b></p>
      <p>يمكنك الآن تغيير كلمة السر الخاصة بك، قم بنسخ الرمز الموالي:</p>
      <div class="reset-code">${resetCode}</div>
      <p>مدة صلاحية هذا الرمز 30 دقيقة، لا يصبح هذا الرمز صالحا بعد فوات المدة.</p>
      <br>
      <p>شهيّة طيبة,<br>مطعمكم</p>
    </div>
  </body>
    </html>
  `;

  return message;
}

module.exports = {forgotPasswordMessage};