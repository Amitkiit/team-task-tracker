import Organization from "../models/organization.model";

export const findOrganizationById =
(id: string) => {

  return Organization.findById(id);
};

export const updateOrganizationById =
(
 id: string,
 data: object
) => {

  return Organization.findByIdAndUpdate(
    id,
    data,
    {
      new: true
    }
  );
};