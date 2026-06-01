import mongoose, {
  Document,
  Schema
} from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  MEMBER = "MEMBER"
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organization: mongoose.Types.ObjectId;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.MEMBER
    },

    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization"
    },

    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<IUser>(
  "User",
  userSchema
);

export default User;