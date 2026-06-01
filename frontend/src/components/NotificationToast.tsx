import {
  useEffect,
  useState
} from "react";

import {
  socket
} from "../services/socket.service";

function NotificationToast() {

  const [
    message,
    setMessage
  ] = useState("");

  useEffect(() => {

    socket.on(
      "task-created",
      () => {

        setMessage(
          "New Task Created"
        );

        setTimeout(
          () => setMessage(""),
          3000
        );
      }
    );

    socket.on(
      "task-assigned",
      () => {

        setMessage(
          "Task Assigned"
        );

        setTimeout(
          () => setMessage(""),
          3000
        );
      }
    );

    socket.on(
      "task-status-updated",
      () => {

        setMessage(
          "Task Status Updated"
        );

        setTimeout(
          () => setMessage(""),
          3000
        );
      }
    );

  }, []);

  if (!message) {
    return null;
  }

  return (

    <div
      className="
      position-fixed
      top-0
      end-0
      p-3
      "
      style={{
        zIndex: 9999
      }}
    >

      <div
        className="
        alert
        alert-success
        shadow
        "
      >
        {message}
      </div>

    </div>
  );
}

export default NotificationToast;