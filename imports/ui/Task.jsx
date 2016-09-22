import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';

const toggleChecked = (_id, checked) => () => {
  Tasks.update(_id, {
    $set: { checked: !checked },
  });
}

const deleteThisTask = _id => () => {
  Tasks.remove(_id);
}
const taskClassName = checked => {
  const ret = checked ? "checked" : "";
  return ret;
}

const Task = ({task}) => (
  <li className={taskClassName(task.checked) }>
    <button className="delete" onClick={deleteThisTask(task._id) }>
    &times;
    </button>

    <input
      type="checkbox"
      readOnly
      checked={task.checked}
      onClick={toggleChecked(task._id, task.checked) }
      />

    <span className="text">{task.text}</span>
  </li>
)

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task;