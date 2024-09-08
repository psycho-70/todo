import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { FaEdit, FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";

function App() { 
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);
  
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  }

  const handleEdit = (id) => { 
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id); 
    setTodos(newTodos);
    saveToLS();
  }

  const handleDelete = (id) => {  
    const newTodos = todos.filter(item => item.id !== id); 
    setTodos(newTodos); 
    saveToLS();
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo(""); 
    saveToLS();
  }

  const handleChange = (e) => { 
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => { 
    const id = e.target.name;  
    const index = todos.findIndex(item => item.id === id); 
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }
 
  const handleDeleteAll = () => {
    setTodos([]);
    saveToLS();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
      console.log(e)
    }
  }
  return (
    <>
      <Navbar /> 
      <div className="container mx-auto my-5 p-5 bg-white shadow-lg rounded-xl min-h-[80vh] w-full md:w-[60%] lg:w-[40%]">
        <h1 className='font-bold text-center text-3xl mb-5 text-gray-800'>iTask - Manage Your Todos</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold text-gray-700'>Add a Todo</h2>
          <div className="flex items-center">
            <div className="relative w-full">
              <input onChange={handleChange} onKeyDown={handleKeyDown} value={todo} type="text" placeholder="Enter your todo" className='w-full rounded-full px-5 py-2 border border-gray-300 focus:outline-none focus:border-violet-600 pr-10' />
              <FaPlus className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white transition-all'>
              Save
            </button>
          </div>
        </div>
        <div className="flex items-center my-4">
          <input id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded" />
          <label className='ml-2 text-gray-700' htmlFor="show">Show Finished</label> 
        </div>
        <div className='h-[1px] bg-gray-300 opacity-50 w-full my-4'></div>
        <h2 className='text-2xl font-bold text-gray-700 mb-4'>Your Todos</h2>
        <button onClick={handleDeleteAll} className='bg-violet-800 hover::bg-violet-950 text-white font-bold py-2 px-4 rounded-full mb-4'>
        <MdDelete />

        </button>
        <div className="todos space-y-3">
          {todos.length === 0 && <div className='text-gray-500'>No Todos to display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className={`todo flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow ${item.isCompleted ? "opacity-50" : ""}`}>
                <div className='flex items-center gap-5'> 
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded" />
                  <div className={`text-gray-700 ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                </div>
                <div className="buttons flex items-center">
                  <button onClick={() => handleEdit(item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 transition-all'>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 transition-all'>
                    <AiFillDelete />
                  </button>
                </div> 
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
