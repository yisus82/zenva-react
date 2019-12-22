import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox, Button, Icon } from 'semantic-ui-react';

const TodoItem = ({ todo, checkTodo, removeTodo }) => {
  const { id, title, completed } = todo;
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          checked={completed}
          onClick={() => checkTodo(id, !completed)}
        />
      </Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        <Button
          animated
          color="red"
          size="tiny"
          floated="right"
          onClick={() => removeTodo(id)}
        >
          <Button.Content hidden>Delete</Button.Content>
          <Button.Content visible>
            <Icon name="trash" />
          </Button.Content>
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  checkTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoItem;
