import React from 'react';
import Profile from './Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Todo from './TodoList';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
	const access = !!localStorage.getItem('token');
	return (
		<div className='App'>
			<React.Fragment>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Profile />} />
						<Route path='signin' element={<PublicRoute authenticated={access} component={<Login />} />} />
						<Route path='signup' element={<PublicRoute authenticated={access} component={<Signup />} />} />
						<Route path='todo' element={<PrivateRoute authenticated={access} component={<Todo />} />} />
					</Routes>
				</BrowserRouter>
			</React.Fragment>
		</div>
	);
}

export default App;
