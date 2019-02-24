'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/student';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/student';
exports.PORT = process.env.PORT || 8080;