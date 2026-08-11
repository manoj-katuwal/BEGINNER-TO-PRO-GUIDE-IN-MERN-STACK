import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../auth/auth.model.js";

const GithubOAuthState = sequelize.define("GithubOAuthState", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  state: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(GithubOAuthState, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

GithubOAuthState.belongsTo(User, {
  foreignKey: "userId",
});

export default GithubOAuthState;
