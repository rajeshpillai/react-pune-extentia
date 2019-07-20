import React from 'react';
import './App.css';

import countries from './data/countries';

import HelloWorld from  './fcomps/hello-world';
import TaskItem from './features/task-item';
import UseState1 from './fcomps/usestate-1';
import UseReducer1 from './fcomps/usereducer-1';
import Autocomplete from './components/autocomplete';

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

  constructor(props) {
    super(props);
    this.inputTitle = React.createRef();
    this.editTitle = React.createRef();

    // Prefer bind method
    //this.toggleTaskForm = this.toggleTaskForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.ontoggleEdit = this.ontoggleEdit.bind(this);
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

  onMessage(msg) {
    alert(msg);
  }

  onCountrySelected(country) {
    console.log(`Selected country is ${country}`);
  }

  render() {
    const taskList = this.state.tasks.map((task) => {
      return (
        <TaskItem key={task.id} onDelete={this.onDelete} 
            onKeyDown = {this.onKeyDown}
            ontoggleEdit={this.ontoggleEdit}
            task={task} />
      )
    });
    
   

    return (
       <div className="App">
        
          WHere are you from ?
          <Autocomplete 
            onItemSelected={this.onCountrySelected}
            data ={countries} placeholder="enter country names" />
       
          <UseReducer1 />

          {/* <UseState1 /> */}

          <HelloWorld 
            onMessage={this.onMessage}
            message="Welcome React"/>

            {this.props.data}
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
          <div><ul>{taskList}</ul></div>
      </div>
    );
  }
  
}

export default App;
