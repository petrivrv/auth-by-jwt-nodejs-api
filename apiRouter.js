const router = require('express').Router()
const controller = require('./apiController')
const {check} = require('express-validator')

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working' });
});

router.post('/reg',[
    check('name','Имя не может быть пустым').notEmpty(),
    check('pswd','Пароль должен быть больше 3 символов').isLength({min:3, max:200})
], controller.reg)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)


module.exports = router;
