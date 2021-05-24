// let mongoose = require('mongoose')
// let express = require('express');
// let router = express.Router();

// let user = require('../models/user-schema');
// const { signup, Delete } = require("../controllers/auth");


// router.post('/signup',signup);
// // router.delete('/delete',Delete);

// router.route('/create').post((req, res, next) => {
//     user.create(req.body, (error, data) => {
        
//         if (error) {
//             return next(error)
//         } else {
//             console.log(data)
//             res.json(data)
//         }
//     })
// });



// router.route('/users').get((req, res) => {
//     user.find((error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

// router.route('/edit/:id').get((req, res) => {
//     user.findById(req.params.id, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })


// // Update Student
// router.route('/update/:id').put((req, res, next) => {
//     $set: req.body;
//     user.findByIdAndUpdate(req.params.id, {$set}, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.json(data)
//             console.log('User updated successfully !')
//         }
//     })
// })

// // router.route('/delete/:id').delete((req, res, next) => {
// //     user.findByIdAndRemove(req.params.id, (error, data) => {
// //         if (error) {
// //             return next(error+"delete");
// //         } else {
// //             res.status(200).json({
// //                 msg: data
// //             })
// //         }
// //     })
// // })

// module.exports = router;


let mongoose = require('mongoose')
let express = require('express');
let router = express.Router();

let posts = require('../models/post-schema')
let user = require('../models/user-schema')
const {verifyAccessToken,verifyAccessTokenWithRestriction} = require('../helpers/jwt_helper');


// router.route('/hello').post((req,res,next) => {
//     posts.find((error,data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

router.route('/createpost').post((req, res,next) => {

    const reqtitle = req.body.title;
    const reqcategories = req.body.categories;
    const reqcontent = req.body.content;
    // const authorId = user._id;
    // const authorName = user.firstName + " " + user.lastName;
    const reqtime = Date.now();


    console.log(reqtitle,reqcategories)

    posts.create({
        title: reqtitle,
        categories: reqcategories,
        content: reqcontent,
        time: reqtime
    }, (err,data) => {
        if(err){
            return next(err)
        }
        else{
            res.json(data)
        }
    })



    });
router.route('/post').get((req, res,next) => {
    posts.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    }).sort({time:-1})
})

router.route('/users').get((req, res) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

module.exports = router;