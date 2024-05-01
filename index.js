const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();

const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const schema=mongoose.Schema;

app.use(bodyParser.json())

try{
  mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');
}catch(err){
console.log(err);
}

//UserSchema

const userSchema=new schema({
  username: {
    type: String,
    required: true
  }
})

const User=mongoose.model('Users',userSchema)


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


//solution

app.post('/api/users',async (req,res)=>{
  let username=req.body.username;

  const userObj=new User({
    username
  });

  const data=await userObj.save();
  res.json({
    username: data.username,
    _id: data._id
  })
})

app.get('/api/users',async (req,res)=>{
  const data=await User.find({},{username: true, _id: true})
  res.json(data)

})

//


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
