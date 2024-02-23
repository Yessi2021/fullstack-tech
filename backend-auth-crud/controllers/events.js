const { response} =  require('express')
// el modelo
const Evento = require('../models/Evento')

// controladores de los eventos

const getEventos = async (req,res = response) => {
 
    const eventos = await Evento.find()
                .populate("user","name")

   

    res.json({
        ok:true,
        eventos,
       
    })
   
}


const createEvento = async (req,res = response) => {

     const evento = new Evento(req.body)

     try {

        // el id del usuario
        evento.user = req.uid
        // console.log(req.uid)

     const eventoGuardado =  await evento.save()
    // si se grvo exitosamente
        res.json({
            ok: true,
            evento:eventoGuardado
        })
         
     } catch (error) {
       res.status(500).json({
           ok:false,
           msg:"Talk with the admi"
       })  
     }

}


const actualizarEventos = async (req,res = response) => {

// id usuario 
const uid = req.uid;
const eventoId = req.params.id

try {

    const evento = await Evento.findById(eventoId)

    // si no existe
    if (!evento) {
       return res.status(404).json({
            ok:false,
            msg:"Link does no exist with that ID"
        })
    }

    
    if (evento.user.toString() !== uid) {
        return res.status(401).json({
            ok:false,
            msg:"You dont have privilege to Edit that link"
        })  
    }

    const nuevoEvento = {
        ...req.body,
        user:uid
    }

// actualizamos

const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true})
// si todo salio ok
res.json({
    ok:true,
    evento:eventoActualizado
})
    
} catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg: "Talk with the admi"
    })
}

}


const eliminarEvento = async (req,res = response) => {


    // id usuario 
const uid = req.uid;

const eventoId = req.params.id


try {

    const evento = await Evento.findById(eventoId)

    // si no existe
    if (!evento) {
      return res.status(404).json({
            ok:false,
            msg:"Link does not exist with that ID"
        })
    }

  
    if (evento.user.toString() !== uid) {
        return res.status(401).json({
            ok:false,
            msg:"You do not have privilege to delete the link"
        })  
    }


 await Evento.findByIdAndDelete(eventoId)

res.json({
    ok:true,
})
    
} catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg: "Talk with the admi"
    })
}


}




module.exports = {
    getEventos,
    createEvento,
    actualizarEventos,
    eliminarEvento
}