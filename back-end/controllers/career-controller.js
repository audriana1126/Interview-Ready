const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Career = require('../models/Career.js');
const methodOverride = require('method-override');


// Middleware

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(methodOverride('_method'));


// Index Route 

router.get('/', async (req, res, next) => {
    try {
        // const user = await User.findById(req.params.id)
        const allCareer = await Career.find()
        console.log(allCareer)
        res.status(200).json(allCareer)
        // res.send('Hello world')
        // const context = { career: userCareer};
        // console.log(userCareer)
        // res.status(200).json(userCareer)
        // res.render(context)
        // res.render('postindex.ejs', context);
    } catch(error) {
        console.log(error)
        res.status(404).json({error})
    }
});




// New Routes

// Post
// router.get('/new', async (req, res, next) => {
//     try {
//     const allUser = await User.find()
//     // res.render('newcareer.ejs', {User: allUser});
//     } catch (error) {
//         console.log(error);
//        req.err= error;/1X50Msz.png
//        return next()
//     }
// })



// Create Post
router.post('/', async (req, res) => {
    try {
      res.json( await Career.create(req.body));
        // const userId = req.user._id
        // req.body.userId = userId

    } catch (error) {
       res.status(400).json(error);
    }
});


// Feed

// router.get('/feed', (req, res) => {
//     res.render('postindex.ejs');
// })



// Show Route 

router.get('/:id', async (req, res, next) => {
  try{
      const foundPost = await Chat.findById(req.params.id).populate("userId").exec();
      const context = { chat: foundChats, id: foundChats._id}
      console.log(context)
    //   console.log(postUser);
      res.render("showchats.ejs", context);
  
  }catch(error){
      // throw new Error(err)
      console.log(error)
      req.error= error;
      return next()
   
  }
  });

     // Delete

    //  router.delete("/:id", async (req, res, next) => {
    //     try{
    //         const deletePost = await db.Posts.findByIdAndDelete(req.params.id)
    //         return res.redirect("/post")

    //     }catch(error){
    //     // throw new Error(err)
    //     console.log(error)
    //     req.error= error;
    //     return next()
     
    // }
    // })





    // Edit

    // router.get('/:id/edit', async (req, res, next) => {
    //     try{ 
    //     const foundPost = await db.Posts.findById(req.params.id)
    //     res.render('editpost.ejs', {post: foundPost, id: foundPost._id});
    //     console.log(foundPost)

    //     }catch(error){
    //     // throw new Error(err)
    //     console.log(error)
    //     req.error= error;
    //     return next()
     
    // }
    // });

    // Update 

    // router.put("/:id", async (req, res, next) => {
    //     try{
    //         const updatePost = req.body
    //         await db.Posts.findByIdAndUpdate(req.params.id, updatePost, {new:true})
    //         res.redirect(`/post/${req.params.id}`);
    //     }catch(error){
    //         // throw new Error(err)
    //         console.log(error)
    //         req.error= error;
    //         return next();
    //     }
    // })










module.exports = router;