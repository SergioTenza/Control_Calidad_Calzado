import Task from '../models/Task'

export const createTask = async (req, res) => {
    const {fecha, horaInicio, horaFinal, logo, skin, tema, texto} = req.body
    const newTask = new Task({fecha, horaInicio, horaFinal, logo, skin, tema, texto});
    const taskSaved = await newTask.save();
    res.status(201).json(taskSaved);
}
export const getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
}
export const getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.taskId);
    res.status(200).json(task);
}
export const updateTaskById = async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
        new: true
    });
    res.status(200).json(updatedTask);   
}
export const deleteTaskById = async (req, res) => {
    const {taskId} = req.params;
    await Task.findByIdAndDelete(taskId);
    res.status(204).json();
}