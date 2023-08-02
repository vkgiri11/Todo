import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import './CourseGoalList.css';

const CourseGoalList = ({ courseGoals, completed, onDeleteItem }) => {

	return (
		<ul className="goal-list">
			<span className="goal-header">Tasks</span>
			{!courseGoals.length ? (
				<p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
			) : (
				courseGoals.map((goal) => (
					<CourseGoalItem
						key={goal._id}
						id={goal._id}
						onDelete={onDeleteItem}
						cursorStyle="pointer">
						{goal.name}
					</CourseGoalItem>
				))
			)}
			<span className="goal-header">Completed Tasks</span>
			{!completed.length ? (
				<p style={{ textAlign: 'center' }}>Complete a task soon.</p>
			) : (
				completed.map((goal) => (
					<CourseGoalItem key={goal._id} id={goal._id} cursorStyle="default">
						{goal.name}
					</CourseGoalItem>
				))
			)}
		</ul>
	);
};

export default CourseGoalList;
