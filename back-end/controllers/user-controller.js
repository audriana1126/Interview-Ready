// ./controllers/user-controller.js
const express = require('express')
const router = express.Router()
const {User} = require('../models')
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
// const {Chat} = require('../models')

// router.use(methodOverride('_method'));

// ROUTES
// router.get("/", async (req, res) => {
// 	res.status(200).json({message: "user index route"})
// }); 

// USER SHOW ROUTE
router.get("/", async (req, res) => {
    try {
        // send one person
        res.json(await User.find());
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
});

// USER CREATE ROUTE
router.post("/", async (req, res) => {
  try {
    // create new person
    res.json(await User.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//UPDATE ROUTE
router.put("/:id", async (req, res) => {
  try {
    // router.post(req, await User.findById(req.params.id))
    const updatUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatUser)
  } catch (error) {
    //send error
    res.status(400).json({error: error.message})
  }
})


// USER DELETE ROUTE
router.delete("/:id", async (req, res) => {
  try{
      const deleteUser = await User.findByIdAndDelete(req.params.id)
      console.log(req.params.id)
      return res.send(deleteUser)

  }catch(error){
  console.log(error)
  req.error= error;
  return next()
}
});



module.exports = router




