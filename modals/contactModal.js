const mongoose=require('mongoose');

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    name:{
        type:String,
        required:[true,'Please enter the Name']
    },
    email:{
        type:String,
        required:[true,'Please enter contact email address']
    },
    
    phone:{
        type:String,
        required:[true,'Please enter contact Phone No']
    },   
},{
    timestamps:true
}
)

module.exports=mongoose.model("Contacts",contactSchema)