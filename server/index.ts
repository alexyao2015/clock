import { bootstrap } from "./backend/bootstrap";
import Models from "./backend/models";

export const models = Models;

export default async () => {
  await bootstrap();
};
