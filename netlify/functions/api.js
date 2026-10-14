const serverless = require("serverless-http");
const { app } = require("../../server");
const { connectDB, sequelize } = require("../../config/db");

// Connect + sync once per cold start
let ready;

const init = () => {
    if (!ready) {
        ready = connectDB()
            .then(() => sequelize.sync())
            .catch((error) => {
                ready = null;
                throw error;
            });
    }
    return ready;
};

const handler = serverless(app, {
    // Requests arrive as /.netlify/functions/api/<path> — strip the prefix
    request: (req) => {
        req.url = req.url.replace(/^\/\.netlify\/functions\/api/, "") || "/";
    },
});

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await init();
    } catch (error) {
        console.error("Database init failed ❌", error.message);
    }

    return handler(event, context);
};
