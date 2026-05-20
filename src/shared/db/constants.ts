//constants for database connection options

// citation : https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/#close-sockets-after-connection
const expected_slowest_operation = 10000; // 10 seconds
export const SOCKET_TIMEOUT_MS = 3 * expected_slowest_operation;

// The 5 seconds is ideal for standalone and Serverless runtime.
// For a replica set, it should be close to the default 30 seconds
export const SERVER_SELECTION_TIMEOUT_MS = 50000;
