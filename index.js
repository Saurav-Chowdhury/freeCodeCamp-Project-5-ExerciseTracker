const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();

const {dbCon}=require('./utility/connection');
const userRouter=require('./routes/user');


const bodyParser=require('body-parser');


app.use(express.urlencoded())
dbCon()





//const Exercise=mongoose.model('Exercise',ExerciseSchema)


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


//solution



app.use('/api/users',userRouter);

app.use('/api/users/:_id/exercises',userRouter)

app.use('/api/users/:_id/logs',userRouter)


//

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
