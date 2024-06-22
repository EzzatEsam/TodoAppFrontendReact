import React from "react";

const TodoView: React.FC<{
  item: TodoItem;
  onUpdate: (item: TodoItem) => void;
  onDelete: (item: TodoItem) => void;
  // onDelete: (id: number) => void;
}> = ({ item, onUpdate, onDelete }) => {
  return (
    <div className="w-full p-2 rounded-lg border border-gray-300 shadow-md hover:bg-slate-100 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div
          className={`text-sm font-semibold text-gray-800 border-none focus:ring-0 bg-inherit p-1 rounded-lg ${
            item.isDone ? "line-through" : ""
          }`}
        >
          {item.name}
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={item.isDone}
            className="form-checkbox h-5 w-5 text-indigo-600 bg-inherit p-2 rounded-lg"
            onChange={() => onUpdate({ ...item, isDone: !item.isDone })}
          />
          <button
            className="text-red-500 hover:text-red-700 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoView;
