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

export const revoke = (id, transaction) => {
  return RefreshToken.update(
    {
      revokedAt: new Date(),
    },
    {
      where: {
        id,
        revokedAt: null,
      },
      transaction,
    },
  );
};

export const revokeFamily = (familyId, transaction) => {
  return RefreshToken.update(
    {
      revokedAt: new Date(),
    },
    {
      where: {
        familyId,
        revokedAt: null,
      },
      transaction,
    },
  );
};
