import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import './CourseGoalList.css';

const CourseGoalList = (props) => {
	return (
		<ul className="goal-list">
			<span className="goal-header">Tasks</span>
			{!props.items.length ? (
				<p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
			) : (
				props.items.map((goal) => (
					<CourseGoalItem
						key={goal._id}
						id={goal._id}
						onDelete={props.onDeleteItem}
						cursorStyle="pointer">
						{goal.name}
					</CourseGoalItem>
				))
			)}
			<span className="goal-header">Completed Tasks</span>
			{!props.completed.length ? (
				<p style={{ textAlign: 'center' }}>Complete a task soon.</p>
			) : (
				props.completed.map((goal) => (
					<CourseGoalItem key={goal._id} id={goal._id} cursorStyle="default">
						{goal.name}
					</CourseGoalItem>
				))
			)}
		</ul>
	);
};

export default CourseGoalList;
