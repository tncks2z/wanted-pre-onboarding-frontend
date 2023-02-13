import axios from 'axios';
import { useState, useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './Todo.css';

function Todo() {
	const token = localStorage.getItem('token');
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');
	const [complete, setComplete] = useState(false);
	const [nextId, setNextId] = useState(0);
	const inputName = useRef(null);

	const getTodoList = () => {
		axios
			.get('https://pre-onboarding-selection-task.shop/todos', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setTodos(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const onChangeInput = (e) => {
		setInput(e.target.value);
	};
	const onCheckedItem = (id) => {};
	const addTodo = () => {
		const aboutTodo = todos.concat({
			id: nextId,
			todo: input,
			isComplete: complete,
		});
		// axios
		// 	.post('https://pre-onboarding-selection-task.shop/todos', {
		// 		todo: input,
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 			'Content-Type': 'application/json',
		// 		},
		// 	})
		// 	.then((res) => {
		// 		setTodos(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(token);
		// 		console.log(err);
		// 	});
		console.log(aboutTodo);
		setNextId(nextId + 1);
		setTodos(aboutTodo);
		setInput('');
	};

	const removeTodo = (id) => {
		const aboutTodo = todos.filter((todo) => todo.id !== id);
		setTodos(aboutTodo);
	};

	const modifyTodo = (id) => {
		todos.map((todo) => {
			if (todo.id === id) {
				inputName.current.focus();
				todo.todo = inputName.current.value;
			}
		});
		setTodos(todos);
		setInput('');
	};

	const todoList = todos.map((todo) => (
		<li key={todo.id}>
			<label className='mt-5'>
				<input
					type='checkbox'
					className='me-2'
					checked={todo.isComplete}
					onChange={onCheckedItem(todo.id, todo.isComplete)}
				/>
				<span className='me-2'>{todo.todo}</span>
			</label>
			<Button
				className='btn-todo'
				variant='outline-primary'
				size='sm'
				data-testid='modify-button'
				onClick={() => modifyTodo(todo.id)}>
				수정
			</Button>
			<Button
				className='btn-todo'
				variant='outline-danger'
				size='sm'
				data-testid='delete-button'
				onClick={() => removeTodo(todo.id)}>
				삭제
			</Button>
		</li>
	));
	return (
		<Container>
			<Form className='mt-5 d-flex'>
				<Form.Control
					data-testid='new-todo-input'
					name='todo'
					type='text'
					value={input}
					onChange={onChangeInput}
					ref={inputName}
				/>
				<Button
					className='btn-todo'
					data-testid='new-todo-add-button'
					variant='primary'
					type='button'
					onClick={addTodo}>
					추가
				</Button>
			</Form>
			<ul>{todoList}</ul>
		</Container>
	);
}

export default Todo;
