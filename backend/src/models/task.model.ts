import mongoose, {
  Document,
  Schema
} from "mongoose";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface ITask
extends Document {

  title: string;

  description: string;

  status: TaskStatus;

  priority: TaskPriority;

  dueDate: Date;

  organization:
  mongoose.Types.ObjectId;

  assignedTo:
  mongoose.Types.ObjectId;

  createdBy:
  mongoose.Types.ObjectId;
}

const taskSchema =
new Schema<ITask>(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum:
    Object.values(TaskStatus),
    default:
    TaskStatus.TODO
  },

  priority: {
    type: String,
    enum:
    Object.values(TaskPriority),
    default:
    TaskPriority.MEDIUM
  },

  dueDate: {
    type: Date
  },

  organization: {
    type:
    Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  assignedTo: {
    type:
    Schema.Types.ObjectId,
    ref: "User"
  },

  createdBy: {
    type:
    Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},
{
  timestamps: true
});

export default
mongoose.model<ITask>(
  "Task",
  taskSchema
);