import { sequelize } from "./connection";
import Models from "./models";

export const bootstrap = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("unable to connect");
  }
  console.log("Connected to database");
  await Models.User.sync();
  await Models.PunchLog.sync();

  const [user, created] = await Models.User.findOrCreate({
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
