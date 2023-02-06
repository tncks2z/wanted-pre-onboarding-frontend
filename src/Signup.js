import { Container, Button, Form } from 'react-bootstrap';

function Signup() {
	return (
		<Container>
			<Form className='border w-50 p-3 m-auto mt-5'>
				<h2 className='text-center'>회원가입</h2>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>아이디</Form.Label>
					<Form.Control type='email' placeholder='아이디(이메일)' data-testid='email-input' />
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>비밀번호</Form.Label>
					<Form.Control type='password' placeholder='비밀번호' data-testid='password-input' />
				</Form.Group>
				<Button className='w-100' variant='primary' type='submit' data-testid='signup-button'>
					가입하기
				</Button>
			</Form>
		</Container>
	);
}

export default Signup;
