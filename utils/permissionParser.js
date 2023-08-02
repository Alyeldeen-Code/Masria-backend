const RolesNames = [
  "ManageOwnUser",
  "ManageOwnVecation",
  "ManageOwnComplain",
  "ManageEmployee",
  "ManageDepartment",
  "ManageDepartmentComplains",
  "ManageDepartmentVecationRequests",
];

let RolesPermission = {
  ManageOwnUser: {
    create: false,
    read: false,
    delete: false,
  },
  ManageOwnVecation: {
    create: false,
    read: false,
    delete: false,
  },
  ManageOwnComplain: {
    create: false,
    read: false,
    delete: false,
  },
  ManageEmployee: {
    create: false,
    read: false,
    delete: false,
  },
  ManageDepartment: {
    create: false,
    read: false,
    delete: false,
  },
  ManageDepartmentComplain: {
    create: false,
    read: false,
    delete: false,
  },
  ManageDepartmentVecationRequests: {
    create: false,
    read: false,
    delete: false,
  },
};

const parsingPermission = (Roles) => {
  if (Roles) {
    let index = 0;
    for (let Role of Roles) {
      let primissionNumber = Number(Role);
      RolesPermission[RolesNames[index]] =
        primissionNumber === 5
          ? { create: true, read: true, delete: true }
          : primissionNumber === 3
          ? { create: true, read: true, delete: false }
          : primissionNumber === 1
          ? { create: false, read: true, delete: false }
          : { create: false, read: false, delete: false };

      ++index;
    }
  }

  return RolesPermission;
};

module.exports = parsingPermission;
