import * as githubRepo from "./github.repository.js";

export const saveOAuthState = async (userId, state, expiresAt) => {
    return await githubRepo.createOAuthState({
        userId,
        state ,
        expiresAt,
    })

}