import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ authenticated, component: Component }) {
	return !authenticated ? Component : <Navigate to='/todo' />;
}

export default PublicRoute;
