import React from 'react';
import {useState} from 'react';
import Card from 'react-bootstrap/Card';
import '../ListofRoutes/ListofRoutes.css';

const ListofRoutes = () => {
    const [todos, setTodos ] = useState([]);

    const handleAddTodo = (e) => {
        e.preventDefault(); 

        const newTodo = e.target.todo.value;
        setTodos([...todos,newTodo]);
        e.target.todo.value = "";
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index,1);
        setTodos(newTodos);
    }

    return (
        <div>
          <div className="card routeHeader">
            <div className="card-body">
                <h3>Route Plan</h3>
            </div>
        </div>
          <form onSubmit={handleAddTodo}>
            <div className="input-group mb-4 mx-2" style={{width: '30rem'}}>
                <input type="text" className="form-control" placeholder="Enter Route" aria-label="Enter Route" aria-describedby="button-addon2" name="todo"/>
                <button className="btn btn btn-info" type="submit" id="button-addon2">Add</button>
            </div>
          </form>
          <ul style={{listStyle:"none"}}>
            {todos.map((todo, index) => (
              <li key={index}>
                <div className="card mb-4 sizeofCard" style={{width:'24rem'}}>
                    <div className="card-body position-relative">
                        <div className="indexName d-inline">
                            {index + 1}
                        </div>
                        <p className="d-inline todo-label position-absolute top-50 start-50 translate-middle">{todo}</p>
                        
                        
                        <button className="deletebutton position-absolute top-50 end-0 translate-middle-y mx-2"onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </div>
                </div>
              </li>
            ))}
          </ul>


        </div>
      );
}

export default ListofRoutes;