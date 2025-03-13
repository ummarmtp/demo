const express = require('express');
const app = express();
const useragent = require('user-agent'); // For parsing User-Agent header
const os = require('os');

// Middleware to log request details
app.use((req, res, next) => {
    console.log('New request received');
    next();
});

app.get('/', (req, res) => {
    // Get client IP
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (clientIp.includes(',')) {
        clientIp = clientIp.split(',')[0].trim();
    }

    // Get User-Agent (browser and device details)
    const userAgent = req.headers['user-agent'];

    // Get hostname (optional)
    const hostname = os.hostname();

    // Get all request headers (optional)
    const headers = req.headers;

    // Get device type using user-agent package
    const deviceDetails = user.parse(userAgent);

    // Response object
    res.json({
        "Client IP": clientIp,
        "Device Info": {
            "Browser": deviceDetails.browser,
            "OS": deviceDetails.os,
            "Platform": deviceDetails.platform
        },
        "Hostname": hostname,
        "Referer": req.headers['referer'] || "Unknown",
        "Accepted Languages": req.headers['accept-language'],
        "All Headers": headers
    });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
