import mongoose, { Schema, Document } from "mongoose";
export interface IOrganization extends Document {
  name: string;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IOrganization>(
  "Organization",
  OrganizationSchema
);