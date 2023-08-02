import TaskModel from '../models/taskModel.js';

export const createTask = async (req, res) => {
	const { name, status, creator } = req.body;

	if (!name || !creator) return res.status(400).json({ message: 'Invalid Parameters!' });

	const taskData = { name, status, creator };

	try {
		const newTask = await TaskModel.create(taskData);

		const createdTask = await TaskModel.findOne({ _id: newTask._id });

		res.status(200).json({ data: createdTask });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
