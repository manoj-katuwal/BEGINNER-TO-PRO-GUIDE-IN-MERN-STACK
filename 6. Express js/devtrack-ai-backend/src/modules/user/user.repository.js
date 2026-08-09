import User from "../../modules/auth/auth.model.js";

export const findById = async (userId) => {
  return findByPk(userId , {
    attributes : {
        exclude : ["password"],
    }
  });
};
