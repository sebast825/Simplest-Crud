import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import   {useTasks}  from "../hooks/useTasks";


function Dashboard() {

   const {loading,tasks,updateTaskStatus}= useTasks();
if (loading) return <p>Cargando tareas...</p>;

  return   (
        <Row className=" justify-content-center align-items-center  vw-100 ">

    <Container className="mt-4 ">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>Mis tareas</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" >
            + Nueva tarea
          </Button>
        </Col>
      </Row>

      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            variant={task.done ? "success" : ""}
            className="d-flex justify-content-between align-items-center"
          >
            <div >
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
              >
                Eliminar
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
    </Row>
  );
}



export default Dashboard;