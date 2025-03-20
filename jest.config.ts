export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust if needed
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
