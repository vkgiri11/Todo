import { useEffect, useState } from 'react';
import axios from 'axios';

import { AuthState } from '../context/authProvider';
import CourseGoalList from '../components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from '../components/CourseGoals/CourseInput/CourseInput';

const List = () => {
	const [courseGoals, setCourseGoals] = useState([]);
	const [completedGoals, setCompletedGoals] = useState([]);

	const { user } = AuthState();

	const addGoalHandler = async (enteredText) => {
		try {
			const res = await axios.post('/task', {
				name: enteredText,
				status: false,
				creator: user._id,
			});

			console.log('Task Created!!');
			setCourseGoals((p) => [{ name: enteredText, status: false, creator: user._id }, ...p]);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteItemHandler = (goalId) => {
		setCourseGoals((prevGoals) => {
			const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
			return updatedGoals;
		});
		setCompletedGoals((prev) => [...prev, courseGoals.filter((item) => item.id === goalId)[0]]);
	};

	const getAllGoals = async () => {
		try {
			const res = await axios.get(`/task/${user._id}`);

			if (res.status === 201) setCourseGoals(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user?._id) getAllGoals();
	}, []);

	return (
		<div>
			<section id="goal-form">
				<CourseInput onAddGoal={addGoalHandler} />
			</section>
			<section id="goals">
				<CourseGoalList
					courseGoals={courseGoals}
					completed={completedGoals}
					onDeleteItem={deleteItemHandler}
				/>
			</section>
		</div>
	);
};
export default List;
