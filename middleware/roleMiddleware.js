const jwt = require('jsonwebtoken')

const mdl= (arrRole)=>{
    return function(req, res, next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            if(!token) return res.status(403).json({msg:"Пользователь не авторизован"})
            
            const decodedData = jwt.verify(token, process.env.SECRET)
            let hasRole = false
            if(arrRole.includes(decodedData.role)) hasRole = true
            if(!hasRole) return res.status(403).json({msg:"Нет доступа"})
            next()
        }
        catch(e){
            console.log(e)
            res.status(403).json({msg:"Пользователь не авторизован/ошибка в токен"})
    
        }
    }
}

module.exports = mdl