const mongoose=require('mongoose')

const dbCon=()=>{
    
    try{
    mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
  }catch(err){
  console.log(err);
  }
}

module.exports={dbCon}
  