import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      task
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($task: String!) {
    addTodo(task: $task) {
      id
      task
      completed
     } }
 ` 

const TOGGLE_COMPLETE = gql`
  mutation ToggleComplete ($id: ID!) {
    toggleComplete (id: $id) {
      id
      task
      completed
    }
  }

`;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [toggleComplete] = useMutation(TOGGLE_COMPLETE, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  
  const [task, setTask] = useState('');

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      addTodo({ variables: { task } });
      setTask('');
    }
  };

  const handleToggleTodo = (id) => {
    console.log("Toggling todo with ID:", id);
    toggleComplete({
      variables: { id },
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">To-Do List</h1>
      
      <input
        type="text"
        placeholder="New Todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={handleAddTodo}
        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>

      <ul className="mt-4">
        {data.getTodos.map((todo) => (
          <li key={todo.id} className="my-2">
            <span 
              onClick={() => handleToggleTodo(todo.id)}
              className={`cursor-pointer ${todo.completed ? 'line-through' : ''} hover:bg-gray-200 px-2 py-1 rounded`}
            >
              {todo.task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
