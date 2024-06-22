import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import TodosArea from "../components/TodosArea";
import { GetGroupItems, GetGroups, TryGetUser } from "../lib/ServerCalls";
import LoadingSpinner from "../components/LoadingSpinner";

// const todoGroupsTest: TodoGroup[] = [
//   {
//     name: "Work1",
//     id: 1,
//     TodoItems: [
//       {
//         name: "Finish report",
//         groupId: 1,
//         isDone: false,
//         description: "Complete the monthly report",
//         dueDate: new Date("2024-06-25"),
//         createdDate: new Date("2024-06-15"),
//         id: 1,
//       },
//       {
//         name: "Email client",
//         groupId: 1,
//         isDone: true,
//         description: "Send project update to client",
//         dueDate: new Date("2024-06-20"),
//         createdDate: new Date("2024-06-10"),
//         id: 2,
//       },
//       {
//         name: "Finish report",
//         groupId: 1,
//         isDone: false,
//         description: "Complete the monthly report",
//         dueDate: new Date("2024-06-25"),
//         createdDate: new Date("2024-06-15"),
//         id: 1,
//       },
//       {
//         name: "Email client",
//         groupId: 1,
//         isDone: true,
//         description: "Send project update to client",
//         dueDate: new Date("2024-06-20"),
//         createdDate: new Date("2024-06-10"),
//         id: 2,
//       },
//       {
//         name: "Finish report",
//         groupId: 1,
//         isDone: false,
//         description: "Complete the monthly report",
//         dueDate: new Date("2024-06-25"),
//         createdDate: new Date("2024-06-15"),
//         id: 1,
//       },
//       {
//         name: "Email client",
//         groupId: 1,
//         isDone: true,
//         description: "Send project update to client",
//         dueDate: new Date("2024-06-20"),
//         createdDate: new Date("2024-06-10"),
//         id: 2,
//       },
//     ],
//   },
//   {
//     name: "Work",
//     id: 1,
//     TodoItems: [
//       {
//         name: "Finish report",
//         groupId: 1,
//         isDone: false,
//         description: "Complete the monthly report",
//         dueDate: new Date("2024-06-25"),
//         createdDate: new Date("2024-06-15"),
//         id: 1,
//       },
//       {
//         name: "Email client",
//         groupId: 1,
//         isDone: true,
//         description: "Send project update to client",
//         dueDate: new Date("2024-06-20"),
//         createdDate: new Date("2024-06-10"),
//         id: 2,
//       },
//     ],
//   },
//   {
//     name: "Work",
//     id: 1,
//     TodoItems: [
//       {
//         name: "Finish report",
//         groupId: 1,
//         isDone: false,
//         description: "Complete the monthly report",
//         dueDate: new Date("2024-06-25"),
//         createdDate: new Date("2024-06-15"),
//         id: 1,
//       },
//       {
//         name: "Email client",
//         groupId: 1,
//         isDone: true,
//         description: "Send project update to client",
//         dueDate: new Date("2024-06-20"),
//         createdDate: new Date("2024-06-10"),
//         id: 2,
//       },
//     ],
//   },
//   {
//     name: "Home",
//     id: 2,
//     TodoItems: [
//       {
//         name: "Grocery shopping",
//         groupId: 2,
//         isDone: false,
//         description: "Buy groceries for the week",
//         dueDate: new Date("2024-06-22"),
//         createdDate: new Date("2024-06-16"),
//         id: 3,
//       },
//       {
//         name: "Clean kitchen",
//         groupId: 2,
//         isDone: true,
//         description: "Deep clean the kitchen",
//         dueDate: new Date("2024-06-18"),
//         createdDate: new Date("2024-06-12"),
//         id: 4,
//       },
//     ],
//   },
//   {
//     name: "Fitness",
//     id: 3,
//     TodoItems: [
//       {
//         name: "Morning run",
//         groupId: 3,
//         isDone: false,
//         description: "Run 5 kilometers",
//         dueDate: new Date("2024-06-21"),
//         createdDate: new Date("2024-06-15"),
//         id: 5,
//       },
//       {
//         name: "Gym session",
//         groupId: 3,
//         isDone: true,
//         description: "Weight training at the gym",
//         dueDate: new Date("2024-06-19"),
//         createdDate: new Date("2024-06-13"),
//         id: 6,
//       },
//     ],
//   },
//   {
//     name: "Hobbies",
//     id: 4,
//     TodoItems: [
//       {
//         name: "Read book",
//         groupId: 4,
//         isDone: false,
//         description: "Finish reading 'The Great Gatsby'",
//         dueDate: new Date("2024-06-24"),
//         createdDate: new Date("2024-06-17"),
//         id: 7,
//       },
//       {
//         name: "Painting",
//         groupId: 4,
//         isDone: false,
//         description: "Complete the landscape painting",
//         dueDate: new Date("2024-06-23"),
//         createdDate: new Date("2024-06-14"),
//         id: 8,
//       },
//     ],
//   },
//   {
//     name: "Learning",
//     id: 5,
//     TodoItems: [
//       {
//         name: "Complete online course",
//         groupId: 5,
//         isDone: true,
//         description: "Finish the React course on Udemy",
//         dueDate: new Date("2024-06-20"),
//         createdDate: new Date("2024-06-01"),
//         id: 9,
//       },
//       {
//         name: "Practice coding",
//         groupId: 5,
//         isDone: false,
//         description: "Solve 5 coding problems",
//         dueDate: new Date("2024-06-21"),
//         createdDate: new Date("2024-06-18"),
//         id: 10,
//       },
//     ],
//   },
//   {
//     name: "Travel",
//     id: 6,
//     TodoItems: [
//       {
//         name: "Book flights",
//         groupId: 6,
//         isDone: false,
//         description: "Book flights for summer vacation",
//         dueDate: new Date("2024-06-25"),
//         createdDate: new Date("2024-06-15"),
//         id: 11,
//       },
//       {
//         name: "Pack luggage",
//         groupId: 6,
//         isDone: true,
//         description: "Pack clothes and essentials",
//         dueDate: new Date("2024-06-23"),
//         createdDate: new Date("2024-06-16"),
//         id: 12,
//       },
//     ],
//   },
//   {
//     name: "Finance",
//     id: 7,
//     TodoItems: [
//       {
//         name: "Pay bills",
//         groupId: 7,
//         isDone: true,
//         description: "Pay electricity and water bills",
//         dueDate: new Date("2024-06-20"),
//         createdDate: new Date("2024-06-10"),
//         id: 13,
//       },
//       {
//         name: "Budget planning",
//         groupId: 7,
//         isDone: false,
//         description: "Plan budget for the next month",
//         dueDate: new Date("2024-06-22"),
//         createdDate: new Date("2024-06-15"),
//         id: 14,
//       },
//     ],
//   },
//   {
//     name: "Health",
//     id: 8,
//     TodoItems: [
//       {
//         name: "Doctor appointment",
//         groupId: 8,
//         isDone: false,
//         description: "Annual health check-up",
//         dueDate: new Date("2024-06-25"),
//         createdDate: new Date("2024-06-20"),
//         id: 15,
//       },
//       {
//         name: "Buy medicine",
//         groupId: 8,
//         isDone: true,
//         description: "Buy prescribed medicines",
//         dueDate: new Date("2024-06-21"),
//         createdDate: new Date("2024-06-18"),
//         id: 16,
//       },
//     ],
//   },
//   {
//     name: "Social",
//     id: 9,
//     TodoItems: [
//       {
//         name: "Call friends",
//         groupId: 9,
//         isDone: false,
//         description: "Catch up with old friends",
//         dueDate: new Date("2024-06-23"),
//         createdDate: new Date("2024-06-15"),
//         id: 17,
//       },
//       {
//         name: "Attend party",
//         groupId: 9,
//         isDone: true,
//         description: "Friend's birthday party",
//         dueDate: new Date("2024-06-20"),
//         createdDate: new Date("2024-06-12"),
//         id: 18,
//       },
//     ],
//   },
//   {
//     name: "Miscellaneous",
//     id: 10,
//     TodoItems: [
//       {
//         name: "Car service",
//         groupId: 10,
//         isDone: false,
//         description: "Take car for servicing",
//         dueDate: new Date("2024-06-25"),
//         createdDate: new Date("2024-06-16"),
//         id: 19,
//       },
//       {
//         name: "Donate clothes",
//         groupId: 10,
//         isDone: true,
//         description: "Donate old clothes to charity",
//         dueDate: new Date("2024-06-22"),
//         createdDate: new Date("2024-06-14"),
//         id: 20,
//       },
//     ],
//   },
// ];

