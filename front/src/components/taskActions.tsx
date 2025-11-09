import { Button, Dropdown, ListGroup } from "react-bootstrap";
import type { Task } from "../types/task.types";

interface TaskActionsProps {
  task: Task;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}
export const TaskActions = ({ task, onUpdate, onDelete }: TaskActionsProps) => {
  return (
    <>
      <ListGroup.Item
        key={task.id}
        variant={task.done ? "" : "warning"}
        className="d-flex justify-content-between align-items-center gap-1"
      >
        <div>
          <strong>{task.title} - </strong>{" "}
          <span className={task.done ? "text-success" : ""}>
            {task.done ? "Hecha" : "Pendiente"}
          </span>
        </div>

        <div>
          {/* Desktop Buttons */}
          <div className="d-none d-md-flex gap-2">
            <Button
              size="sm"
              variant={task.done ? "warning" : "success"}
              onClick={() => onUpdate(task.id)}
              style={{ minWidth: "150px" }}
            >
              {task.done ? "Marcar pendiente" : "Marcar hecha"}
            </Button>

            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete(task.id)}
            >
              Eliminar
            </Button>
          </div>

          {/* Mobile Dropdown */}
          <Dropdown className="d-flex d-md-none">
            <Dropdown.Toggle size="sm" variant="info"></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onUpdate(task.id)}>
                {task.done ? "Marcar pendiente" : "Marcar hecha"}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onDelete(task.id)}>
                Eliminar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </ListGroup.Item>
    </>
  );
};
