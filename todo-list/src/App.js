import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Icon, Label } from 'semantic-ui-react';
import './App.css';

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

const TodoItem = ({ title, completed, checkTodo, removeTodo }) => (
  <Table.Row>
    <Table.Cell>
      <Checkbox checked={completed} onClick={() => checkTodo(title)} />
    </Table.Cell>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>
      <Button
        animated
        color="red"
        size="tiny"
        floated="right"
        onClick={() => removeTodo(title)}
      >
        <Button.Content hidden>Delete</Button.Content>
        <Button.Content visible>
          <Icon name="trash" />
        </Button.Content>
      </Button>
    </Table.Cell>
  </Table.Row>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  checkTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

const TodosTable = ({
  todos,
  setTodos,
  areAllChecked,
  checkTodo,
  removeTodo,
}) => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Checkbox
              checked={areAllChecked()}
              onClick={() =>
                setTodos(() => {
                  const check = !areAllChecked();
                  return todos.map(todo => ({ ...todo, completed: check }));
                })
              }
            />
          </Table.HeaderCell>
          <Table.HeaderCell>Complete all</Table.HeaderCell>
          <Table.HeaderCell>
            <Button
              animated
              color="orange"
              size="tiny"
              floated="right"
              onClick={() =>
                setTodos(() => todos.filter(todo => !todo.completed))
              }
            >
              <Button.Content hidden>Clean</Button.Content>
              <Button.Content visible>
                <Icon name="recycle" />
              </Button.Content>
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {todos.map(({ title, completed }) => (
          <TodoItem
            key={title}
            title={title}
            completed={completed}
            checkTodo={checkTodo}
            removeTodo={removeTodo}
          />
        ))}
      </Table.Body>
    </Table>
  );

TodosTable.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
  areAllChecked: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

const Header = ({ createTodo }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      <div style={{ display: 'flex' }}>
        <input
          id="new-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          aria-label="New Todo"
          value={title}
          onChange={event => setTitle(event.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <Button
          animated
          color="blue"
          size="tiny"
          onClick={() => {
            if (createTodo(title)) {
              setTitle('');
              setError('');
            } else {
              setError('Duplicated ToDo title');
            }
          }}
        >
          <Button.Content hidden>Create</Button.Content>
          <Button.Content visible>
            <Icon name="add" />
          </Button.Content>
        </Button>
      </div>
      <p style={{ color: 'red', margin: '1rem 0' }}>{error}</p>
    </>
  );
};

Header.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

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
