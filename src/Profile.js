import React from 'react';
import './Profile.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Profile() {
	const today = new Date();
	const birthday = new Date(1995, 9, 25);
	let name = 'Suchan';
	let age = today.getFullYear() - birthday.getFullYear() + 1;
	let myAddress = '경기도 성남시';
	let college = '가천대학교';

	// signin페이지로 이동
	const navigate = useNavigate();
	const goLogin = () => {
		navigate('/signin');
	};

	return (
		<div className='main-background'>
			<Container>
				<Row className='profile-1 white-box shadow p-5'>
					<Col lg={3} className='text-end p-3'>
						<img src='img/profile.jpg' alt='profile' />
					</Col>
					<Col lg={4} className='text-start p-3 mt-5'>
						<h2>{name}</h2>
						<p>Front-end Designer</p>
						<div className='f-blue d-flex'>
							<p>{myAddress}</p>
						</div>
						<button className='btn btn-primary w-50' onClick={goLogin}>
							로그인
						</button>
					</Col>
					<Col lg={1} className='border-start'></Col>
					<Col lg={2} className='text-end text-lg-start p-3 mt-5'>
						<p>Location</p>
						<p>Age</p>
						<p>Experience</p>
						<p>School</p>
					</Col>
					<Col lg={2} className='text-start p-3 mt-5'>
						<p>{myAddress}</p>
						<p>{age}세</p>
						<p>신입</p>
						<p>{college}</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
export default Profile;
