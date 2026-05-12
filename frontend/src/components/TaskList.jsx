import { ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 gap-3">
        <ClipboardList size={48} className="text-slate-300" strokeWidth={1.2} />
        <p className="text-sm font-medium text-slate-500">Nenhuma tarefa aqui</p>
        <p className="text-xs text-slate-400">Crie uma nova tarefa acima para comecar</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
