import instance from "./instance";
interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const signIn = (user: IUser) => {
  return instance.post("/signin", user);
};
const addUser = (user: IUser) => {
  return instance.post("/signup", user);
};

export { addUser, signIn };
