import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import "dotenv/config";
import { connectDB } from "./config/db";

// Import routes
import userRouter from "./routes/user.route";

const app = new Hono();

// Middleware
app.use("*", logger());

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.onError((err, c) => {
  console.error("Error occurred:", err);
  return c.json({ message: err.message }, 500);
});

app.get("/", (c) => {
  return c.json({
    message: "Server is running healthy!",
    timestamp: new Date().toISOString(),
  });
});

// Register routes
app.route("/api/users", userRouter);

const startServer = async () => {
  await connectDB();

  Bun.serve({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  });
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
};

startServer();
