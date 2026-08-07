import RefreshToken  from "./refreshToken.model.js";

 export const createRefreshToken = (data ) => {
    return RefreshToken.create(data);
}