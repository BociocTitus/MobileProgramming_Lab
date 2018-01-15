//noinspection JSUnresolvedFunction
/**
 * Created by Titus on 12/27/2017.
 */

let express = require('express'),
    app = express(),
    jsonwebtoken = require("jsonwebtoken"),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    cors = require('cors'),
    Order = require('./domain/Order'), //created model loading here
    bodyParser = require('body-parser'),
    User = require('./domain/User');
app.use(cors());
app.use(function(req, res, next) {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1],'RESTFULAPIs', function(err, decode){
            if(err) {
                console.log("There was an error");
                console.log(err);
                req.user = undefined;
            }else{
                req.user = decode;
                next();
            }
        });
    } else{
        req.user = undefined;
        next();
    }
});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Orderdb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let routes = require('./routes/OrderRoute'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);