import { useState, useEffect } from "react";
import { Plus, Save, Loader2 } from "lucide-react";

export default function TaskForm({ onSubmit, taskToEdit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
    setError("");
  }, [taskToEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("O titulo e obrigatorio.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl ring-1 ring-slate-200/80 shadow-sm p-6 mb-6"
    >
      <h2 className="text-base font-semibold text-slate-800 mb-5">
        {taskToEdit ? "Editar tarefa" : "Nova tarefa"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Titulo <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="O que precisa ser feito?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
          />
          <p className="mt-1.5 text-right text-xs text-slate-400">
            {title.length}/100
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Descricao{" "}
            <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <textarea
            placeholder="Adicione mais detalhes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all resize-none"
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 text-xs text-rose-600 bg-rose-50 ring-1 ring-rose-200/80 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2 mt-5">
        {taskToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-all duration-150"
        >
          {submitting ? (
            <Loader2 size={15} className="animate-spin" />
          ) : taskToEdit ? (
            <Save size={15} />
          ) : (
            <Plus size={15} />
          )}
          {taskToEdit ? "Salvar alteracoes" : "Criar tarefa"}
        </button>
      </div>
    </form>
  );
}
