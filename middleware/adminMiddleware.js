const authMiddleware = require("./authMiddleware");

const adminMiddleware = (req, res, next) => {
    authMiddleware(req, res, () => {

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access denied",
            });
        }

        next();
    });
};

module.exports = adminMiddleware;
