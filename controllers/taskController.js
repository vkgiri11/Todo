import TaskModel from '../models/taskModel.js';

export const createTask = async (req, res) => {
	// const { id } = req.user._id;
	const { name, status, creator } = req.body;

	const taskData = { name, status, creator };

	try {
		const newTask = await TaskModel.create(taskData);

		const createdTask = await TaskModel.findOne({ _id: newTask._id }).populate('creator');

		res.status(200).json({ data: createdTask });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
