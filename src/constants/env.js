export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3004;
export const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:3000';
export const GENERATOR_URL = process.env.GENERATOR_URL || `http://localhost:${PORT}`;
export const STATIC_ASSETS_URL = process.env.STATIC_ASSETS_URL || `${GENERATOR_URL}/static`;
