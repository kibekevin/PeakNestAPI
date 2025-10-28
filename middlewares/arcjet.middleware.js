import aj from "../config/arcjet.js";


const ArcjetMiddleware = async (req, res, next) => {
    try {
        const clientIp =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.connection?.remoteAddress ||
        "0.0.0.0";

        const decision = await aj.protect(req,
            { requested: 1 },
            // explicitly provide IP in case Arcjet fails to extract it
            { ip: clientIp },
        );

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error : 'Rate limit exceeded' })
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({ error: 'Bot Detected' })
            }

            return res.status(403).json({ error: 'Access Denied' })
        }

        next();
    } catch (error) {
        console.log(`ArcjetMiddleware error ${error}`)
        next(error)
    }
}



export default ArcjetMiddleware;