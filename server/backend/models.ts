import { sequelize } from "./connection";
import { PunchActions } from "../../enum/punchActions";

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  employeeID: CreationOptional<string>;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  workShiftActive: boolean;
  breakActive: boolean;
  lunchActive: boolean;
}

export const User = sequelize.define<User>(
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

interface PunchLog
  extends Model<InferAttributes<PunchLog>, InferCreationAttributes<PunchLog>> {
  employeeID: CreationOptional<string>;
  action: PunchActions;
}

export const PunchLog = sequelize.define(
  "PunchLog",
  {
    employeeID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM(
        "punchIn",
        "punchOut",
        "breakIn",
        "breakOut",
        "lunchIn",
        "lunchOut"
      ),
      allowNull: false,
    },
  },
  {}
);