import DashboardLayout from "../layouts/DashboardLayout";
import { socket }
from "../services/socket.service";
import {
  useEffect,
  useState
} from "react";

import {
  getMembers,
  createMember,
  deleteMember
} from "../services/member.service";

import Loader from "../components/Loader";

interface Member {
  _id: string;
  name: string;
  email: string;
  role: string;
}

function Members() {

  const [members, setMembers] =
    useState<Member[]>([]);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const loadMembers = async () => {

    try {

      const data =
        await getMembers();

      setMembers(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

useEffect(() => {

  const fetchMembers =
    async () => {

      try {

        const data =
          await getMembers();

        setMembers(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  fetchMembers();

}, []);

useEffect(() => {

  socket.on(
    "member-created",
    loadMembers
  );

  socket.on(
    "member-deleted",
    loadMembers
  );

  return () => {

    socket.off(
      "member-created",
      loadMembers
    );

    socket.off(
      "member-deleted",
      loadMembers
    );
  };

}, []);

  const handleCreate = async () => {

    try {

      await createMember({
        name,
        email,
        password,
        role: "MEMBER"
      });

      setName("");
      setEmail("");
      setPassword("");

      await loadMembers();

    } catch (error) {

      console.error(error);
      alert("Failed to create member");
    }
  };

  const handleDelete = async (
    id: string
  ) => {

    const confirmed =
      window.confirm(
        "Delete this member?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteMember(id);

      await loadMembers();

    } catch (error) {

      console.error(error);
      alert("Failed to delete member");
    }
  };

  if (loading) {

    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div className="card shadow-sm">

        <div className="card-body">

          <h2 className="mb-4">
            Team Members
          </h2>

          <div className="row">

            <div className="col-md-4">

              <input
                className="form-control mb-2"
                placeholder="Name"
                value={name}
                onChange={(e)=>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e)=>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e)=>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                className="btn btn-primary w-100"
                onClick={handleCreate}
              >
                Add Member
              </button>

            </div>

            <div className="col-md-8">

              {
                members.length === 0 ? (

                  <div className="alert alert-info">
                    No Members Found
                  </div>

                ) : (

                  members.map(member => (

                    <div
                      key={member._id}
                      className="card mb-2"
                    >

                      <div className="card-body d-flex justify-content-between align-items-center">

                        <div>

                          <h5>
                            {member.name}
                          </h5>

                          <p className="mb-1">
                            {member.email}
                          </p>

                          <span className="badge bg-primary">
                            {member.role}
                          </span>

                        </div>

                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleDelete(
                              member._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))
                )
              }

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Members;