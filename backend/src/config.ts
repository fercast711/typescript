import "dotenv/config";
import env from "./util/validateEnv";

export const MONGO_URI = env.MONGODB_URI
export const PORT = env.PORT