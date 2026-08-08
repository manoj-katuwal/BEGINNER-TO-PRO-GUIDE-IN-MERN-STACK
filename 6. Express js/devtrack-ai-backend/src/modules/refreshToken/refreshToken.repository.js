import RefreshToken  from "./refreshToken.model.js";

 export const createRefreshToken = (data, options = {}) => {
    return RefreshToken.create(data, options);
}

export const findByToken = (token, options = {}) => {
    return RefreshToken.findOne({
        where : {token},
        ...options,
    })
}


export const deleteById =  (id, options = {}) => {
    return RefreshToken.destroy({
        where : {id},
        ...options,
    })
}

export const revoke = (id, options = {}) => {
  return RefreshToken.update(
    {
      revokedAt: new Date(),
    },
    {
      where: {
        id,
        revokedAt: null,
      },
      ...options,
    },
  );
};

export const revokeFamily = (familyId, options = {}) => {
  return RefreshToken.update(
    {
      revokedAt: new Date(),
    },
    {
      where: {
        familyId,
        revokedAt: null,
      },
      ...options,
    },
  );
};
