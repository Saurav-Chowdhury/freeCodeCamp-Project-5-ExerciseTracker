const User=require('../models/user')
const Exercise=require('../models/exercise')

const handleUserAdd=async (req,res)=>{
    let username=req.body.username;
    if(!username){
      res.json('username mandatory')
    }
    const userObj=new User({
      username: username
    });
    const data=await userObj.save();
    res.json({
      username: data.username,
      _id: data._id
    })
  };

  const getAllUsers=async (req,res)=>{
    const data=await User.find({},{username: true, _id: true})
    res.json(data)
  };

  const handleAddExercise= async (req, res) => {
    let {description,duration,date}=req.body;
    let id=req.params._id
  
    try{
      const userFound=await User.findById(id);
      var exObj=new Exercise({
        userId: id,
        username: userFound.username,
        description,
        duration,
        date: date?new Date(date): new Date()
      })
      const newEx=await exObj.save();
      res.json({
        username: userFound.username,
        _id: newEx.userId,
    description: description,
    duration: Number(duration),
    date: newEx.date.toDateString()
      })
    }
    catch(err){
      res.json(err)
    }
  
  }

  const handleUserLogs=async (req,res)=>{
    let uid=req.params._id;
    let {from,to,limit}=req.query
  
    let dateObj={};
    if(from){
      dateObj['$gte']=new Date(from);
    }
    if(to){
      dateObj['$lte']=new Date(to);
    }
  
    let filter={userId: uid};
    if(from || to){
      filter.date=dateObj
    }
    try{
      const execobj=await Exercise.find(filter).limit(limit?parseInt(limit):500)
      let log=execobj.map((data)=>{
        return(
          {
            description: data.description,
            duration: Number(data.duration),
            date: data.date.toDateString()
          }
        )
      })
  
      res.json({
        username: execobj.username,
        count: execobj.length,
        _id: uid,
        log: log
      })
    }
    catch(err){
      return res.json(err)
    }
  }
  

  module.exports={handleUserAdd,getAllUsers,handleAddExercise,handleUserLogs}