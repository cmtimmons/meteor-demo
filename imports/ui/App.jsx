import React, { PropTypes, Component } from 'react';

import Task from './Task.jsx';
import { Tasks } from '../api/tasks.js';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

const renderTask = (task) => {
  console.log(task);
  return (
  <Task key={task._id} task={task} />
)}
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(),
    });

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  render() {
    const tasks = this.props.tasks;
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <ul>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this) } >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
              />
          </form>
          {tasks.map(renderTask)}
        </ul>
      </div>
    )
  }
}
App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, App);
