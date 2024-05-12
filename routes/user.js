const router=require('express').Router();
const {handleUserAdd,getAllUsers,handleAddExercise,handleUserLogs}=require('../controllers/userController')


router.route('/').get(getAllUsers).post(handleUserAdd)

router.route('/:_id/exercises').post(handleAddExercise)

router.route('/:_id/logs').get(handleUserLogs)

module.exports=router