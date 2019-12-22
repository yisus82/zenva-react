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

  const checkTodo = (id, completed) => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(`${TODOS_URL}/${id}`, options).then(fetchTodos);
  };

  const checkAll = () => {
    const completed = todos.some(todo => !todo.completed);
    todos.forEach(todo => checkTodo(todo.id, completed));
  };

  const removeTodo = id => {
    const options = {
      method: 'DELETE',
    };
    return fetch(`${TODOS_URL}/${id}`, options).then(fetchTodos);
  };

  const clearCompleted = () =>
    todos.filter(todo => todo.completed).forEach(todo => removeTodo(todo.id));

  const findTodo = id => todos.find(todo => todo.id === id);

  const createTodo = title => {
    if (!title) {
      return false;
    }

    const id = slug(title).toLowerCase();

    if (findTodo(id)) {
      return false;
    }

    const todo = { id, title, completed: false };
    const options = {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(TODOS_URL, options).then(fetchTodos);
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
            checkAll={checkAll}
            clearCompleted={clearCompleted}
            checkTodo={checkTodo}
            removeTodo={removeTodo}
          />
        )}
      </div>
    </div>
  );
};

export default App;
