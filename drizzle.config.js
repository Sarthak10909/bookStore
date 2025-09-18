const { defineConfig } = require("drizzle-kit");
require("dotenv/config");

const config = defineConfig({
    dialect: "postgresql",
    out: "./drizzle",
    schema: "./models/index.js",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});

module.exports = config;