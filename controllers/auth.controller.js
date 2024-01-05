
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { response} = require('express');

// JWT
const { generateJWT } = require('../helpers/jwt')
const crearUsuario = async (req, res = response )=> {
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (user) {
           return res.status(404).json({
               ok: false,
               msg:'Un usuario existe con ese correo'
           })
        }

         user = new User(req.body)

        // encriptar passowrd
            const salt = bcrypt.genSaltSync()
            user.password = bcrypt.hashSync(password, salt)

        // gurdamos 
       await user.save();
        const token = await generateJWT(user.id, user.name)
        console.log(user);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
           
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

};


const loginUsuario = async (req,res = response)=> {

const { email, password } = req.body;

try {
const user = await User.findOne({ email })
        if (!user) {
           return res.status(404).json({
               ok: false,
               msg:'El usuario no existe con ese email'
           })
        }

const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'password incorrecto'
            })
        }

      const token = await generateJWT(user.id, user.name)
    res.json({
        ok: true,
        uid: user.id,
        name: user.name,
        token
    })
    

} catch (error) {

    console.log(error)
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
    })
    
}


}


const revalidarToken = async (req,res = response)=> {

    const { uid, name } = req

const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}