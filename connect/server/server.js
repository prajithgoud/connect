let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let database = require('./database/db');
let user = require('./models/user-schema');
const createError = require('http-errors');
const userRoute = require('../server/routes/user.routes');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// alert("Hello! I am an alert box!");

// import {Welcome} from '../src/components/welcome'

mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully !')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));

// app.use(express.json()); 
// app.use(express.urlencoded()); 

app.use(cors());

app.use('/users', function(req,res) {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// app.use('/',create);

// Used bcrypt(Blowfish Cypher) algorithm for password hashing
app.use('/create',(req, res, next) => {
    bcrypt.hash(req.body.Password, saltRounds, function(err, hash) {
            req.body.Password = hash;
            user.create(req.body, (error, data) => {
        if (error) 
            return next(error)
         else {
            console.log(data)
            res.json(data)
        }
        })
})
});

app.use('/find',(req,res,next) => {
    // bcrypt.compare(req.body.Password,hash,function(err,result) {
    //     req.body.Password = hash;
        user.find(req.body, (error, data) => {
        if (error)
            return next(error)
        else {
            console.log(data)
            res.json(data)
        }
    })
})
// });

app.use('/delete/:id' , function(req,res,next) {
    user.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});
app.use('/',userRoute)
app.use('/update/:id' ,(req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
            
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

const port = process.env.PORT || 5000; 


const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});


app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
