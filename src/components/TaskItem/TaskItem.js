import React, { useState } from "react";
import PropTypes from "prop-types";
import "./taskitem.css";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const onTitleChange = (event) => {
    const newTitle = event.target.value;
    // setEditableTitle((existingEditableTitle) => { return newTitle; });
    setEditableTitle(newTitle);
    onTaskUpdate(id, newTitle, taskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };

  const onTaskStateChange = (event) => {
    const newState = event.target.value;
    onTaskUpdate(id, title, newState);
  };

  const onDelete = (event) => {
    onDeleteTask(id);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }

  return (
    <div className="task-item">
      <div id={id} onClick={(e) => setIsEditing(true)}>
        {editableTitle}
      </div>
      <div className="actions">
        <select onChange={onTaskStateChange} value={taskState}>
          <option value="Pending">Pending</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={onDelete}>-</button>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired,
  onTaskUpdate: PropTypes.func.isRequired
};
