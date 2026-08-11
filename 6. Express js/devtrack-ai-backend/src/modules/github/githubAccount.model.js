import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../auth/auth.model.js";

const GithubAccount = sequelize.define("GithubAccount", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  githubId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },

  githubUsername: {
    type: DataTypes.STRING(39),
    allowNull: false,
  },

  avatarUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },

  encryptedAccessToken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.hasOne(GithubAccount, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

GithubAccount.belongsTo(User, {
  foreignKey: "userId",
});

export default GithubAccount;
