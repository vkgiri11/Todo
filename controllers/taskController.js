import TaskModel from '../models/taskModel.js';

export const getAllTasks = async (req, res) => {
	const { userId } = req.params;

	try {
		const result = await TaskModel.find({ creator: userId });

		const tasks = [],
			completed = [];

		for (const task of result) {
			if (task.status) completed.push(task);
			else tasks.push(task);
		}

		res.status(201).json({ tasks: tasks, completed: completed });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

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

export const updateTask = async (req, res) => {
	const { taskId } = req.params;

	try {
		const result = await TaskModel.findByIdAndUpdate(taskId, { status: true });

		res.status(201).json({ data: result });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
