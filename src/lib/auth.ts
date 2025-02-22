export interface UserData {
  email: string;
  role: string;
  username: string;
}

export const setUserSession = (userData: UserData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const getUserSession = (): UserData | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearUserSession = () => {
  localStorage.removeItem("user");
};
