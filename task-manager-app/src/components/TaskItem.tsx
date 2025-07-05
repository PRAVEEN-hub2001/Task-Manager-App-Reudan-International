import React from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: any;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  statusHandler: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, statusHandler, index }) => {

  return (
    <ListGroup.Item
      className={`d-flex justify-content-between align-items-center max-width-100 px-35 rounded-3 ${index % 2 !== 0 ? "task-list-bg-color" : ''}`}
    >
      <div className="d-flex align-items-center gap-2">
        <span title={task.description}>{task.title}</span>
      </div>

      <div>
        <Badge bg={task.status === "completed" ? "success" : "secondary"} className="me-2 align-items-center gap-1">
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </Badge>

        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => statusHandler(task)}
          className="me-2 align-items-center gap-1"
          disabled={task.status === "completed" ? true : false}
        >Mark as Completed</Button>
        
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onEdit(task)}
          className="me-2 align-items-center gap-1"
        >
          <i className="bi bi-pencil-square"></i>
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(task?.ROWID)}
          className="align-items-center gap-1"
        >
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </ListGroup.Item >

  );
};

export default TaskItem;
