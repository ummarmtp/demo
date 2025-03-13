const http = require('http');

const server = http.createServer((req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`Client IP: ${clientIp}`);
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Your IP has been logged on the server console.');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://<your-server-ip>:${PORT}/`);
});