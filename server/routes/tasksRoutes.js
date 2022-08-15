const express = require('express')
const router = express.Router()

const {Addtask,Findtask,Updatetask,Deletetask} = require('../controller/tasksController')

router.post('/', Addtask)
router.get('/', Findtask)
router.put('/:id', Updatetask)
router.delete('/:id', Deletetask)

module.exports = router