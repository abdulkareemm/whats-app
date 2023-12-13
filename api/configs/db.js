const mongoose = require("mongoose");
const logger = require("./logger");

const dbConnect = async () => {
  logger.info("connect to database ...");
  try {
    mongoose.set("strictQuery", false);
    const connected = await mongoose.connect(process.env.MONGO_URL);

    logger.info(`Mongo db ${connected.connection.host}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = dbConnect;
