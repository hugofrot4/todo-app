export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const completed = task.status === "completed";

  return (
    <div
      className={`bg-white rounded-xl shadow p-4 mb-3 flex justify-between items-start gap-4 border-l-4 ${completed ? "border-green-400 opacity-70" : "border-indigo-500"}`}
    >
      <div className="flex-1">
        <p
          className={`font-semibold text-gray-800 mb-1 ${completed ? "line-through text-gray-400" : ""}`}
        >
          {task.title}
        </p>

        {task.description && (
          <p className="text-sm text-gray-500 mb-2">{task.description}</p>
        )}

        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${completed ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700"}`}
        >
          {completed ? "✓ Concluída" : "⏳ Pendente"}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onToggle(task)}
          className="text-xs px-3 py-1.5 rounded-lg border border-green-300 bg-green-50 hover:bg-green-100 transition-colors"
        >
          {completed ? "↩ Reabrir" : "✓ Concluir"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="text-xs px-3 py-1.5 rounded-lg border border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          ✏️ Editar
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-xs px-3 py-1.5 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 transition-colors"
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}
