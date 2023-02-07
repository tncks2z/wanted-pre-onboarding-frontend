import { Container, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import './Login.css';

function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	// Email 유효성 검사
	const onChangeEmail = (e) => {
		const emailRegex = /^[A-Za-z0-9]*@[A-Za-z0-9]*\.[A-Za-z]{2,3}$/;
		if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false);
		else setEmailError(true);
		setEmail(e.target.value);
	};

	// userPassword 유효성 검사
	const onChangePassword = (e) => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
		if (!e.target.value || passwordRegex.test(e.target.value)) setPasswordError(false);
		else setPasswordError(true);
		setPassword(e.target.value);
	};

	// validation
	const validation = () => {
		if (!email) setEmailError(true);
		if (!password) setPasswordError(true);
		if (email && password) {
			return true;
		} else {
			return false;
		}
	};
	// submit
	const onSubmit = (e) => {
		if (validation()) return;
	};
	return (
		<Container>
			<Form className='border w-50 p-3 m-auto mt-5'>
				<h2 className='text-center'>회원가입</h2>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>아이디</Form.Label>
					<Form.Control
						type='email'
						placeholder='아이디(이메일)'
						value={email}
						onChange={onChangeEmail}
						data-testid='email-input'
					/>
					{emailError && <div className='invalid-input'>이메일은 @를 반드시 포함하여야 합니다</div>}
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>비밀번호</Form.Label>
					<Form.Control
						type='password'
						placeholder='비밀번호'
						value={password}
						onChange={onChangePassword}
						data-testid='password-input'
					/>
					{passwordError && <div className='invalid-input'>비밀번호는 8자리 이상 입력해주세요</div>}
				</Form.Group>
				<Button
					className='w-100'
					variant='primary'
					type='submit'
					data-testid='signup-button'
					onClick={onSubmit}
					disabled={!(email && password)}>
					가입하기
				</Button>
			</Form>
		</Container>
	);
}

export default Signup;
