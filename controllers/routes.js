const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('Request for home recieved');
  res.render('index');
});

router.get('/about', (req, res) => {
    console.log('Request for about us recieved');
    res.render('about');
  });


router.get('/contact', (req, res) => {
    console.log('Request for contact recieved');
    res.render('contact');
  });



module.exports = router;