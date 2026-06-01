import type { ReactNode } from "react";
import NotificationToast
from "../components/NotificationToast";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface Props {
  children: ReactNode;
}

function DashboardLayout({
  children
}: Props) {

  return (
    <>
      <NotificationToast />
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <main
          className="flex-grow-1"
        >
          {children}
        </main>

      </div>

    </>
  );
}

export default DashboardLayout;