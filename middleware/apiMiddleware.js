const jwt = require('jsonwebtoken')

const mdl= (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(403).json({msg:"Пользователь не авторизован"})
        
        const decodedData = jwt.verify(token, process.env.SECRET)
        req.user = decodedData
        next()
    }
    catch(e){
        console.log(e)
        res.status(403).json({msg:"Пользователь не авторизован/ошибка в токен"})

    }
}

module.exports = mdl