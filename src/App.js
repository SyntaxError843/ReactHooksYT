import React, { useState } from 'react';
import './App.css';

function Todo({ todo, index}) {
  return (
    <div className="todo">
      {todo.text}
    </div>
  )
}

// this one is confusing as heckk
function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return; // if input of form is blank then break
    addTodo(value); // add {value} to main todo state (i.e the hard coded array)
    setValue(''); // sets {value} to blank which in turn clears the input of the form
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value} // assign text inside input box to {value} but not the other way around
        onChange={e => setValue(e.target.value)} // dynamically sets {value} = e.target.value
                                                 // which is what is being written
        placeholder="Add Todo..."
      />
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState(
    [
      {
        text: 'Clean up the mess',
        isCompleted: false
      },
      {
        text: 'Take out the trash',
        isCompleted: false
      },
      {
        text: 'Hide the bodies!!!',
        isCompleted: false
      }
    ]
  )

  // declaring function called addTodo that takes text as argument and adds it to temp array that then becomes the new todos array
  const addTodo = text => {
    const newTodos = [ ...todos, { text } ];
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
