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

export const GithubAccount = sequelize.define(
  "GithubAccount",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    githubId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    githubUsername: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatarUrl: { type: DataTypes.STRING(500), allowNull: true },
    profileUrl: { type: DataTypes.STRING(500), allowNull: true },

    nodeId: { type: DataTypes.STRING(100), allowNull: true },
    name: { type: DataTypes.STRING(150), allowNull: true },
    company: { type: DataTypes.STRING(150), allowNull: true },
    blog: { type: DataTypes.STRING(255), allowNull: true },
    location: { type: DataTypes.STRING(100), allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: true },
    hireable: { type: DataTypes.BOOLEAN, defaultValue: false },
    bio: { type: DataTypes.TEXT, allowNull: true },
    publicRepos: { type: DataTypes.INTEGER, defaultValue: 0 },
    publicGists: { type: DataTypes.INTEGER, defaultValue: 0 },
    followers: { type: DataTypes.INTEGER, defaultValue: 0 },
    following: { type: DataTypes.INTEGER, defaultValue: 0 },
    diskUsage: { type: DataTypes.INTEGER, allowNull: true },
    twoFactorAuthentication: { type: DataTypes.BOOLEAN, defaultValue: false },

    planName: { type: DataTypes.STRING(50), defaultValue: "free" },
    planSpace: { type: DataTypes.BIGINT, allowNull: true },
    planPrivateRepos: { type: DataTypes.INTEGER, defaultValue: 10000 },

    connectedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "GithubAccounts",
    timestamps: true,
  },
);

User.hasOne(GithubAccount, { foreignKey: "userId", onDelete: "CASCADE" });
GithubAccount.belongsTo(User, { foreignKey: "userId" });

export default OAuthState;
