import './Todo.css';
import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

let todoItemId = 0;
const TodoItemInputField = (props) => {
	const [input, setInput] = useState('');
	const onSubmit = () => {
		props.onSubmit(input);
		setInput('');
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
	const style = props.todoItem.isFinished ? { textDecoration: 'line-through' } : {};
	return (
		<li>
			<Row xs={7}>
				<Col xs={1}>
					<input className='me-2' type='checkbox' name='' onClick={() => props.onTodoCheckClick(props.todoItem)} />
				</Col>
				<Col xs={3} className='text-center'>
					<span className='me-2' style={style}>
						{props.todoItem.todoItemContent}
					</span>
				</Col>
				<Col xs={2}>
					<Button
						variant='outline-primary'
						size='sm'
						className='btn-todo-danger'
						onClick={() => props.onRemoveClick(props.todoItem)}>
						수정
					</Button>
				</Col>
				<Col xs={2}>
					<Button
						variant='outline-danger'
						size='sm'
						className='btn-todo-danger'
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
	const onSubmit = (newTodoItem) => {
		setTodoItemList([
			...todoItemList,
			{
				id: todoItemId++,
				todoItemContent: newTodoItem,
				isFinished: false,
			},
		]);
	};
	const onTodoCheckClick = (clickedTodoItem) => {
		setTodoItemList(
			todoItemList.map((todoItem) => {
				if (clickedTodoItem.id === todoItem.id) {
					return {
						id: clickedTodoItem.id,
						todoItemContent: clickedTodoItem.todoItemContent,
						isFinished: !clickedTodoItem.isFinished,
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
