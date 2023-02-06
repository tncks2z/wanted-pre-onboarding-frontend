import React from 'react';
import Profile from './Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Profile />} />
					<Route path='signin' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
