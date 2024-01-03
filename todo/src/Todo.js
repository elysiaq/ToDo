import './Todo.css';

function Todo({ id, text, completed, getAllToDos }) {
  const apiKey = "2a6aee-a6bd35-678fab-df584e-ecbfd4";

  const completeTodo = () => {
    const data = {
      completed: !completed,
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log('updated todo: ', JSON.parse(this.responseText));
        getAllToDos();
      } else if (this.readyState === 4) {
        console.error('could not update todo');
      }
    };

    xhttp.open("PUT", `https://cse204.work/todos/${id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send(JSON.stringify(data));
  };

  const deleteTodo = () => {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log('deleted todo: ', id);
        getAllToDos();
      } else if (this.readyState === 4) {
        console.error('could not delete todo');
      }
    };

    xhttp.open("DELETE", `https://cse204.work/todos/${id}`, true);
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send();
  };

  return (
    <li>
      <input className="checkbox" type="checkbox" checked={completed} onChange={completeTodo}/>
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </span>
      <button className="delete" onClick={deleteTodo}>Delete</button>
    </li>
  );
}

export default Todo;
