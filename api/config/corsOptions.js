const allowdedOrigins = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "chrome-extension://*", // replace star with your extension ID
];

const corsOptions = {
  origin: (origin, callback) => {
    if (
      allowdedOrigins.includes(origin) ||
      origin.startsWith("chrome-extension://")
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error: Not Allowded"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
