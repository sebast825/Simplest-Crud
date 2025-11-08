import {
  Button,
  Col,
  Container,
  Dropdown,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useTasks } from "../hooks/useTasks";
import CreateTaskModal from "../modals/createTaskModal";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const { loading, tasks, updateTaskStatus, deleteTask, createTask } =
    useTasks();
  const location = useLocation();
  const user = location.state?.user;
  if (loading) return <p>Cargando tareas...</p>;

  return (
    <>
      <div className="flex-grow-1  d-flex flex-column vw-100 mt-5 pt-5 p-3 p-sm-5">
        <Container
          fluid
          className="bg-primary text-white text-center py-5 rounded-3 mb-4"
        >
          <h1 className="fw-bold">Bienvenido {user?.name}!</h1>
        </Container>
        <Row className="d-flex justify-content-center align-items-center ">
          <Container className="mt-4  mt-ms-1">
            <Row className="mb-3 align-items-center">
              <Col>
                <h2>Mis tareas</h2>
              </Col>
              <Col className="text-end">
                <CreateTaskModal onCreate={(title) => createTask(title)} />{" "}
              </Col>
            </Row>

            <ListGroup className="bg-secondary text-darl text-center py-5 rounded-3 mb-4 p-2 gap-2">
              {tasks.length == 0 ? (
                <h3>No tienes tareas!</h3>
              ) : (
                tasks
                  .sort((a, b) => Number(a.done) - Number(b.done))
                  .map((task) => (
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
                        {/* Botones para escritorio */}
                        <div className="d-none d-md-flex gap-2">
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

                        {/* Dropdown para mobile */}
                        <Dropdown className="d-flex d-md-none">
                          <Dropdown.Toggle size="sm" variant="info">
                            
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => updateTaskStatus(task.id)}

                            >
                              {task.done ? "Marcar pendiente" : "Marcar hecha"}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteTask(task.id)}>
                              Eliminar
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </ListGroup.Item>
                  ))
              )}
            </ListGroup>
          </Container>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
