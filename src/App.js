import React from 'react';
import Profile from './Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Todo from './Todo';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Profile />} />
					<Route path='signin' element={<Login />} />
					<Route path='signup' element={<Signup />} />
					<Route path='todo' element={<Todo />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
