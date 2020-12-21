import React, { useEffect, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, returnTodo, togglePin, ITodo } from './todoSlice';

import {
  AiFillPushpin,
  AiOutlinePushpin,
  AiOutlineDelete,
} from 'react-icons/ai';

const Pin = ({
  pinFlag,
  onClick,
  style,
}: {
  pinFlag: boolean;
  onClick: () => void;
  style: CSSProperties;
}) => {
  if (pinFlag) {
    return <AiFillPushpin style={style} onClick={onClick} />;
  } else {
    return <AiOutlinePushpin style={style} onClick={onClick} />;
  }
};

const Todo = () => {
  const todo = useSelector(returnTodo);
  const dispatch = useDispatch();

  const [todoString, setTodoString] = useState('');
  const [todoArray, setTodoArray] = useState<ITodo[]>([]);

  useEffect(() => {
    setTodoArray(
      todo.slice().sort((a, b) => {
        if (b.pin) return 1;
        else if (a.pin) return -1;
        else return 0;
      })
    );
  }, [setTodoArray, todo]);

  return (
    <div>
      <h1>Simple Todo App.</h1>
      <InputContainer>
        <TodoInput
          placeholder="new todo string"
          onChange={e => setTodoString(e.target.value)}
          value={todoString}
        />
        <AddTodoButton
          aria-label="add todo"
          onClick={() => dispatch(add(todoString))}
        >
          Add todo
        </AddTodoButton>
      </InputContainer>
      <TodoContainer>
        {todoArray.map(value => (
          <TodoParagraph key={value.id}>
            <TodoSpan>
              <Pin
                pinFlag={value.pin}
                onClick={() => dispatch(togglePin(value.id))}
                style={{ marginRight: '0.5rem' }}
              />
              {value.content}
            </TodoSpan>
            <TodoSpan>
              <AiOutlineDelete onClick={() => dispatch(remove(value.id))}>
                delete
              </AiOutlineDelete>
            </TodoSpan>
          </TodoParagraph>
        ))}
      </TodoContainer>
    </div>
  );
};

const TodoInput = styled.input`
  font-size: 2rem;
`;

const AddTodoButton = styled.button`
  height: 2.75rem;
  padding: 0 1rem;

  margin-left: 1rem;
`;

const InputContainer = styled.section`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`;

const TodoContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const TodoParagraph = styled.p`
  width: 100%;

  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

const TodoSpan = styled.span`
  display: flex;
  align-items: center;
`;

export default Todo;
