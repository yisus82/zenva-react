import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const Header = ({ createTodo }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const submitTodo = () => {
    if (createTodo(title)) {
      setTitle('');
      setError('');
    } else {
      setError('Duplicated ToDo title');
    }
  };

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
          onKeyDown={event => {
            if (event.key === 'Enter') {
              submitTodo();
            }
          }}
          style={{ marginRight: '1rem' }}
        />
        <Button animated color="blue" size="tiny" onClick={() => submitTodo()}>
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

export default Header;
