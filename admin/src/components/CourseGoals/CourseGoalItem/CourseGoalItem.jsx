import './CourseGoalItem.css';

const CourseGoalItem = (props) => {
	const deleteHandler = () => {
		if (props.cursorStyle === 'default') return;
		props.onDelete(props.id);
	};

	return (
		<li className="goal-item" onClick={deleteHandler} style={{ cursor: props.cursorStyle }}>
			{props.children}
		</li>
	);
};

export default CourseGoalItem;
