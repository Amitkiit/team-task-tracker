import DashboardLayout from "../layouts/DashboardLayout";

import {
  useEffect,
  useState
} from "react";

import {
  getOrganization
} from "../services/organization.service";

import Loader from "../components/Loader";

interface Organization {
  _id: string;
  name: string;
}

function Organization() {

  const [
    organization,
    setOrganization
  ] = useState<Organization | null>(null);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

    const loadOrganization =
      async () => {

        try {

          const data =
            await getOrganization();

          setOrganization(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);
        }
      };

    void loadOrganization();

  }, []);

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

            <h2>
              Organization Details
            </h2>

            <hr />

            <h4>
              Name
            </h4>

            <p>
              {
                organization?.name
              }
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Organization;