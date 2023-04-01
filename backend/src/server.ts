import { PORT } from "./config";
import { connectDB } from "./db";
import app from "./app";

connectDB()
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});


