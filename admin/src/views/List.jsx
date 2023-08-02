import { useEffect, useState } from 'react';
import axios from 'axios';

import { AuthState } from '../context/authProvider';
import CourseGoalList from '../components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from '../components/CourseGoals/CourseInput/CourseInput';

const List = () => {
	const [courseGoals, setCourseGoals] = useState([]);
	const [completedGoals, setCompletedGoals] = useState([]);
	const [refreshList, setRefreshList] = useState(false);

	const { user } = AuthState();

	const addGoalHandler = async (enteredText) => {
		try {
			const res = await axios.post('/task', {
				name: enteredText,
				status: false,
				creator: user._id,
			});

			console.log('Task Created!!');
			setRefreshList(true);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteItemHandler = async (goalId) => {
		try {
			const res = await axios.put(`/task/${goalId}`);

			console.log('Task Completed !!');
			setRefreshList(true);
		} catch (error) {
			console.log(error);
		}
	};

	const getAllGoals = async () => {
		try {
			const res = await axios.get(`/task/${user._id}`);

			if (res.status === 201) {
				setRefreshList(true);
				setCourseGoals(res.data.tasks);
				setCompletedGoals(res.data.completed);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user?._id) getAllGoals();
	}, [user, refreshList]);

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