// const tempUser: User = {
//   firstName: "Ezzat",
//   email: "ezzat@test.tst",
//   lastName: "Esam",
//   username: "EzzatEsam",
// };

export default function Home() {
  const [todoGroups, setTodoGroups] = React.useState<TodoGroup[]>([]);

  const [currentProj, setCurrentProj] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const fetchData = async () => {
    console.log("Fetching data");
    let user = await TryGetUser();
    if (user !== null) {
      setCurrentUser(user);
    } else {
      // redirect to login page
      window.location.href = "/login";
    }

    let groups = await GetGroups();
    if (groups !== null && groups.length > 0) {
      let items = await GetGroupItems(groups[currentProj].id);
      if (items !== null && items !== undefined) {
        groups[currentProj].TodoItems = items;
      }
      if (JSON.stringify(groups) !== JSON.stringify(todoGroups)) {
        setTodoGroups(groups);
      }
    }
  };

  useEffect(() => {
    console.log("Updating for some reason");
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentProj]);
  if (currentUser === null) {
    return <LoadingSpinner></LoadingSpinner>;
  } else {
    return (
      <>
        <div className="flex h-screen max-h-screen  bg-gray-100">
          <div className="w-1/4 min-w-1/4">
            <SideBar
              current={currentProj}
              groups={todoGroups}
              groupsModifier={setTodoGroups}
              refreshFn={fetchData}
              user={currentUser}
              setCurrentFn={setCurrentProj}
            />
          </div>

          <div className="w-3/4 ">
            <TodosArea
              group={todoGroups[currentProj]}
              groupUpdate={(group) =>
                setTodoGroups((prev) => {
                  prev[currentProj] = group;
                  return [...prev];
                })
              }
              updateFn={fetchData}
            />
          </div>
        </div>
      </>
    );
  }
}
