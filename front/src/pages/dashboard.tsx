import   {useTasks}  from "../hooks/useTasks";


function Dashboard() {

   const {loading,tasks}= useTasks();
if (loading) return <p>Cargando tareas...</p>;

  return (
    <div>
      <h2>Mis tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}  -  {task.done ? "Hecha" : "Pendiente"}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default Dashboard;