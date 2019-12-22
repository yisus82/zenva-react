import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Icon } from 'semantic-ui-react';
import TodoItem from './TodoItem';

const TodosTable = ({
  todos,
  checkAll,
  clearCompleted,
  checkTodo,
  removeTodo,
}) => {
  const allChecked = todos.every(todo => todo.completed);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Checkbox checked={allChecked} onClick={() => checkAll()} />
          </Table.HeaderCell>
          <Table.HeaderCell>Complete all</Table.HeaderCell>
          <Table.HeaderCell>
            <Button
              animated
              color="orange"
              size="tiny"
              floated="right"
              onClick={() => clearCompleted()}
            >
              <Button.Content hidden>Clear</Button.Content>
              <Button.Content visible>
                <Icon name="recycle" />
              </Button.Content>
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            checkTodo={checkTodo}
            removeTodo={removeTodo}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

TodosTable.propTypes = {
  todos: PropTypes.array.isRequired,
  checkAll: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodosTable;
