import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../auth/auth.model.js";

const OAuthState = sequelize.define("OAuthState", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },

  state: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(OAuthState, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

OAuthState.belongsTo(User, {
  foreignKey: "userId",
});

export default OAuthState;
