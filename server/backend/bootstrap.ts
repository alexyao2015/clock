import { sequelize } from "./connection";
import { User, PunchLog } from "./models";

export const bootstrap = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("unable to connect");
  }
  console.log("Connected to database");
  await User.sync();
  await PunchLog.sync();

  const [user, created] = await User.findOrCreate({
    where: { employeeID: "admin" },
    defaults: {
      isAdmin: true,
      firstName: "admin",
      lastName: "admin",
    },
  });
  if (created) {
    console.log("Admin user was created");
  }
};
