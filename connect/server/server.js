let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const path = require('path');
const expbhs = require('express-handlebars');
let database = require('./database/db');
let user = require('./models/user-schema');
const createError = require('http-errors');
const userRoute = require('./routes/user.routes');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;
require("./database/db");
const nodemailer = require('nodemailer');
const creds = require('./config');
const { getMaxListeners } = require('./models/user-schema');
const app = express();


// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));

app.engine('handlebars',expbhs({
    // extname: "handlebars",
    defaultLayout: false,
    // layoutsDir: path.join(__dirname, "views")
  }));
app.set('view engine', 'handlebars');

app.use('/public',express.static(path.join(__dirname, "public")));

app.get('/welcome',(req,res) => {
    res.render('welcome');
})

app.use(express.json()); // To Parse the JSON Data to the API of the server and without it , it won't be able to get theJSON data
app.use(cors());   // It is to give the other host to actually access this REST API

app.use('/api',userRoute);

const SignToken = id => {
    return jwt.sign({id} , process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
// Email verification

app.use('/send', (req, res) => {
    const otp = Math.floor(Math.random() * (1000000 - 100000) + 100000);
    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Verification OTP : ${otp} </li>
      </ul>
      <h3>Message</h3>
    `;
    console.log(output);
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'mail.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: creds.USER, // generated ethereal user
        pass: creds.PASS  // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log("error");
    } else {
        console.log('All works fine, congratz!');
    }
    });

let mailOptions = {
    from: '"Nodemailer Contact" <ouconnect5@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        res.json({
            msg: 'fail'
        })
    } else {
        res.json({
            msg: 'success',
            otp: otp
        })
    }
    })
});

  

// Different App Routes
app.use('/users', function(req,res) {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})



// Used bcrypt(Blowfish Cypher) algorithm for password hashing
// Added JWT Token to SignUp
app.use('/create', (req, res, next) => {
    
    bcrypt.hash(req.body.Password, saltRounds, async function(err, hash) {
        req.body.Password = hash;
        const newUser = await user.create(req.body);
        // user.create(req.body, (error, data) => {
        // if (error) 
        //     return next(error)
        //  else {
        //     console.log(data);
        //     res.json(data,{token})
        // }
        // });
        // user.find
        const token = SignToken(newUser._id);
        res.status(201).json({
            status:"success",
            token,
            data :{
                user : newUser
            }
        })
})
});

// Added JWT token to login

app.use('/login', async (req, res,next) => {
    // console.log(req.body)
    const {enterpass,retpass,email} = req.body;
    bcrypt.compare(req.body.enterpass,req.body.retpass, async function(err,result) {
        if(err){
            return next(err)
        } else {
            // const {email} = req.body;
            const newuser = await user.findOne({Email : req.body.email});
            console.log(newuser)
            const token = SignToken(newuser._id);
            // console.log(token);
            if(result){
            await res.status(200).json({
                status : 'success',
                token,
                result,
                data : {
                    user : newuser
                }
            })}
            else{
                await res.status(401).json({
                    status : 'fail',
                    result,
                    data : {
                        user : newuser
                    }
                })}
        } 
            // res.json(result)
    })

});

app.get('/',async (req,res,next) => {
    // console.log(req.header
    res.send("hello from sai")
})
app.use('/find',(req,res,next) => {
        user.find(req.body, (error,data) => {
        if (error)
            return next(error)
        else {
            console.log(data)
            res.json(data)
        }
    })
})
// })

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
