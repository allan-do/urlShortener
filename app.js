//Get Requirements
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const cors = require('cors');

const shortUrl = require('./models/shortUrl');


app.use(bodyParser.json());
app.use(cors());

//Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrl');
 

//Allows node to find static content
app.use(express.static(__dirname +'/public'));

//the call (*) will allow for the http// to take it all as a string.
//passing in a string http://url 
app.get('/new/:urlToShorten(*)', (req, res, next) =>{
    //ES5 var urlToShorten = req.params.urlToShorten
    var { urlToShorten } = req.params;
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = expression;
    if(regex.test(urlToShorten)===true){
        var short = Math.floor(Math.random()*100000).toString();
        var data = new shortUrl(
            { //this creats a new record to be saved to the database. note that there will be an automatic _id for the primary key
                originalUrl: urlToShorten,
                shorterUrl: short
            }
        )
        data.save((err) => { // saves to database
            if (err) {
                return res.send('Error Saving to database');
            }
        })
        return res.json(data);
    } 

    var data = new shortUrl(
        { //this creats a new record to be saved to the database. note that there will be an automatic _id for the primary key
            originalUrl: urlToShorten,
            shorterUrl: 'InvalidURL'
        }
    )
    return res.json(data)
})


//query database and forward to originalUrl
app.get('/:urlToForward',(req, res, next) =>{
    //stores the value of the param
    var shorterUrl = req.params.urlToForward;
    //shortUrl below is basically the database defined up top. findOne based on the criteria of the 'shorterUrl' 
    shortUrl.findOne({'shorterUrl': shorterUrl}, (err, data) => {
        if(err) return res.send('Error reading data');
        var re = new RegExp("/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi");
        var strToCheck = data.originalUrl;
        if(re.test(strToCheck)) {
            res.redirect(301, data.originalUrl);
        }
        else {
            res.redirect(301, 'http://' + data.originalUrl);
        }
    });
});

//Listen to see if everythihng is working
//Process for if hosting on glitch or heroku
app.listen(process.env.PORT || 3000, () =>{
    console.log('Application is listening...')
});