const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // password hashing function
const { createUserToken } = require("../middleware/auth.js");
const { User } = require("../models");


router.post("/register", async (req, res) => {
    try {
        let userInfo = req.body;
        let foundUser = await User.exists({email: userInfo.email});
        if (foundUser) {
          res.json({msg: "error for user found"})
          //return res.redirect("/login");
        }
        const salt = await bcrypt.genSalt(10); // 10 (from docs) -> number of times its hashed, unique string (num tied to performance), genSalt returns promise
        const passwordHash = await bcrypt.hash(req.body.password, salt); 
        req.body.password = passwordHash; // override req.body from form (console.log(req.body))
        const newUser = await User.create(req.body);
        // res.send(newUser)
        // return res.redirect('/login');

        //status(200).json({currentUser: newUser, isLoggedIn: true, token}); // * userDoc gets sent to front end and then gets transformed 
// res.status(200).json({ message: 'hitting auth route' }) - test route    
    } catch (error) {
        res.status(400).json("try again");
    }
});

router.post("/login", async (req, res) => {
    try {
      const loggingUser = req.body.username; //get username
      const foundUser = await User.findOne({ username: loggingUser }); 
      const token = await createUserToken(req, foundUser); //req- body with headers and compare against user - is it valid
    //   console.log("created token", token) - verify in postman
      res.status(200).json({
        user: foundUser,
        isLoggedIn: true,
        token,
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });



//   router.get('/:id', async (req,res) => {
//     try{

//     }catch(err){
//         console.log(err)
//     }
// })


//DELETE ROUTE
router.delete("/:id", async (req, res) => {
    try {
        res.json(await User.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;

