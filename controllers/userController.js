import UserModel from '../models/userModel.js';

export const registerUser = async (req, res) => {
	const { name, email } = req.body;

	if (!name || !email) return res.status(400).json({ message: 'Please Enter all fields!!' });

	try {
		const existingUser = await UserModel.findOne({ email });

		if (existingUser)
			return res.status(200).json({
				_id: existingUser._id,
				name: existingUser.name,
				email: existingUser.email,
			});

		const result = await UserModel.create({ email, name });

		res.status(201).json({
			_id: result._id,
			name: result.name,
			email: result.email,
		});
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
		console.log(error);
	}
};
