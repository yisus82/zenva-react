import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Icon } from 'semantic-ui-react';
import './App.css';

const todos = [
  'Learn React',
  'Learn Redux',
  'Learn React Native',
  'Create a brand new web app!',
];

const TodoItem = ({ text }) => (
  <Table.Row>
    <Table.Cell>
      <Checkbox />
    </Table.Cell>
    <Table.Cell>{text}</Table.Cell>
    <Table.Cell>
      <Button animated color="red">
        <Button.Content hidden>Delete</Button.Content>
        <Button.Content visible>
          <Icon name="trash" />
        </Button.Content>
      </Button>
    </Table.Cell>
  </Table.Row>
);

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
};

const App = () => (
  <div className="app">
    <div className="todo-container">
      <label htmlFor="new-todo" style={{ display: 'none' }}>
        New Todo
        <input
          id="new-todo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </label>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox />
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2">Select all</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map((todo, i) => (
            <TodoItem key={i} text={todo} />
          ))}
        </Table.Body>
      </Table>
    </div>
  </div>
);

export default App;
