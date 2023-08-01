import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './views/Home';
import List from './views/List';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="*" element={<Navigate to="/list" replace />} />
				<Route path="home" element={<Home />} />
				<Route path="list" element={<List />} />
			</Routes>
		</>
	);
};

export default App;
