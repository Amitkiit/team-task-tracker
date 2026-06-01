import DashboardLayout from "../layouts/DashboardLayout";
import { socket }
from "../services/socket.service";

import {
  useEffect,
  useState
} from "react";

import {
  getTasks,
  createTask,
  updateTaskStatus,
  assignTask
} from "../services/task.service";

import {
  getMembers
} from "../services/member.service";

import Loader from "../components/Loader";

interface Task {
  _id: string;

  title: string;

  description: string;

  status:
    | "TODO"
    | "IN_PROGRESS"
    | "DONE";

  assignedTo?: {
    _id: string;
    name: string;
  };
}

interface Member {
  _id: string;
  name: string;
  email: string;
}

function Tasks() {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [members, setMembers] =
    useState<Member[]>([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const loadTasks = async () => {

    try {

      const data =
        await getTasks();

      setTasks(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    const loadData = async () => {

      try {

        const taskData =
          await getTasks();

        const memberData =
          await getMembers();

        setTasks(taskData);

        setMembers(memberData);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    void loadData();

  }, []);
  useEffect(() => {

  socket.on(
    "task-created",
    loadTasks
  );

  socket.on(
    "task-assigned",
    loadTasks
  );

  socket.on(
    "task-status-updated",
    loadTasks
  );

  return () => {

    socket.off(
      "task-created",
      loadTasks
    );

    socket.off(
      "task-assigned",
      loadTasks
    );

    socket.off(
      "task-status-updated",
      loadTasks
    );
  };

}, []);

  const handleCreate = async () => {

    try {

      await createTask({
        title,
        description
      });

      setTitle("");
      setDescription("");

      await loadTasks();

    } catch (error) {

      console.error(error);
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

      <div className="p-4">

        <div className="card shadow-sm">

          <div className="card-body">

            <h2 className="mb-4">
              Task Management
            </h2>

            <input
              className="form-control mb-3"
              placeholder="Task Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              className="form-control mb-3"
              placeholder="Task Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <button
              className="btn btn-success mb-4"
              onClick={handleCreate}
            >
              Create Task
            </button>

            <hr />

            <h4>
              Task List
            </h4>

            {
              tasks.length === 0 ? (

                <div className="alert alert-info">
                  No Tasks Found
                </div>

              ) : (

                tasks.map(task => (

                  <div
                    key={task._id}
                    className="card mb-3"
                  >

                    <div className="card-body">

                      <h5>
                        {task.title}
                      </h5>

                      <p>
                        {task.description}
                      </p>

                      <div className="row">

                        <div className="col-md-6">

                          <label>
                            Assign Member
                          </label>

                          <select
                            className="form-select"
                            value={
                              task.assignedTo?._id || ""
                            }
                            onChange={async e => {

                              await assignTask(
                                task._id,
                                e.target.value
                              );

                              await loadTasks();
                            }}
                          >

                            <option value="">
                              Select Member
                            </option>

                            {
                              members.map(member => (

                                <option
                                  key={member._id}
                                  value={member._id}
                                >
                                  {member.name}
                                </option>

                              ))
                            }

                          </select>

                        </div>

                        <div className="col-md-6">

                          <label>
                            Status
                          </label>

                          <select
                            className="form-select"
                            value={task.status}
                            onChange={async e => {

                              await updateTaskStatus(
                                task._id,
                                e.target.value
                              );

                              await loadTasks();
                            }}
                          >

                            <option value="TODO">
                              TODO
                            </option>

                            <option value="IN_PROGRESS">
                              IN PROGRESS
                            </option>

                            <option value="DONE">
                              DONE
                            </option>

                          </select>

                        </div>

                      </div>

                      {
                        task.assignedTo && (

                          <div className="mt-3">

                            <span
                              className="badge bg-info"
                            >
                              Assigned:
                              {" "}
                              {
                                task.assignedTo.name
                              }
                            </span>

                          </div>

                        )
                      }

                    </div>

                  </div>

                ))
              )
            }

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Tasks;