const express = require('express');
const bodyParser= require('body-parser') 
const path = require('path');
const routes = require('./controllers/routes.js');
const nodemailer = require('nodemailer');


const app = express();

// Set the folder for the views
app.set('views', path.join(__dirname, './views/ejs'));

// Set the folder for css, java scripts and images
app.use(express.static(path.join(__dirname,'./public/css')));
app.use(express.static(path.join(__dirname, './public/assets/images')));
app.use(express.static(path.join(__dirname, './public/assets/PDFs')));
app.use(express.static(path.join(__dirname, './public/javascripts')));


app.use(express.json());
app.use(bodyParser.json());

// create application/json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Set the view engine to ejs
app.set('view engine', 'ejs');


myPort = process.env.PORT || 3000;

const run = async () => {
  
  app.use('/', routes); 

  //starts server
  await app.listen(myPort, () => {
    console.log(`Server is running at ${myPort}`)
  });
}


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
        user: 'cocminioncoc@gmail.com', //get passwords and username for new account when we switch it from my email to deafult email
        pass: 'ClashofClans83*'
  }
});


app.post('/emailsend', urlencodedParser, (req, res) => {
  var mailOptions = {
    from: 'cocminioncoc@gmail.com', //add deafult email that is not mine
    to: 'cshriver@friendsbalt.org', //add undercrofts email when ready for deployment
    cc: req.body.email,
    subject: req.body.subject,
    text: req.body.message + "\n" + "\n" + "from," + "\n" + req.body.name + "\n" + "Phone Number: " + req.body.phone
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    res.redirect('contact');
  });
})

run()