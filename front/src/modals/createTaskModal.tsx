import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface ICreateTaskModal {
  onCreate: (title: string) => void; 
}

export const CreateTaskModal = ({ onCreate }: ICreateTaskModal) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreate = () => {
    if (title.trim() === "") return; 
    onCreate(title);
    setTitle("");
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
          Nueva Tarea
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nueva tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe el título..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateTaskModal;
