const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()
const {JwtUser} = prisma

class ApiController{
    async reg(req,res){
        const {name, pswd, role} = req.body
        try{
            const newUser = await JwtUser.findUnique({
                where: {
                  name //это соответств name: name
                }
            })
            if(newUser) return res.status(400).json({msg: 'Пользователь уже существует'})
            const user = await JwtUser.create({
                data: { name, pswd, role }
            })
            res.json(user)


        }
        catch(e){
            console.log(e)
            res.status(400).json({msg: 'Ошибка при регистрации'})

        }
    }

    async login(req,res){
        try{

        }
        catch{
            console.log(e)
            res.status(400).json({msg: 'Ошибка при Login'})
        }
    }

    async getUsers(req,res){
        try{
            res.json( 'я тут')

        }
        catch{
            
        }
    }
}

module.exports = new ApiController()