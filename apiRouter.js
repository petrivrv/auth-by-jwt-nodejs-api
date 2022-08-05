const router = require('express').Router()
const controller = require('./apiController')

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working' });
});

router.post('/reg', controller.reg)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

/*
router.get('/prod', async (req, res, next) => {
  const prod = await prisma.prod.findMany({})
  res.json(prod)
});


*/

module.exports = router;
