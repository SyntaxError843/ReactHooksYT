import React, { useState } from 'react';
import './App.css';

function Todo({ todo, index }) {
  return (
    <div className="todo">
      {todo.text}
    </div>
  )
}

// this one is confusing as heckk
// creating a sort of temp state, to easily get and set a value in it
// at the end of the day its a temp state not the main one

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return; // if input of form is blank then break
    addTodo(value); // function written below that was passed into this component
    // so value here is the "text" argument
    setValue(''); // sets {value} to blank which in turn clears the input of the form
  }

  return (
    <form onSubmit={handleSubmit}> {/* written above, this is what triggers it */}
      <input
        type="text"
        className="input"
        value={value}
        // assign text inside input box to {value}, which makes it change dynamically
        onChange={e => setValue(e.target.value)}
        // dynamically sets {value} = e.target.value
        // which is what is being written
        placeholder="Add Todo..."
      />
    </form>
  )
}

function App() {
  // below is how to use state inside a function rather than a class
  // it is known as a hook
  // todos is the main array that contains read-only data
  // setTodos is the setter function, it takes an array as argument
  // and overwrites todos
  // also you can write hard coded entries inside the useState function

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

  // declaring a method called addTodo
  // takes a single string of text as argument
  // and adds it to a temp array (newTodos)
  // that then becomes the new "state" todos array

  const addTodo = text => {
    const newTodos = [ ...todos, { text } ];
    // ... is know as a spread operator, in summary it returns the elements of an array or string
    // it is used here to basically create a copy of the todos array and then add text at the end
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} index={index} todo={todo} />
        ))}
        <TodoForm addTodo={addTodo} />
        {/*
        passing addTodo method into TodoForm function 
        mainly because we dont have access to the state outside the App function
        so we cant just write that code in the TodoForm function
        */}
      </div>
    </div>
  );
}

export default App;
