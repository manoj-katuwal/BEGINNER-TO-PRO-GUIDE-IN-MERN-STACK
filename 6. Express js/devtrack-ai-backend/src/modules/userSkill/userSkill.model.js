import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../auth/auth.model.js";

const UserSkill = sequelize.define(
  "UserSkill",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.ENUM(
        "Frontend",
        "Backend",
        "Database",
        "DevOps",
        "Programming Language",
        "Tools",
        "Cloud",
        "Testing",
        "Other",
      ),
      allowNull: false,
    },

    level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced", "expert"),
      allowNull: false,
      defaultValue: "beginner",
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "name"],
        name: "unique_user_skill",
      },
    ],
  },
);

User.hasMany(UserSkill, {
  foreignKey: "userId",
  as: "skills",
});

UserSkill.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default UserSkill;
