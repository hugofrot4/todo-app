import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'pending' | 'completed'

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
    return true; // 'all'
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

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

        <div className="flex gap-2 mb-6">
          {[
            { key: "all", label: "Todas" },
            { key: "pending", label: "Pendentes" },
            { key: "completed", label: "Concluídas" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === key
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  filter === key
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-400">Carregando...</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onEdit={setTaskToEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
