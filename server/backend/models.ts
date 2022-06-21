import { sequelize } from "./connection";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    employeeID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workShiftActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    breakActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lunchActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {}
);

const PunchLog = sequelize.define(
  "PunchLog",
  {
    employeeID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

export default { User, PunchLog };
