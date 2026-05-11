import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, taskToEdit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("O título é obrigatório.");
      return;
    }

    try {
      await onSubmit({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 mb-8"
    >
      <h2 className="text-xl font-bold text-indigo-800 mb-4">
        {taskToEdit ? "Editar Tarefa" : "Nova Tarefa"}
      </h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <input
        type="text"
        placeholder="Título *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
        >
          {taskToEdit ? "Salvar" : "Criar Tarefa"}
        </button>

        {taskToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
