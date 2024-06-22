import React from "react";

const TodoExpanded: React.FC<{
  selectedTodo: TodoItem | null;
  modifyTodo: (todo: TodoItem) => void;
  modifyTodoServerless: (todo: TodoItem) => void;
}> = ({ selectedTodo, modifyTodo, modifyTodoServerless }) => {
  if (!selectedTodo) return null;
  console.log(selectedTodo);
  return (
    <div className="shadow-lg p-4 h-full bg-white rounded-lg border border-blue-500">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={selectedTodo.name}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => {
            modifyTodoServerless({ ...selectedTodo, name: e.target.value });
          }}
          onBlur={(e) => {
            modifyTodo({ ...selectedTodo, name: e.target.value });
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={selectedTodo.description}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          rows={4}
          onChange={(e) => {
            modifyTodoServerless({
              ...selectedTodo,
              description: e.target.value,
            });
          }}
          onBlur={(e) => {
            modifyTodo({ ...selectedTodo, description: e.target.value });
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Created Date
        </label>
        <p className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
          {selectedTodo.createdDate.toLocaleDateString()}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={selectedTodo.dueDate.toISOString().substring(0, 10)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => {
            modifyTodo({ ...selectedTodo, dueDate: new Date(e.target.value) });
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Is Done
        </label>
        <input
          type="checkbox"
          checked={selectedTodo.isDone}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e) => {
            modifyTodo({ ...selectedTodo, isDone: e.target.checked });
          }}
        />
      </div>
    </div>
  );
};

export default TodoExpanded;
