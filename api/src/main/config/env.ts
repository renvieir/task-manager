export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/task-manager",
  port: process.env.PORT || 5000,
};
