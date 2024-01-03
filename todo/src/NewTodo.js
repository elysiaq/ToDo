import './NewTodo.css';

function NewTodo({ getAllToDos }) {
  const apiKey = "2a6aee-a6bd35-678fab-df584e-ecbfd4";

  const addTodo = (event) => {
    event.preventDefault();
    const newToDo = document.getElementById("newToDo").value;

    if (newToDo.trim() === '') {
      return;
    }

    const data = {
      text: newToDo,
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          console.log('added todo:', this.responseText);
          getAllToDos();
          document.getElementById("newToDo").value = '';
        } else {
          console.error('could not add todo');
        }
      }
    };

    xhttp.open("POST", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send(JSON.stringify(data));
  };

  return (
    <form id="input" onSubmit={addTodo}>
      <input type="text" id="newToDo" placeholder="Add a new ToDo"/>
      <button type="submit">Add</button>
    </form>
  );
}

export default NewTodo;
