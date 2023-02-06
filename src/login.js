import './Login.css';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
	const navigate = useNavigate();
	const goSignup = () => {
		navigate('/signup');
	};
	return (
		<Container>
			<Form className='border w-50 p-3 m-auto mt-5'>
				<h2 className='text-center'>로그인</h2>
				<Form.Group className='mb-3 mt-3' controlId='formBasicEmail'>
					<Form.Control type='email' placeholder='아이디' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Control type='password' placeholder='비밀번호' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='로그인 상태 유지' />
				</Form.Group>
				<div className='d-flex justify-content-between'>
					<Button variant='primary' type='submit'>
						로그인
					</Button>
					<Button variant='outline-primary' type='button' onClick={goSignup}>
						회원가입
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default Login;
