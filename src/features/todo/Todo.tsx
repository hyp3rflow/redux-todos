import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, returnTodo } from './todoSlice';

const Todo = () => {
  const todo = useSelector(returnTodo);
  const dispatch = useDispatch();

  const [todoString, setTodoString] = useState('');

  return (
    <>
      <div>
        <input
          placeholder="new todo string"
          onChange={e => setTodoString(e.target.value)}
          value={todoString}
        />
        <button aria-label="add todo" onClick={() => dispatch(add(todoString))}>
          Add todo
        </button>
      </div>
      <div>
        {todo.map((value, index) => (
          <p key={index}>
            {value}
            <button onClick={() => dispatch(remove(index))}>delete</button>
          </p>
        ))}
      </div>
    </>
  );
};

export default Todo;
