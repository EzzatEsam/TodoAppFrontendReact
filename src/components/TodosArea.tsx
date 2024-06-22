import React from "react";
import TodoView from "./TodoView";
import TodoExpanded from "./TodoExpanded";
import {
  CreateTodoItem,
  DeleteItem,
  ModifyGroup,
  ModifyItem,
} from "../lib/ServerCalls";

const TodosArea: React.FC<{
  group: TodoGroup | undefined;
  groupUpdate: (group: TodoGroup) => void;
  updateFn: () => void;
}> = ({ group, groupUpdate, updateFn }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(
    undefined
  );

  if (!group) return null;

  const addTodo = async () => {
    let newTodo: TodoItem = {
      id: 0,
      name: `new todo ${group.TodoItems.length + 1}`,
      isDone: false,
      createdDate: new Date(),
      dueDate: new Date(),
      description: "empty description",
      groupId: group.id,
    };

    let result = await CreateTodoItem(newTodo);
    if (result) {
      let newGroup = { ...group };
      newGroup.TodoItems.push(newTodo);
      groupUpdate(newGroup);
      updateFn();
    }
  };

  /**
   * Modifies a todo item in the group by updating its properties and saving it to the server.
   *
   * @param {TodoItem} todo - The updated todo item.
   * @return {Promise<void>} A promise that resolves when the modification is complete.
   */
  const modifyTodo = async (todo: TodoItem): Promise<void> => {
    let newGroup = { ...group };
    newGroup.TodoItems[selectedIndex!] = todo;
    groupUpdate(newGroup);
    let result = await ModifyItem(todo);
    if (result) updateFn();
  };

  const modifyTodoServerless = async (todo: TodoItem) => {
    let newGroup = { ...group };
    newGroup.TodoItems[selectedIndex!] = todo;
    groupUpdate(newGroup);
  };

  const deleteItemFromGroup = async (todo: TodoItem) => {
    let newGroup = { ...group };
    newGroup.TodoItems = newGroup.TodoItems.filter((t) => t.id !== todo.id);
    groupUpdate(newGroup);
    let result = await DeleteItem(todo.id);
    if (result) updateFn();
  };

  const completedTodos = group.TodoItems.filter((todo) => todo.isDone);
  const notCompletedTodos = group.TodoItems.filter((todo) => !todo.isDone);

  let selectedTodo = group.TodoItems[selectedIndex!];

  return (
    <div className="flex flex-row p-6 w-full h-screen overflow-y-auto bg-gray-100">
      <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
        <input
          className="text-2xl font-semibold text-gray-800 w-full border-b-2 border-gray-300 focus:border-blue-500"
          type="text"
          value={group.name}
          onChange={(e) => {
            groupUpdate({ ...group, name: e.target.value });
          }}
          onBlur={async () => {
            await ModifyGroup(group);
            updateFn();
          }}
        />
        <h2 className="text-lg font-medium text-gray-600 py-2">Tasks</h2>
        <div className="mt-6 overflow-y-auto max-h-[calc(100vh-40vh)]">
          {/* <h3 className="text-md font-semibold text-gray-700">Not Completed</h3> */}
          <ul className="mt-2 ">
            {notCompletedTodos.map((todo, i) => {
              const originalIndex = group.TodoItems.indexOf(todo);
              return (
                <li
                  key={`todoItem-${i}-${todo.id}`}
                  className={`m-4 ${
                    selectedIndex === originalIndex
                      ? "bg-gray-200 rounded-md"
                      : ""
                  }`}
                >
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      if (selectedIndex !== originalIndex) {
                        setSelectedIndex(originalIndex);
                      } else {
                        setSelectedIndex(undefined);
                      }
                    }}
                  >
                    <TodoView
                      item={todo}
                      onUpdate={modifyTodo}
                      onDelete={deleteItemFromGroup}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <h3 className="text-md font-semibold text-gray-700 mt-6">
            Completed
          </h3>
          <ul className="mt-2 overflow-y-auto max-h-[calc(100vh-40vh)]">
            {completedTodos.map((todo, i) => {
              const originalIndex = group.TodoItems.indexOf(todo);
              return (
                <li
                  key={`todoItem-${i}-${todo.id}`}
                  className={`m-4 ${
                    selectedIndex === originalIndex
                      ? "bg-gray-200 rounded-md"
                      : ""
                  }`}
                >
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      if (selectedIndex !== originalIndex) {
                        setSelectedIndex(originalIndex);
                      } else {
                        setSelectedIndex(undefined);
                      }
                    }}
                  >
                    <TodoView
                      item={todo}
                      onUpdate={modifyTodo}
                      onDelete={deleteItemFromGroup}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="m-4">
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            onClick={addTodo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Task
          </button>
        </div>
      </div>
      {selectedIndex !== undefined && (
        <div className="w-1/3 mx-2">
          <TodoExpanded
            selectedTodo={selectedTodo}
            modifyTodo={modifyTodo}
            modifyTodoServerless={modifyTodoServerless}
          />
        </div>
      )}
    </div>
  );
};

export default TodosArea;
