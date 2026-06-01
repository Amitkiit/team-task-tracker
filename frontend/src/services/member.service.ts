import axios from "axios";

const API =
  "http://localhost:5000/api/users";

const getToken = () =>
  localStorage.getItem(
    "accessToken"
  );

export interface CreateMemberPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const getMembers =
async () => {

 const token =
 localStorage.getItem(
  "accessToken"
 );

 const response =
 await axios.get(

  "http://localhost:5000/api/users",

  {
   headers: {
    Authorization:
    `Bearer ${token}`
   }
  }
 );

 return response.data;
};

export const createMember =
  async (
    data: CreateMemberPayload
  ) => {

    const response =
      await axios.post(
        API,
        data,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};


export const deleteMember =
  async (
    id: string
  ) => {

    const response =
      await axios.delete(
        `${API}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;
};