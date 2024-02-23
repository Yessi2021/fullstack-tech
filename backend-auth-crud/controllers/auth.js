// encriptar claves
const bcrypt = require('bcryptjs')
// model
const Usuario = require('../models/Usuario')

const { response} = require('express');

// JWT
const { generarJWT } = require('../helpers/jwt')



const crearUsuario = async (req, res = response )=> {
  
    const { name, email, password } = req.body
    // le pasamos la informacion
    try {

        let usuario = await Usuario.findOne({ email })
        console.log(usuario)
        // si existe
        if (usuario) {
           return res.status(404).json({
               ok: false,
               msg:'One user exist with that correo'
           })
        }

         usuario = new Usuario(req.body)

        // encriptar passowrd
            const salt = bcrypt.genSaltSync()
            usuario.password = bcrypt.hashSync(password, salt)

       await usuario.save();
        // generar token JWT
        const token = await generarJWT(usuario.id, usuario.name)

    // validacion simple 400 del error
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
           
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Talk with the admi"
        })
    }

};


const loginUsuario = async (req,res = response)=> {

const { email, password } = req.body;

try {
// vamos a validar si hay un usuario con ese email
const usuario = await Usuario.findOne({ email })
        if (!usuario) {
           return res.status(404).json({
               ok: false,
               msg:'The user no exist with that email'
           })
        }


const validPassword = bcrypt.compareSync(password, usuario.password)
// si no es valido
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'password incorrect'
            })
        }
    // sin son iguales vamos a generar el jwt
    // generamos el JWT
      const token = await generarJWT(usuario.id, usuario.name)
   
    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    })
    

} catch (error) {

    console.log(error)
    res.status(500).json({
        ok: false,
        msg: "Talk with the admi"
    })
    
}


    // res.json({
    //     ok: true,
    //     msg: 'login',
    //     email, 
    //     password 
    // })
}


// vamos a revalidar el token y darle una nueva vigencia al token 

const revalidarToken = async (req,res = response)=> {

    const { uid, name } = req


const token = await generarJWT(uid, name)

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