import Joi from "joi";

 export const userSkillsSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),

    category: Joi.string()
        .trim()
        .valid(
            "Frontend",
            "Backend",
            "Database",
            "DevOps",
            "Programming Language",
            "Tools",
            "Cloud",
            "Testing",
            "Other",
        )
        .required(),

    level: Joi.string()
        .trim()
        .valid("beginner", "intermediate", "advanced", "expert")
        .required(),
}).unknown(false);
