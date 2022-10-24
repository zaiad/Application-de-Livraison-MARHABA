const crtl = require('../controllers/userController')
const router = require('express').Router()


router.post('/register',crtl.register )
router.post('/login',crtl.login )
router.post('/resetpassword',crtl.resetPassword)




module.exports = router
