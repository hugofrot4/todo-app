import { useState, useEffect } from "react";
import { ListTodo } from "lucide-react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

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

  function handleEdit(task) {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return task.status === "pending";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const completionPct =
    tasks.length > 0 ? Math.round((counts.completed / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/40">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white flex-shrink-0">
            <ListTodo size={15} />
          </div>
          <span className="font-semibold text-slate-800">Tarefas</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Minhas Tarefas
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            {tasks.length === 0
              ? "Nenhuma tarefa ainda. Crie a sua primeira!"
              : counts.pending === 0
              ? "Tudo concluido. Parabens!"
              : counts.pending === 1
              ? "1 tarefa pendente"
              : `${counts.pending} tarefas pendentes`}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              {
                label: "Total",
                value: counts.all,
                textColor: "text-slate-700",
                bg: "bg-slate-50 ring-slate-200/80",
              },
              {
                label: "Pendentes",
                value: counts.pending,
                textColor: "text-amber-700",
                bg: "bg-amber-50 ring-amber-200/80",
              },
              {
                label: "Concluidas",
                value: counts.completed,
                textColor: "text-emerald-700",
                bg: "bg-emerald-50 ring-emerald-200/80",
              },
            ].map(({ label, value, textColor, bg }) => (
              <div
                key={label}
                className={`${bg} ring-1 rounded-2xl p-4 text-center`}
              >
                <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          {tasks.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-slate-600">
                  Progresso geral
                </span>
                <span className="text-xs font-semibold text-violet-600">
                  {completionPct}%
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-500"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <TaskForm
          onSubmit={handleSubmit}
          taskToEdit={taskToEdit}
          onCancel={() => setTaskToEdit(null)}
        />

        {/* Filter tabs */}
        <div className="flex gap-1 mb-5 bg-slate-100/80 p-1 rounded-xl">
          {[
            { key: "all", label: "Todas" },
            { key: "pending", label: "Pendentes" },
            { key: "completed", label: "Concluidas" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200/80"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  filter === key
                    ? "bg-violet-100 text-violet-700"
                    : "bg-slate-200/70 text-slate-500"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 bg-rose-50 text-rose-600 text-sm px-4 py-3 rounded-xl ring-1 ring-rose-200/80">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-7 h-7 border-2 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Carregando tarefas...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}
