import DashboardLayout from "../layouts/DashboardLayout";

import {
  useEffect,
  useState
} from "react";
import { socket }
from "../services/socket.service";

import {
  getTasks
} from "../services/task.service";

import {
  getOrganization
} from "../services/organization.service";

import Loader from "../components/Loader";

interface Organization {
  _id: string;
  name: string;
}

interface Task {
  _id: string;
  title: string;
  description?: string;

  status:
    | "TODO"
    | "IN_PROGRESS"
    | "DONE";
}

function Dashboard() {

  const [
    organization,
    setOrganization
  ] = useState<Organization | null>(null);

  const [
    tasks,
    setTasks
  ] = useState<Task[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

const loadDashboard =
async () => {

  try {

    const org =
      await getOrganization();

    const taskList =
      await getTasks();

    setOrganization(org);

    setTasks(taskList);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);
  }
};
  
useEffect(() => {

  const init = async () => {
    await loadDashboard();
  };

  void init();

  socket.on(
    "task-created",
    loadDashboard
  );

  socket.on(
    "task-assigned",
    loadDashboard
  );

  socket.on(
    "task-status-updated",
    loadDashboard
  );

  return () => {

    socket.off(
      "task-created",
      loadDashboard
    );

    socket.off(
      "task-assigned",
      loadDashboard
    );

    socket.off(
      "task-status-updated",
      loadDashboard
    );
  };

}, []);

  if (loading) {

    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  const todoTasks =
    tasks.filter(
      task =>
        task.status === "TODO"
    ).length;

  const progressTasks =
    tasks.filter(
      task =>
        task.status === "IN_PROGRESS"
    ).length;

  const doneTasks =
    tasks.filter(
      task =>
        task.status === "DONE"
    ).length;

  return (

    <DashboardLayout>

      <div className="p-4">

        <h1 className="mb-4">
          Dashboard
        </h1>

        <div className="row mb-4">

          <div className="col-md-3">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h3>
                  {tasks.length}
                </h3>

                <p>
                  Total Tasks
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h3>
                  {todoTasks}
                </h3>

                <p>
                  TODO
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h3>
                  {progressTasks}
                </h3>

                <p>
                  IN PROGRESS
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h3>
                  {doneTasks}
                </h3>

                <p>
                  DONE
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="card shadow-sm">

          <div className="card-body">

            <h4>
              Organization
            </h4>

            <h5>
              {organization?.name}
            </h5>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;