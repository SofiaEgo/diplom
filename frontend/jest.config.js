module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
