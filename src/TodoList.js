import './Todo.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { render } from '@testing-library/react';

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
				props.renderTodos();
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
	const [newInput, setNewInput] = useState('');
	const [isEdited, setIsEdidted] = useState(false);

	const onModifyClick = () => {
		setIsEdidted(true);
	};

	const onCancelClick = () => {
		setIsEdidted(false);
	};

	const onNewSubmit = () => {
		props.onNewSubmit(props.todoItem, newInput);
		setNewInput('');
		axios(`https://pre-onboarding-selection-task.shop/todos/${props.todoItem.id}`, {
			method: 'put',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				todo: newInput,
				isCompleted: false,
			},
		})
			.then((res) => {
				console.log(res.data);
				setIsEdidted(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const style = props.todoItem.isCompleted ? { textDecoration: 'line-through' } : {};
	return (
		<li className='mb-2'>
			<Row>
				<Col xs={1}>
					<input
						type='checkbox'
						onChange={() => props.onTodoCheckClick(props.todoItem)}
						checked={props.todoItem.isCompleted}
					/>
				</Col>
				<Col xs={2}>
					{isEdited ? (
						<input
							type='text'
							className='w-100'
							data-testid='modify-input'
							value={newInput}
							onChange={(e) => setNewInput(e.target.value)}
						/>
					) : (
						<span style={style}>{props.todoItem.todo}</span>
					)}
				</Col>
				<Col xs={1}>
					{isEdited ? (
						<Button
							variant='outline-primary'
							size='sm'
							className='btn-todo-danger'
							data-testid='submit-button'
							onClick={onNewSubmit}>
							제출
						</Button>
					) : (
						<Button
							variant='outline-primary'
							size='sm'
							className='btn-todo-danger'
							data-testid='modify-button'
							disabled={props.todoItem.isCompleted}
							onClick={() => onModifyClick(props.todoItem)}>
							수정
						</Button>
					)}
				</Col>
				<Col xs={1}>
					{isEdited ? (
						<Button
							variant='outline-danger'
							size='sm'
							className='btn-todo-danger'
							data-testid='cancel-button'
							onClick={() => onCancelClick(props.todoItem)}>
							취소
						</Button>
					) : (
						<Button
							variant='outline-danger'
							size='sm'
							className='btn-todo-danger'
							data-testid='delete-button'
							onClick={() => props.onRemoveClick(props.todoItem)}>
							삭제
						</Button>
					)}
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
				onNewSubmit={props.onNewSubmit}
				onModifyClick={props.onModifyClick}
				onCancelClick={props.onCancelClick}
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
	const renderTodos = () => {
		axios('https://pre-onboarding-selection-task.shop/todos', {
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			setTodoItemList(res.data);
		});
	};
	useEffect(() => {
		renderTodos();
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
		setTodoItemList(
			todoItemList.map((todoItem) => {
				if (clickedTodoItem.id === todoItem.id) {
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
		axios(`https://pre-onboarding-selection-task.shop/todos/${removedTodoItem.id}`, {
			method: 'delete',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			console.log(res);
		});
		setTodoItemList(
			todoItemList.filter((todoItem) => {
				return todoItem.id !== removedTodoItem.id;
			})
		);
	};
	const onNewSubmit = (modifiedTodoItem, newInput) => {
		setTodoItemList(
			todoItemList.map((todoItem) => {
				if (modifiedTodoItem.id === todoItem.id) {
					return {
						id: modifiedTodoItem.id,
						todo: newInput,
						isCompleted: modifiedTodoItem.isCompleted,
					};
				} else {
					return todoItem;
				}
			})
		);
	};
	return (
		<Container>
			<TodoItemInputField onSubmit={onSubmit} renderTodos={renderTodos} />
			<TodoItemList
				todoItemList={todoItemList}
				onTodoCheckClick={onTodoCheckClick}
				onRemoveClick={onRemoveClick}
				onNewSubmit={onNewSubmit}
			/>
		</Container>
	);
}
export default MakeTodo;
