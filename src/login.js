import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function Login() {
	return (
		<Container>
			<Form className='border w-50 p-3 m-auto mt-5'>
				<Form.Group className='mb-3 mt-3' controlId='formBasicEmail'>
					<Form.Control type='email' placeholder='아이디' data-testid='email-input' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Control type='password' placeholder='비밀번호' data-testid='password-input' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicCheckbox'>
					<Form.Check type='checkbox' label='로그인 상태 유지' />
				</Form.Group>
				<div className='d-flex justify-content-between'>
					<Button variant='primary' type='submit'>
						로그인
					</Button>
					<Button variant='outline-primary' type='button'>
						회원가입
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default Login;
