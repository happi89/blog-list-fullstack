const http = require('http');
const config = require('./utils/config.utils.js');
const app = require('./app');
const logger = require('./utils/logger.utils');

const server = http.createServer(app);

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
