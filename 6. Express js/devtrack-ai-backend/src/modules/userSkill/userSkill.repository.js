import UserSkill from "./userSkill.model.js"

export const findByUserId = async (userId) => {
    await UserSkill.findAll({
        where : {userId}
    })
}