const express = require('express');
const app = express();
const UAParser = require('ua-parser-js'); // Import the ua-parser-js library

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
    const userAgentString = req.headers['user-agent'];

    let userAgentDetails = null;
    if (userAgentString) {
        // Parse the User-Agent string
        const parser = new UAParser();
        const result = parser.setUA(userAgentString).getResult();

        userAgentDetails = {
            browser: result.browser.name + ' ' + result.browser.version,
            os: result.os.name + ' ' + result.os.version,
            device: result.device.model || 'Desktop',
            platform: result.os.name
        };
    }

    // Get hostname (optional)
    const hostname = require('os').hostname();

    // Response object
    res.json({
        "Client IP": clientIp,
        "Device Info": userAgentDetails || "No User-Agent data",
        "Hostname": hostname,
        "Referer": req.headers['referer'] || "Unknown",
        "Accepted Languages": req.headers['accept-language'],
        "All Headers": req.headers
    });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});