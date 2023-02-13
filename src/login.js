import './Login.css';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const onChangeEmail = (e) => {
		if (!e.target.value) {
			setEmailError(true);
		} else {
			setEmailError(false);
		}
		setEmail(e.target.value);
	};
	const onChangePassword = (e) => {
		if (!e.target.value) {
			setPasswordError(true);
		} else {
			setPasswordError(true);
		}
		setPassword(e.target.value);
	};
	const navigate = useNavigate();
	const goSignup = () => {
		navigate('/signup');
	};
	const onSubmit = () => {
		axios
			.post('https://pre-onboarding-selection-task.shop/auth/signin', {
				email,
				password,
			})
			.then((res) => {
				localStorage.setItem('token', res.data.access_token);
				alert('로그인에 성공했습니다!');
				document.location.href = '/';
			})
			.catch((err) => {
				alert(err);
			});
	};
	return (
		<Container>
			<Form className='border w-50 p-3 m-auto mt-5'>
				<h2 className='text-center'>로그인</h2>
				<Form.Group className='mb-3 mt-3' controlId='formBasicEmail'>
					<Form.Control type='email' placeholder='아이디' value={email} onChange={onChangeEmail} />
					{emailError && <div className='invalid-input'>이메일은 @를 반드시 포함하여야 합니다</div>}
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Control type='password' placeholder='비밀번호' value={password} onChange={onChangePassword} />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='로그인 상태 유지' />
				</Form.Group>
				<div className='d-flex justify-content-between'>
					<Button
						variant='primary'
						type='button'
						data-testid='signin-button'
						disabled={!(email && password)}
						onClick={onSubmit}>
						로그인
					</Button>
					<Button variant='outline-primary' data-testid='signup-button' type='button' onClick={goSignup}>
						회원가입
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default Login;
