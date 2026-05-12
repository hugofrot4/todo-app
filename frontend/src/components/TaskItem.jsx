import { Check, Pencil, Trash2 } from "lucide-react";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const completed = task.status === "completed";

  return (
    <div
      className={`group bg-white rounded-2xl p-4 flex items-start gap-3.5 ring-1 ring-inset transition-all duration-200 hover:shadow-md mb-3 ${
        completed
          ? "ring-slate-100 bg-slate-50/60"
          : "ring-slate-200/80 hover:ring-violet-200/80"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => onToggle(task)}
        title={completed ? "Reabrir tarefa" : "Marcar como concluida"}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          completed
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-slate-300 hover:border-violet-400 hover:bg-violet-50 text-transparent hover:text-violet-300"
        }`}
      >
        <Check size={11} strokeWidth={3} />
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-medium text-sm leading-snug break-words ${
            completed ? "line-through text-slate-400" : "text-slate-800"
          }`}
        >
          {task.title}
        </p>

        {task.description && (
          <p className="text-xs text-slate-500 mt-1 leading-relaxed break-words">
            {task.description}
          </p>
        )}

        <span
          className={`inline-flex items-center mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
            completed
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {completed ? "Concluida" : "Pendente"}
        </span>
      </div>

      {/* Actions — always visible on mobile, hover-only on desktop */}
      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          title="Editar"
          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          title="Excluir"
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
