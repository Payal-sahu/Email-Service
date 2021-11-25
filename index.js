const express = require('express');
const app = express();
const port = 5656;
const API_KEY = '54a086cddd99523efda92624666246b1-7dcc6512-704d290d';
const DOMAIN = 'sandboxc4f520f7ba5d4c5a8519899c8c0c7f94.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

app.use(express.json());


app.post('/mail', (req, res) => {
  console.log(req.body);
  let data = prepareData(
    req.body.to,
    req.body.subject,
    req.body.body,
    req.body.from
  );
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
    console.log(error);
  });
  res.send('Hello World!');
});

const prepareData = (receiver, subject, body, sender) => {
  return {
    from: sender,
    to: receiver,
    subject: subject,
    text: body,
  };
};
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
