# Alphabot REST API

## Overview
This is a REST API web application built with Express.js and MongoDB. It provides various API endpoints for downloaders, news, search, games, Islamic content, and other utilities. The application includes user authentication, API key management, and rate limiting.

**Current State:** Configured and running on Replit
**Last Updated:** November 08, 2025

## Project Architecture

### Technology Stack
- **Backend Framework:** Express.js (Node.js)
- **Database:** MongoDB (external MongoDB Atlas connection)
- **Template Engine:** EJS
- **Authentication:** Passport.js with local strategy
- **Session Management:** Express-session with MemoryStore
- **Rate Limiting:** Express-rate-limit

### Project Structure
```
├── assets/          # Static assets (CSS, JS, images)
├── database/        # Database utility files
├── lib/             # Utility libraries and helper functions
├── MongoDB/         # MongoDB schemas and connection
├── routes/          # Route handlers (api.js, main.js, users.js)
├── views/           # EJS templates
├── index.js         # Main application entry point
├── settings.js      # Global configuration
└── package.json     # Dependencies and scripts
```

### Key Features
- User registration and authentication
- API key generation and management
- Rate limiting (2000 requests per minute)
- Session management
- Multiple API categories: downloaders, news, search, games, Islamic content, NSFW, photooxy
- Flash messages for user feedback
- Responsive web interface

## Configuration

### Server Settings
- **Host:** 0.0.0.0 (configured for Replit proxy)
- **Port:** 5000 (environment variable PORT or default 5000)
- **Proxy Trust:** Enabled (required for Replit environment)

### Database
- Uses MongoDB Atlas (external connection)
- Connection URI configured in `settings.js` via `MONGO_DB_URI`
- User schema includes: username, password, email, apikey, premium status, and request limits

### Environment Variables
The application uses the following from `settings.js`:
- `MONGO_DB_URI` - MongoDB connection string
- `ACTIVATION_TOKEN_SECRET` - Token secret for activations
- `your_email` - Email for notifications
- `email_password` - Email application password
- `limitCount` - API request limit (default: 10000)

## Recent Changes
- **2025-11-08:** Bug Fixes & Security Updates
  - **Dockerfile**: Updated dari `node:lts-buster` (deprecated) ke `node:20-bookworm-slim`
    - Added WORKDIR, EXPOSE, improved build optimization
  - **Security Fixes**: Eliminated ALL vulnerabilities (0 vulnerabilities sekarang)
    - Removed deprecated `request` package (had 2 critical vulnerabilities)
    - Removed deprecated `fluent-ffmpeg` package
    - Migrated semua `request()` calls (12+ instances) ke `axios`
  - **Code Improvements**:
    - Updated `lib/textpro.js`: Modern async/await dengan axios
    - Updated `routes/api.js`: Replaced semua request patterns dengan axios
    - Added proper error handling dengan try/catch blocks
    - Improved code readability dengan async/await patterns
  - **Environment Setup**:
    - Installed all Node.js dependencies (273 packages after cleanup)
    - Verified server binding to 0.0.0.0:5000 for Replit proxy
    - Confirmed MongoDB Atlas connection working
    - Created .gitignore with Node.js patterns
    - Configured workflow & deployment for autoscale
    - Application fully functional and tested

## User Preferences
None documented yet.

## Development

### Running the Application
The application runs automatically via the configured workflow:
```bash
npm start
```

### Routes
- `/` - Home page
- `/docs` - API documentation (requires authentication)
- `/users` - User management routes
- `/api` - API endpoints
- Various category pages: `/cecan`, `/downloader`, `/news`, `/photooxy`, `/search`, `/nsfw`, `/islam`, `/game`, `/other`

### Authentication
- Uses Passport.js with local strategy
- Sessions stored in memory (MemoryStore)
- Password hashing implemented
- Protected routes require authentication

## Notes
- The application includes a scheduled job that resets API limits every minute
- SSL redirection is enabled via ssl-express-www
- CORS is enabled for cross-origin requests
- Static files served from `/assets` directory
