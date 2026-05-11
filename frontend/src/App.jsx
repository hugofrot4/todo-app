import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Erro ao carregar tarefas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    if (taskToEdit) {
      await updateTask(taskToEdit.id, data);
      setTaskToEdit(null);
    } else {
      await createTask(data);
    }
    fetchTasks();
  }

  async function handleToggle(task) {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    await updateTask(task.id, { status: newStatus });
    fetchTasks();
  }

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    await deleteTask(id);
    fetchTasks();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-8">
          📝 Minhas Tarefas
        </h1>

        <TaskForm
          onSubmit={handleSubmit}
          taskToEdit={taskToEdit}
          onCancel={() => setTaskToEdit(null)}
        />

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-400">Carregando...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={setTaskToEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
