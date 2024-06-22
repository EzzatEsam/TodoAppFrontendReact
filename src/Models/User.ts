interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

interface SignUpModel {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginModel {
  email: string;
  password: string;
}
