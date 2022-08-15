
module.exports ={
    Addtask: async (req, res) => {
        try {
            const task = await new Task(req.body).save();
            res.send(task);
        } catch (error) {
            res.send(error);
        }
    },
    
    Findtask: async (req, res) => {
        try {
            const tasks = await Task.find();
            res.send(tasks);
        } catch (error) {
            res.send(error);
        }
    },
    
    Updatetask: async (req, res) => {
        try {
            const task = await Task.findOneAndUpdate(
                { _id: req.params.id },
                req.body
            );
            res.send(task);
        } catch (error) {
            res.send(error);
        }
    },
    
    Deletetask: async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);
            res.send(task);
        } catch (error) {
            res.send(error);
        }
    },
    
}