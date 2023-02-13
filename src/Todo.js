import { useState, useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './Todo.css';

const Todo = () => {
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState([]);
	const [nextId, setNextId] = useState(0);
	const [isEditing, setIsEditing] = useState(false);
	const [editedTodo, setEditedTodo] = useState('');
	const inputName = useRef(null);

	const onChange = (e) => {
		setInput(e.target.value);
	};

	const addTodo = () => {
		const about_todos = todos.concat({
			id: nextId,
			text: input,
		});
		setNextId(nextId + 1);
		setTodos(about_todos);
		setInput('');
	};

	const removeTodo = (id) => {
		const about_todos = todos.filter((todo) => todo.id !== id);
		setTodos(about_todos);
	};

	const modifyTodo = (id) => {
		todos.map((todo) => {
			if (todo.id === id) {
				inputName.current.focus();
				todo.text = inputName.current.value;
			}
		});
		setTodos(todos);
		setInput('');
	};
	const input_todo = todos.map((todo) => (
		<li key={todo.id}>
			<label className='mt-5'>
				<input type='checkbox' className='me-2' />
				<span className='me-2'>{todo.text}</span>
			</label>
			<Button variant='outline-primary' size='sm' data-testid='modify-button' onClick={() => modifyTodo(todo.id)}>
				수정
			</Button>
			<Button variant='outline-danger' size='sm' data-testid='delete-button' onClick={() => removeTodo(todo.id)}>
				삭제
			</Button>
		</li>
	));
	return (
		<Container>
			<Form className='mt-5 d-flex'>
				<Form.Control name='todo' type='text' value={input} onChange={onChange} ref={inputName} />
				<Button variant='primary' type='button' onClick={addTodo}>
					추가
				</Button>
			</Form>
			<ul>{input_todo}</ul>
		</Container>
	);
};

export default Todo;
