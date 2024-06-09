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
export const formatPrice = (number: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "MXN",
  }).format(number);
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
};
export const cleanFormInputs = () => {
  const inputs = document.querySelectorAll("input");
  const select = document.querySelector("select");
  if (select) {
    select.value = "-1";
    select.selectedIndex = 0;
  }
  inputs.forEach((input) => {
    input.value = "";
  });
};
export const handleShowModal = () => {
  const modal = document.querySelector(".modal");
  cleanFormInputs();
  if (modal) {
    modal.classList.add("show");
    modal.classList.remove("hide");
  }
};
export const handleCloseModal = () => {
  const modal = document.querySelector(".modal");
  cleanFormInputs();
  if (modal) {
    modal.classList.remove("show");
    modal.classList.add("hide");
  }
};
export const postData = async (
  data: Object,
  enpoint: string,
  method: string
) => {
  const response = await fetch(`${URL_API}/v1/${enpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
    body: JSON.stringify(data),
  });
  const jsonData = await response.json();
  if (response.status === 200 || response.status === 201) {
    return jsonData;
  } else {
    return null;
  }
};
export const validateForm = (data: Object) => {
  const values = Object.values(data);
  for (const value of values) {
    if (value === "") {
      return false;
    }
  }
  return true;
};
