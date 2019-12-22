import React, { useState, useEffect } from 'react';
import { Label } from 'semantic-ui-react';
import slug from 'slug';
import './App.css';
import Header from './components/Header';
import TodosTable from './components/TodosTable';

const TODOS_URL = 'http://localhost:4500/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await fetch(TODOS_URL);
      const json = await res.json();
      setTodos(json);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const areAllChecked = () => todos.every(todo => todo.completed);

  const checkTodo = id => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todoToUpdate.completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(`${TODOS_URL}/${id}`, options);
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
    const options = {
      method: 'DELETE',
    };
    fetch(`${TODOS_URL}/${id}`, options);
  };

  const findTodo = title =>
    todos.find(
      todo =>
        !todo.title.localeCompare(title, undefined, { sensitivity: 'accent' })
    );

  const createTodo = title => {
    if (!title || findTodo(title)) {
      return false;
    }

    const todo = { id: slug(title), title, completed: false };
    setTodos([...todos, todo]);
    const options = {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(TODOS_URL, options);
    return true;
  };

  if (error) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <h1 style={{ color: 'red' }}>Error loading todos.</h1>
      </div>
    );
  }

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
