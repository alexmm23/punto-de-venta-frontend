import { URL_API } from "../config/constants";
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${URL_API}/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 200) {
    //alert("Login successful");
    const data = await response.json();
    localStorage.setItem("token", data.token);
    console.log(data);
    return true;
  }
  return false;
};
