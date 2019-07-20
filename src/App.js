import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    showTaskForm: false,
    tasks: [
      { id: 1, title: "Task 1", completed: true, edit: false },
      { id: 2, title: "Task 2", completed: false, edit: false },
      { id: 3, title: "Task 3", completed: false, edit: false },
    ]
  }

  constructor() {
    super();
    this.inputTitle = React.createRef();

    // Prefer bind method
    //this.toggleTaskForm = this.toggleTaskForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let title = this.inputTitle.current.value;
    let newTask = {
      id: +new Date(),
      title: title,
      edit: false,
      completed: false
    }

    this.setState({
      tasks: [newTask, ...this.state.tasks]
    });
  }

  toggleTaskForm() {
    this.setState({
      showTaskForm: !this.state.showTaskForm
    });
  }

  onDelete(taskId) {

    if (!window.confirm("Are you sure?")) {
      return;
    }
    let tasks = this.state.tasks.filter((t) => {
      return taskId != t.id;
    });

    this.setState({
      tasks
    });
  }

  render() {
    return (
       <div className="App">
          <header className="App-header">
            Nifty Task Tracker
            <button onClick={()=>this.toggleTaskForm()}>+</button>
          </header>
          { this.state.showTaskForm &&
            <form onSubmit={this.onSubmit}>
              <h3>NEW TASK</h3>
              <label>Title</label>
              <input type="text" ref={this.inputTitle} />
              <button type="submit">SUBMIT</button>
            </form>
          }

          {
            (this.state.tasks.length <= 0) && <h3>Be awesome.  Add some tasks</h3>
          }
          <div>{
            this.state.tasks.map((task) => {
              return (
                <li key={task.id}>
                  {task.title}
                  <button onClick={()=>{this.onDelete(task.id)}}>x</button>
                </li>
              )
            })
          }</div>
      </div>
    );
  }
  
}

export default App;
