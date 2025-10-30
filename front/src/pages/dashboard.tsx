import { Button,  Col, Container, ListGroup, Row } from "react-bootstrap";
import { useTasks } from "../hooks/useTasks";
import CreateTaskModal from "../modals/createTaskModal";

function Dashboard() {
   
  const { loading, tasks, updateTaskStatus, deleteTask,createTask } = useTasks();
  if (loading) return <p>Cargando tareas...</p>;


  return (
   <>
   <div className="vw-100 vh-100 p-5">
<Container fluid className="bg-primary text-white text-center py-5 rounded-3 mb-4">
      <h1 className="fw-bold">
        Bienvenido!
      </h1>
    </Container>
    <Row className="d-flex justify-content-center align-items-center ">
      <Container className="mt-4 ">
        <Row className="mb-3 align-items-center">
          <Col>
            <h2>Mis tareas</h2>
          </Col>
          <Col className="text-end">
            <CreateTaskModal
              onCreate={(title)=>createTask(title)}
            />{" "}
          </Col>
        </Row>

        <ListGroup>
          {tasks
           .sort((a, b) => Number(a.done) - Number(b.done))
          .map((task) => (
            <ListGroup.Item
              key={task.id}
              variant={task.done ? "success" : ""}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{task.title}</strong>{" "}
                <span className={task.done ? "text-success" : "text-muted"}>
                  {task.done ? "Hecha" : "Pendiente"}
                </span>
              </div>

              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant={task.done ? "warning" : "success"}
                  onClick={() => updateTaskStatus(task.id)}
                >
                  {task.done ? "Marcar pendiente" : "Marcar hecha"}
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Eliminar
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </Row>
    </div>
       </>
  );
}

export default Dashboard;
