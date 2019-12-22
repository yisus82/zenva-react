import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Icon } from 'semantic-ui-react';
import TodoItem from './TodoItem';

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

export default TodosTable;