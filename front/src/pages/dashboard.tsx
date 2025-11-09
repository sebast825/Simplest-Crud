import {
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useTasks } from "../hooks/useTasks";
import CreateTaskModal from "../modals/createTaskModal";
import { useLocation } from "react-router-dom";
import { TaskActions } from "../components/taskActions";

function Dashboard() {
  const { loading, tasks, updateTaskStatus, deleteTask, createTask } =
    useTasks();
  const location = useLocation();
  const user = location.state?.user;
  if (loading) return <p>Cargando tareas...</p>;

  return (
    <>
      <div className="flex-grow-1  d-flex flex-column vw-100 mt-5 pt-5 p-3 p-sm-5 ">
        <Container
          fluid
          className="bg-primary text-white text-center py-5 rounded-3 mb-4"
        >
          <h1 className="fw-bold">Bienvenido {user?.name}!</h1>
        </Container>
        <Row className="d-flex justify-content-center align-items-center ">
          <Container className="mt-4  mt-ms-1">
            <Row className="mb-3 align-items-center " style={{ margin: 0 }}>
              <Col style={{ padding: 0 }}>
                <h2>Mis Tareas</h2>
              </Col>
              <Col className="text-end " xs="auto" style={{ padding: 0 }}>
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
                    <TaskActions
                      task={task}
                      onUpdate={updateTaskStatus}
                      onDelete={deleteTask}
                    />
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
