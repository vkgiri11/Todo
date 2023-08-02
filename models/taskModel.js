import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
	name: { type: String, trim: true },
	status: { type: Boolean },
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
