import RefreshToken  from "./refreshToken.model.js";

 export const createRefreshToken = (data, options = {}) => {
    return RefreshToken.create(data, options);
}

export const findByToken = (token) => {
    return RefreshToken.findOne({
        where : {token}
    })
}


export const deleteById =  (id, options = {}) => {
    return RefreshToken.destroy({
        where : {id},
        ...options,
    })
}
