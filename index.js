const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');

const session = require('express-session');

const cookieParser = require('cookie-parser');




app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

app.use(express.json());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(morgan('dev'));




//Order Placement

app.use(require('./router/order'));

//Submit By Chemist

app.use(require('./router/chemistsubmit'));

//Submit By JanAushadhi

app.use(require('./router/janAushadhiSubmit'));

//Rediret To Next Chemist

app.use(require('./router/redirectToNextChemist'));



const port = 3001;

app.listen(port, () => {
    
    console.log(`app listening on port : `,port)

});