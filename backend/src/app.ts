import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import taskRoutes from "./routes/task.routes";
import organizationRoutes from "./routes/organization.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/users", userRoutes);

export default app;
