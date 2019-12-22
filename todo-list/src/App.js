import React, { useState } from 'react';
import { Label } from 'semantic-ui-react';
import './App.css';
import Header from './components/Header';
import TodosTable from './components/TodosTable';

const initialTodos = [
  {
    title: 'Learn React',
    completed: false,
  },
  {
    title: 'Learn Redux',
    completed: false,
  },
  {
    title: 'Learn React Native',
    completed: false,
  },
  {
    title: 'Create a brand new web app!',
    completed: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const areAllChecked = () => todos.every(todo => todo.completed);

  const checkTodo = title =>
    setTodos(
      todos.map(todo =>
        todo.title === title ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const removeTodo = title =>
    setTodos(todos.filter(todo => todo.title !== title));

  const findTodo = title =>
    todos.find(
      todo =>
        !todo.title.localeCompare(title, undefined, { sensitivity: 'accent' })
    );

  const createTodo = title => {
    if (!title || findTodo(title)) {
      return false;
    }

    const todo = { title, completed: false };
    setTodos([...todos, todo]);
    return true;
  };

  return (
    <div className="app">
      <div className="todo-container">
        <Header createTodo={createTodo} />
        {todos.length === 0 ? (
          <Label style={{ marginTop: '1rem', width: '100%' }} color="blue">
            Nothing to do yet.
          </Label>
        ) : (
          <TodosTable
            todos={todos}
            setTodos={setTodos}
            areAllChecked={areAllChecked}
            checkTodo={checkTodo}
            removeTodo={removeTodo}
          />
        )}
      </div>
    </div>
  );
};

export default App;
