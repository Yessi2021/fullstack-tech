const { Schema, model } = require('mongoose')

// nutros squema
const EventSchema = Schema({
   title:{type:String, required:true},
   notes:{type:String},
    user: {
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

EventSchema.method('toJSON', function(){
   const { __v,_id,...object } = this.toObject();
   object.id = _id;
   return object
})


module.exports = model('Links', EventSchema)