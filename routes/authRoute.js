const express =require('express')
const router = express.Router()

const {register,login,getProfile,googleAuth,googleredirect} =require('../controllers/authController')
const {userAuth} = require('../middleware/authMiddleware')

router.post('/register',register)
router.post('/login',login)
router.get('/profile',userAuth,getProfile)
router.get('/google',googleAuth)
router.get('/google/callback',googleredirect)


module.exports = router