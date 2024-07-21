import { useState, useEffect } from "react";
import { db } from "./config/friebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Create Todo list
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input !== "")
      await addDoc(collection(db, "todos"), {
        text: input,
        completed: false,
      });
    setInput("");
  };

  // Read Todo list
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Handle Item Done
  const handleItemDone = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete Todo list
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form onSubmit={createTodo} className="input-tasks">
        <input
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="What is the task today?"
        />
        <button>Add</button>
      </form>
      <div className="to-do-container">
        <ul>
          {todos.map((todo, index) => {
            return (
              <div className="item">
                <li
                  className={todo.completed ? "done" : ""}
                  key={index}
                  onClick={() => handleItemDone(todo)}
                >
                  {todo.text}
                </li>
                <span onClick={() => deleteTodo(todo.id)}>❌</span>
              </div>
            );
          })}
        </ul>
      </div>
      <p>{`You have ${todos.length} task to do`}</p>
    </div>
  );
}

export default App;
