const express = require('express');
const app = express();

// Route to display client IP
app.get('/', (req, res) => {
    // Get the client IP, considering proxies (if any)
    //const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    res.send(`Client IP: ${req.ip}`);
});

// Start the server, forcing IPv4
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});