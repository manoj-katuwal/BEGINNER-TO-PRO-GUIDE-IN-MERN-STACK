import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../auth/auth.model.js";

const RefreshToken = sequelize.define("RefreshToken", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  token: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  familyId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  revokedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

User.hasMany(RefreshToken, { foreignKey: "userId", onDelete: "CASCADE" });

RefreshToken.belongsTo(User, {
  foreignKey: "userId",
});

export default RefreshToken;
