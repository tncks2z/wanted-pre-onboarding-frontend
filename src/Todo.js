import { useState, useRef } from 'react';
import { Container, Form } from 'react-bootstrap';
import './Todo.css';

const Todo = () => {
	const [input, setInput] = useState('');
	const [todos, setTodos] = useState([]);
	const [nextId, setNextId] = useState(0);
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

	//삭제 이벤트 함수
	const removeTodo = (id) => {
		const about_todos = todos.filter((todo) => todo.id !== id);
		setTodos(about_todos);
	};

	//수정 이벤트 함수
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
			<label>
				<input type='checkbox' />
				<span>{todo.text}</span>
			</label>
			<button data-testid='modify-button' onClick={() => modifyTodo(todo.id)}>
				수정
			</button>
			<button data-testid='delete-button' onClick={() => removeTodo(todo.id)}>
				삭제
			</button>
		</li>
	));
	return (
		<Container>
			<Form className='mt-5'>
				<input name='todo' type='text' value={input} onChange={onChange} ref={inputName} />
				<button type='button' onClick={addTodo}>
					추가
				</button>
			</Form>
			<ul>{input_todo}</ul>
		</Container>
	);
};

export default Todo;
