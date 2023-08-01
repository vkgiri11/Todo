import Task from '../models/taskModel';

export const getAllTasks = async (req, res) => {
	const { id } = req.user._id;
  
	try {
		const tasks = await Task.findById(id);

		res.status(200).json({ data: tasks });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
