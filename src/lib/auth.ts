import { TryGetUser } from "./ServerCalls";

export const SaveToken = (token: string) => {
  localStorage.setItem("jwtToken", token);
};

export const GetToken = () => {
  return localStorage.getItem("jwtToken");
};

export const RemoveToken = () => {
  localStorage.removeItem("jwtToken");
};


export const RedirectIfLoggedIn = async () => {
  if (GetToken() !== null) {
    let result = await TryGetUser();
    if (result === null) {
      RemoveToken();
    } else {
        // redirect 
        window.location.href = "/home";
    }
  }
}