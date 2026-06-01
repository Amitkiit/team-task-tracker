import axios from "axios";

const API =
  "http://localhost:5000/api/tasks";

const getToken = () =>
  localStorage.getItem(
    "accessToken"
  );

export interface CreateTaskPayload {
  title: string;
  description: string;
}

export const getTasks = async () => {

  const token = getToken();

  console.log(
    "TOKEN SENT:",
    token
  );

  const response =
    await axios.get(API, {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    });

  return response.data;
};

export const createTask = async (
  data: CreateTaskPayload
) => {

  const token = getToken();

  console.log(
    "TOKEN SENT:",
    token
  );

  const response =
    await axios.post(
      API,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};

export const assignTask =
async (
 taskId: string,
 assignedTo: string
) => {

 const token =
 localStorage.getItem(
  "accessToken"
 );

 const response =
 await axios.put(

  `${API}/${taskId}/assign`,

  {
   assignedTo
  },

  {
   headers: {
    Authorization:
    `Bearer ${token}`
   }
  }
 );

 return response.data;
};

export const updateTaskStatus =
async (
  taskId: string,
  status: string
) => {

  const token =
    localStorage.getItem(
      "accessToken"
    );

  const response =
    await axios.patch(
      `${API}/${taskId}/status`,
      {
        status
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};
