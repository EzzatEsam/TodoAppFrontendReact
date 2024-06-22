import { GetToken, RemoveToken, SaveToken } from "./auth";
import { serverAddr } from "./defs";

interface SignUpErrors {
  code: string;
  description: string;
}
export const TrySignUp = async (user: SignUpModel): Promise<string[]> => {
  let endPoint = serverAddr + "/api/UserAccount/register";

  try {
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // console.log(await response.text());
    console.log(await response.status);

    if (response.status !== 200) {
      let errors: SignUpErrors[] = await response.json();

      return errors.map((error) => error.description);
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

interface LoginReponse {
  token: string;
}
export const TryLogin = async (user: LoginModel): Promise<string[]> => {
  let endPoint = serverAddr + "/api/UserAccount/login";

  try {
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status !== 200) {
      let errors = [await response.text()];
      return errors;
    } else {
      let loginResponse: LoginReponse = await response.json();
      let jwtToken = loginResponse.token;

      // save the token
      SaveToken(jwtToken);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [`${error}`];
  }
};

export const TryGetUser = async (): Promise<User | null> => {
  const endPoint = serverAddr + "/api/UserAccount/me";

  const token = GetToken();
  if (token) {
    const response = await fetch(endPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      let user: User = await response.json();
      return user;
    } else {
      return null;
    }
  }
  return null;
};

export const Logout = () => {
  RemoveToken();
};

export const GetGroups = async (): Promise<TodoGroup[] | null> => {
  const endPoint = serverAddr + "/api/TodoGroups";
  const token = GetToken();

  const response = await fetch(endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    let groups: TodoGroup[] = await response.json();
    for (let group of groups) {
      if (group.TodoItems === undefined) {
        group.TodoItems = [];
      }
    }
    console.log(groups);
    return groups;
  } else {
    return null;
  }
};

export const CreateGroup = async (
  group: TodoGroup
): Promise<TodoGroup | null> => {
  const endPoint = serverAddr + "/api/TodoGroups";
  const token = GetToken();
  const response = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: group.name,
      id: 0,
    }),
  });
  if (response.status === 201) {
    let newGroup: TodoGroup = await response.json();
    // console.log("newGroup");
    // console.log(newGroup);
    return newGroup;
  } else {
    return null;
  }
};

export const ModifyGroup = async (
  group: TodoGroup
): Promise<TodoGroup | null> => {
  const endPoint = serverAddr + "/api/TodoGroups/" + group.id;
  const token = GetToken();
  const response = await fetch(endPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: group.name,
      id: group.id,
    }),
  });
  if (response.status === 204) {
    let newGroup: TodoGroup = await response.json();
    console.log("newGroup");
    console.log(newGroup);
    return newGroup;
  } else {
    return null;
  }
};

export const DeleteGroup = async (id: number): Promise<boolean> => {
  const endPoint = serverAddr + "/api/TodoGroups/" + id;
  const token = GetToken();
  const response = await fetch(endPoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    return true;
  } else {
    return false;
  }
};

export const CreateTodoItem = async (
  item: TodoItem
): Promise<TodoItem | null> => {
  const endPoint = serverAddr + "/api/TodoItems";
  const token = GetToken();
  const response = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  if (response.status === 201) {
    let item: TodoItem = await response.json();
    return item;
  } else {
    return null;
  }
};

export const GetGroupItems = async (
  groupId: number
): Promise<TodoItem[] | null> => {
  const endPoint = serverAddr + "/api/TodoItems/ParentGroup/" + groupId;
  const token = GetToken();

  const response = await fetch(endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    let items: TodoItem[] = await response.json();
    // loop over items check if dates are string then convert
    for (let item of items) {
      if (typeof item.dueDate === "string") {
        item.dueDate = new Date(item.dueDate);
      }
      if (typeof item.createdDate === "string") {
        item.createdDate = new Date(item.createdDate);
      }
    }

    return items;
  } else {
    return null;
  }
};

export const ModifyItem = async (item: TodoItem): Promise<TodoItem | null> => {
  const endPoint = serverAddr + "/api/TodoItems/" + item.id;
  const token = GetToken();
  const response = await fetch(endPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  if (response.status === 204) {
    // let item: TodoItem = await response.json();
    return item;
  } else {
    return null;
  }
};

export const DeleteItem = async (id: number): Promise<boolean> => {
  const endPoint = serverAddr + "/api/TodoItems/" + id;
  const token = GetToken();
  const response = await fetch(endPoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    return true;
  } else {
    return false;
  }
};
