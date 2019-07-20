import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    showTaskForm: false,
    tasks: [
      { id: 1, title: "Task 1", completed: true, edit: false },
      { id: 2, title: "Task 2", completed: false, edit: true },
      { id: 3, title: "Task 3", completed: false, edit: false },
    ],
    newTitle: "",
  }

  constructor() {
    super();
    this.inputTitle = React.createRef();
    this.editTitle = React.createRef();

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

  ontoggleEdit(taskId) {
    let tasks = this.state.tasks.map((t) => {
      if (t.id == taskId) {
        t.edit = !t.edit;
      }
      return t;
    });

    this.setState({
      tasks
    });
  }

  onKeyDown(e, taskId) {
    console.log(taskId, e.which);
    if (e.which == 13) {
      // save
      let tasks = this.state.tasks.map((t) => {
      if (t.id == taskId) {
        t.edit = !t.edit;
        t.title = e.target.value
      }
      return t;
    });

    this.setState({
      tasks
    });

    } else if (e.which == 27) {
      // cancel edit
      let tasks = this.state.tasks.map((t) => {
      if (t.id == taskId) {
        t.edit = !t.edit;
      }
      return t;
    });

    this.setState({
      tasks
    });

    }
  }

  handleChange(e) {
    this.setState({
      newTitle: e.target.value
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
                  {task.edit && <input type="text"
                    ref={this.editTitle}
                    defaultValue={task.title} 
                    onKeyDown={(e)=>this.onKeyDown(e,task.id)}  />}
                  {!task.edit && <span onDoubleClick={()=>this.ontoggleEdit(task.id)} >{task.title}</span>}
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



