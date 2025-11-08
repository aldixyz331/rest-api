# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.1.0] - 2025-11-09

### Changed
- **Dockerfile**: Updated base image dari `node:lts-buster` (deprecated) ke `node:20-bookworm-slim`
  - Added WORKDIR configuration
  - Added EXPOSE port configuration
  - Improved build optimization

### Security
- **Eliminated ALL vulnerabilities** (0 vulnerabilities)
  - Removed deprecated `request` package (had 2 critical vulnerabilities)
  - Removed deprecated `fluent-ffmpeg` package
  - Migrated 12+ instances dari `request()` calls ke `axios`

### Improved
- **Code Quality**:
  - Updated `lib/textpro.js`: Migrated to modern async/await patterns dengan axios
  - Updated `routes/api.js`: Replaced semua request patterns dengan axios
  - Added proper error handling dengan try/catch blocks
  - Improved code readability dengan async/await patterns

### Fixed
- **Environment Setup**:
  - Installed all Node.js dependencies (273 packages)
  - Verified server binding to 0.0.0.0:5000 for Replit proxy compatibility
  - Confirmed MongoDB Atlas connection working properly
  - Created .gitignore dengan Node.js patterns
  - Configured workflow & deployment for autoscale
  - Application fully functional and tested

## [1.0.0] - Previous Release

### Added
- Initial REST API implementation dengan Express.js
- User authentication dengan Passport.js
- API key generation and management
- Rate limiting (2000 requests per minute)
- MongoDB integration untuk user data
- Multiple API categories:
  - Downloaders
  - News
  - Search
  - Games
  - Islamic content
  - NSFW
  - Photooxy
- Responsive web interface dengan EJS templates
- Session management dengan MemoryStore
- Flash messages untuk user feedback
- SSL redirection
- CORS support

### Features
- User registration and login system
- Protected routes dengan authentication
- API documentation page
- Scheduled job untuk reset API limits setiap minute
