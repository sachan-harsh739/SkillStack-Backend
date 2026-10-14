const { Sequelize } = require("sequelize");

// Supabase (PostgreSQL) — requires SSL
const options = {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};

// Prefer the Supabase connection string (DATABASE_URL),
// fall back to individual DB_* variables
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, options)
    : new Sequelize(
          process.env.DB_NAME,
          process.env.DB_USER,
          process.env.DB_PASSWORD,
          {
              ...options,
              host: process.env.DB_HOST,
              port: process.env.DB_PORT,
          }
      );

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Supabase PostgreSQL connected successfully ✅");
    } catch (error) {
        console.error("Supabase PostgreSQL connection failed ❌");
        console.error(error.message);
        throw error;
    }
};

module.exports = {
    sequelize,
    connectDB,
};
