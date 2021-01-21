const mongoose = require("mongoose");

exports.connect = (app) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const initConnection = () => {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(process.env.MONGODB_CONNECTION_URL.trim(), options)
      .then(() => {
        console.log("MongoDB is connected");
        app.emit("ready");
      })
      .catch((err) => {
        console.log("MongoDB connection unsuccessful, retry after 2 seconds.");
        setTimeout(connectWithRetry, 2000);
      });
  };
  
  initConnection();
};
