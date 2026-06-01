import axios from "axios";

const API =
  "http://localhost:5000/api/organizations";

const token = () =>
  localStorage.getItem("accessToken");


export interface Organization {
  _id?: string;
  name: string;
}
export const getOrganization =
  async () => {

    const response =
      await axios.get(API, {
        headers: {
          Authorization:
            `Bearer ${token()}`
        }
      });

    return response.data;
};

export const updateOrganization =
  async (name: string) => {

    const response =
      await axios.put(
        API,
        { name },
        {
          headers: {
            Authorization:
              `Bearer ${token()}`
          }
        }
      );

    return response.data;
};

export const getMembers =
  async () => {

    const response =
      await axios.get(
        `${API}/members`,
        {
          headers: {
            Authorization:
              `Bearer ${token()}`
          }
        }
      );

    return response.data;
};

export const removeMember =
  async (userId: string) => {

    const response =
      await axios.delete(
        `${API}/member/${userId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token()}`
          }
        }
      );

    return response.data;
};