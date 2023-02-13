import './Todo.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

let todoItemId = 0;
const token = localStorage.getItem('token');
const TodoItemInputField = (props) => {
	const [input, setInput] = useState('');
	const onSubmit = () => {
		props.onSubmit(input);
		setInput('');
		axios('https://pre-onboarding-selection-task.shop/todos', {
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			data: {
				todo: input,
			},
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<Form className='mt-5 d-flex mb-5'>
			<Form.Control
				data-testid='new-todo-input'
				name='todo'
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<Button
				className='btn-todo-primary'
				data-testid='new-todo-add-button'
				variant='primary'
				type='button'
				onClick={onSubmit}>
				추가
			</Button>
		</Form>
	);
};
const TodoItem = (props) => {
	const style = props.todoItem.isCompleted ? { textDecoration: 'line-through' } : {};
	return (
		<li>
			<Row>
				<Col xs={1}>
					<input
						type='checkbox'
						onChange={() => props.onTodoCheckClick(props.todoItem)}
						checked={props.todoItem.isCompleted}
					/>
				</Col>
				<Col xs={2}>
					<span style={style}>{props.todoItem.todo}</span>
				</Col>
				<Col xs={1}>
					<Button variant='outline-primary' size='sm' className='btn-todo-danger' data-testid='modify-button'>
						수정
					</Button>
				</Col>
				<Col xs={1}>
					<Button
						variant='outline-danger'
						size='sm'
						className='btn-todo-danger'
						data-testid='delete-button'
						onClick={() => props.onRemoveClick(props.todoItem)}>
						삭제
					</Button>
				</Col>
			</Row>
		</li>
	);
};
const TodoItemList = (props) => {
	const todoList = props.todoItemList.map((todoItem, index) => {
		return (
			<TodoItem
				key={index}
				todoItem={todoItem}
				onTodoCheckClick={props.onTodoCheckClick}
				onRemoveClick={props.onRemoveClick}
			/>
		);
	});
	return (
		<div>
			<ul>{todoList}</ul>
		</div>
	);
};

function MakeTodo() {
	const [todoItemList, setTodoItemList] = useState([]);
	useEffect(() => {
		axios('https://pre-onboarding-selection-task.shop/todos', {
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			setTodoItemList(res.data);
		});
	}, []);
	const onSubmit = (newTodoItem) => {
		setTodoItemList([
			...todoItemList,
			{
				id: todoItemId++,
				todo: newTodoItem,
				isCompleted: false,
			},
		]);
	};
	const onTodoCheckClick = (clickedTodoItem) => {
		setTodoItemList(
			todoItemList.map((todoItem) => {
				if (clickedTodoItem.id === todoItem.id) {
					axios(`https://pre-onboarding-selection-task.shop/todos/${clickedTodoItem.id}`, {
						method: 'put',
						headers: {
							Authorization: `Bearer ${token}`,
						},
						data: {
							todo: clickedTodoItem.todo,
							isCompleted: !clickedTodoItem.isCompleted,
						},
					})
						.then((res) => {
							console.log(res.data);
						})
						.catch((err) => {
							console.log(err);
						});
					return {
						id: clickedTodoItem.id,
						todo: clickedTodoItem.todo,
						isCompleted: !clickedTodoItem.isCompleted,
					};
				} else {
					return todoItem;
				}
			})
		);
	};
	const onRemoveClick = (removedTodoItem) => {
		setTodoItemList(
			todoItemList.filter((todoItem) => {
				axios(`https://pre-onboarding-selection-task.shop/todos/${removedTodoItem.id}`, {
					method: 'delete',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => {
					console.log(res);
				});
				return todoItem.id !== removedTodoItem.id;
			})
		);
	};

	return (
		<Container>
			<TodoItemInputField onSubmit={onSubmit} />
			<TodoItemList todoItemList={todoItemList} onTodoCheckClick={onTodoCheckClick} onRemoveClick={onRemoveClick} />
		</Container>
	);
}
export default MakeTodo;
