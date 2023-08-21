const mongoose=require('mongoose');

const connectDB=async ()=>{
 try {
    const connect=await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('DATABASE IS CONNECTED',
    connect.connection.host,
    connect.connection.name
    );
 } catch (error) {
  console.log('Error in DB',error);
  process.exit(1);  
 }
}

module.exports=connectDB;