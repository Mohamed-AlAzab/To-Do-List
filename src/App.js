import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const inputRef = useRef();

  const handleAddTodo = () => {
    const text = inputRef.current.value;
    const newItem = { completed: false, text };
    if(text !== "")
      setTodos([...todos, newItem]);
    inputRef.current.value = "";
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1)
    setTodos(newTodos)
  };

  return (
    <div className="container">
      <div className="App">
        <h1>To Do List</h1>
        <div className="input-tasks">
          <input ref={inputRef} placeholder="Enter your task..." />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <div className="to-do-container">
          <ul>
            {todos.map(({ text, completed }, index) => {
              return (
                <div className="item">
                  <li
                    className={completed ? "done" : ""}
                    key={index}
                    onClick={() => handleItemDone(index)}
                  >
                    {text}
                  </li>
                  <span onClick={() => handleDeleteItem(index)}>❌</span>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
