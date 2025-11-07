import { useEffect, useState } from "react";
import type { Task } from "../types/task.types";
import apiClient from "../api/client";
import { useNavigate } from "react-router-dom";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get("/tasks/user");
      setTasks(response.data);
    } catch (error) {
            showAlertAndRedirectIfUnauthorized  (error)

      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateTaskStatus = async (taskId: number) => {
    try {
      const response = await apiClient.patch("/tasks/" + taskId);
      const updatedTask = response.data;

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (error: any) {
      showAlertAndRedirectIfUnauthorized  (error)

      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteTask = async (taskId: number) => {
    try {
      await apiClient.delete("/tasks/" + taskId);

      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    } catch (error: any) {
        showAlertAndRedirectIfUnauthorized  (error)

    } finally {
      setLoading(false);
    }
  };
  const createTask = async (title: string) => {
    try {
      var rsta = await apiClient.post("/tasks/", { title });

      setTasks((prevTasks) => [rsta.data, ...prevTasks]);
    } catch (error) {
      showAlertAndRedirectIfUnauthorized  (error)
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const showAlertAndRedirectIfUnauthorized   =(error : any)=>{
     if (error.status == 401) {
        alert("La sesion expiro, por favor loguiarse nuevamente!");
        navigate("/");
      }
  }

  return { tasks, loading, updateTaskStatus, deleteTask, createTask };
};
