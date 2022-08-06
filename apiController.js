const {PrismaClient}= require('@prisma/client')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()
const {JwtUser} = prisma

const genToken = (id, role)=>{
    const payload ={id, role}
    return jwt.sign(payload, process.env.SECRET, {expiresIn:"12h"})
}

class ApiController{
    async reg(req,res){
        const {name, pswd, role} = req.body
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).json({msg: errors})
            const findUser = await JwtUser.findUnique({
                where: {
                  name //это соответств name: name
                }
            })
            if(findUser) return res.status(400).json({msg: 'Пользователь уже существует'})
            const hashPswd = bcrypt.hashSync(pswd, 8);
            const createUser = await JwtUser.create({
                data: { name, pswd: hashPswd, role }
            })
            return res.json({msg: 'Пользователь успешно создан'})
        }
        catch(e){
            console.log(e)
            res.status(400).json({msg: 'Ошибка при регистрации'})

        }
    }

    async login(req,res){
        const {name, pswd, role} = req.body
        try{
            const dbUser = await JwtUser.findUnique({ where: {name} })
            if(!dbUser) return res.status(400).json({msg: 'Пользователь не найден'})
            const validPswd = bcrypt.compareSync(pswd, dbUser.pswd)
            if(!validPswd) return res.status(400).json({msg: 'Введен неверный пароль'})
            else {
                const token = genToken(dbUser.id, dbUser.role)
                res.json({token})
            }

        }
        catch{
            console.log(e)
            res.status(400).json({msg: 'Ошибка при Login'})
        }
    }

    async getUsers(req,res){
        try{
            const users = await JwtUser.findMany({})
            res.json(users)

        }
        catch{
            console.log(e)
        }
    }
}

module.exports = new ApiController()