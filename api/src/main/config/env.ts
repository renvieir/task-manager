export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/task-manager",
  port: process.env.PORT || 5000,
  sentryDSN:
    process.env.SENTRY_DSN ||
    "https://beea3fa79d074c86ac6cf22021d153dc@localhost.ingest.sentry.io/10",
};
