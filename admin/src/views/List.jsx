import { useState } from "react";

import CourseGoalList from "../components/CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "../components/CourseGoals/CourseInput/CourseInput";

const List = () => {
	const [courseGoals, setCourseGoals] = useState([]);
	const [completedGoals, setCompletedGoals] = useState([]);

	const addGoalHandler = (enteredText) => {
		setCourseGoals((prevGoals) => {
			const updatedGoals = [...prevGoals];
			updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
			return updatedGoals;
		});
	};

	const deleteItemHandler = (goalId) => {
		setCourseGoals((prevGoals) => {
			const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
			return updatedGoals;
		});
		setCompletedGoals((prev) => [...prev, courseGoals.filter((item) => item.id === goalId)[0]]);
	};

	return (
		<div>
			<section id="goal-form">
				<CourseInput onAddGoal={addGoalHandler} />
			</section>
			<section id="goals">
				<CourseGoalList
					items={courseGoals}
					completed={completedGoals}
					onDeleteItem={deleteItemHandler}
				/>
			</section>
		</div>
	);
};
export default List;
