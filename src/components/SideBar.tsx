import React from "react";
import { CreateGroup, DeleteGroup, Logout } from "../lib/ServerCalls";

const SideBar: React.FC<{
  user: User;
  groups: TodoGroup[];
  groupsModifier: React.Dispatch<React.SetStateAction<TodoGroup[]>>;
  refreshFn: () => void;
  current: number;
  setCurrentFn: (id: number) => void;
}> = ({
  user,
  groups = [],
  groupsModifier,
  refreshFn,
  current,
  setCurrentFn,
}) => {
  const [showSignOut, setShowSignOut] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const [projectName, setProjectName] = React.useState("");
  const [toBeDeleted, setToBeDeleted] = React.useState<number | null>(null);
  const _addGroup = async () => {
    if (projectName !== "") {
      let result = await CreateGroup({
        name: projectName,
        id: 0,
        TodoItems: [],
      });
      if (result) {
        groupsModifier([...groups, result]);
        setProjectName("");
        refreshFn();
        setIsAdding(false);
      }
    }
  };
  return (
    <>
      <div className=" pt-4 pb-4 px-4 bg-slate-50 flex flex-col rounded-lg shadow-lg max-h-screen h-screen">
        <div
          onClick={() => setShowSignOut(!showSignOut)}
          className="cursor-pointer"
        >
          <h2 className="text-2xl px-2 py-2 font-bold text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300">
            {user.firstName} {user.lastName}
          </h2>
        </div>
        {showSignOut && (
          <div className="text-center">
            <button
              className="mt-2 py-2 px-4 bg-red-500 text-white  rounded-lg hover:bg-red-600 transition-colors duration-300 w-1/3"
              onClick={() => {
                Logout();
                window.location.href = "/login";
              }}
            >
              Sign Out
            </button>
          </div>
        )}
        <div className="px-2 py-2 text-lg text-gray-600">{user.email}</div>
        <h2 className="text-2xl px-2 py-2 mt-4 font-bold text-gray-700 rounded-lg bg-gray-100">
          Projects
        </h2>
        <ul className="mt-2 overflow-y-auto">
          {groups.map((todoGroup, i) => (
            <li
              key={`todoGroup.Id ${i}`}
              className={`flex items-center justify-between text-base font-semibold py-2 px-2 mt-2 rounded-lg text-gray-700 hover:bg-indigo-200 hover:text-indigo-800 transition-colors duration-300 ${
                i === current ? "bg-yellow-200" : ""
              }`}
            >
              <button
                onClick={() => setCurrentFn(i)}
                className="flex-1 text-left"
              >
                {todoGroup.name}
              </button>
              {toBeDeleted !== i ? (
                <button
                  className="text-red-500 hover:text-red-700 transition-colors duration-300 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setToBeDeleted(i);
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
              ) : (
                <button
                  className="bg-red-500 text-white  px-1 rounded-lg ml-2 text-sm hover:bg-red-600 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setToBeDeleted(null);
                    groupsModifier(
                      [...groups].filter((group) => group.id !== todoGroup.id)
                    );
                    DeleteGroup(todoGroup.id);
                    refreshFn();
                  }}
                >
                  Confirm
                </button>
              )}
            </li>
          ))}
        </ul>

        {!isAdding ? (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full shadow-md"
            onClick={() => setIsAdding(true)}
          >
            Add Project
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <input
              className="py-2 px-4 rounded-lg m-2 w-full shadow-md border"
              placeholder="Project Name"
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg m-2 hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center text-center ${
                projectName === "" && "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => _addGroup()}
              disabled={projectName === ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Add
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
