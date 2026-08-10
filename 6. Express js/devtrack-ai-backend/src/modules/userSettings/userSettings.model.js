import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";
import User from "../auth/auth.model.js";

export const userSettings = sequelize.define(
  "UserSetting",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    theme: {
      type: DataTypes.ENUM("light", "dark", "system"), 
      defaultValue: "light",
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "en",
    },
    profileVisibility: {
      type: DataTypes.ENUM("public", "private"),
      defaultValue: "public",
    },
    emailNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    pushNotifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  },
);

User.hasOne(userSettings, {
  foreignKey: "userId",
  as: "settings",
});

userSettings.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
