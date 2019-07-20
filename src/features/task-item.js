import React from 'react';

export default function TaskItem(props) {

  const onDelete = (taskId) => {
    return props.onDelete(taskId);
  }

  const {task} = props;
  return (
    <li key={task.id}>
        {task.edit && <input type="text"
          defaultValue={task.title} 
          onKeyDown={(e)=>props.onKeyDown(e,task.id)}  />}
        {!task.edit && <span onDoubleClick={()=>props.ontoggleEdit(task.id)} >{task.title}</span>}
        <button onClick={()=>{onDelete(task.id)}}>x</button>
    </li>
  )
}