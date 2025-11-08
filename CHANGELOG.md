# Changelog - Update Log

## [2.0.0] - November 7, 2025

### ✨ Updates Utama

#### 📦 Dependencies Yang Diperbarui

**Package yang diupdate ke versi terbaru:**
- `@bochilteam/scraper`: 3.0.0 → 5.0.1
- `axios`: 0.21.1 → 1.7.0
- `cfonts`: 2.9.1 → 3.3.1
- `chalk`: 4.1.0 → 4.1.2
- `cookie`: 0.5.0 → 1.0.2
- `cookie-parser`: 1.4.5 → 1.4.7
- `ejs`: 3.1.6 → 3.1.10
- `express`: 4.17.1 → 4.21.2
- `express-rate-limit`: 5.3.0 → 7.5.0
- `express-session`: 1.17.2 → 1.18.1
- `file-type`: 16.1.0 → 16.5.4
- `form-data`: 3.0.0 → 4.0.4
- `fluent-ffmpeg`: 2.1.2 → 2.1.3
- `jsonwebtoken`: 8.5.1 → 9.0.2
- `lodash`: 4.17.20 → 4.17.21
- `memorystore`: 1.6.6 → 1.6.7
- `mongoose`: 5.13.5 → 8.9.0
- `needle`: 2.6.0 → 3.3.1
- `node-fetch`: 2.6.1 → 2.7.0
- `node-schedule`: 2.0.0 → 2.1.1
- `nodemailer`: 6.6.3 → 6.9.16
- `passport`: 0.4.1 → 0.7.0
- `ssl-express-www`: 3.0.7 → 3.0.8

**Package yang dihapus (deprecated):**
- ❌ `crypto`: Built-in di Node.js, tidak perlu diinstall
- ❌ `mongodb`: Sudah included dalam mongoose 8.x

**Package yang dipertahankan sementara:**
- ⚠️ `request`: Deprecated tapi masih digunakan di routes/api.js (perlu migrasi ke axios)

### 🔧 Perubahan Kode

#### MongoDB Connection (`MongoDB/mongodb.js`)
```javascript
// SEBELUM: Menggunakan deprecated options
mongoose.connect(MONGO_DB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

// SESUDAH: Modern Mongoose 8.x style
mongoose.connect(MONGO_DB_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error.message));
```

**Fitur baru:**
- ✅ Pengecekan MongoDB URI kosong
- ✅ Better error handling dengan Promise
- ✅ Event handlers untuk disconnect

#### Express Rate Limiter (`index.js`)
```javascript
// SEBELUM: Error dengan express-rate-limit v7+
app.set('trust proxy', 1);
app.enable('trust proxy'); // Duplicate!

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2000,
  message: 'Oops too many requests'
});

// SESUDAH: Fixed untuk Replit environment
app.set('trust proxy', 1); // Single setting

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2000,
  message: 'Oops too many requests',
  validate: { trustProxy: false } // Disable strict validation
});
```

**Fixes:**
- ✅ Removed duplicate trust proxy setting
- ✅ Added `validate: { trustProxy: false }` untuk compatibility
- ✅ Fixed `ERR_ERL_PERMISSIVE_TRUST_PROXY` error

### 🐛 Bug Fixes
- ✅ Fixed critical MongoDB connection error dengan Mongoose 8.x
- ✅ Fixed express-rate-limit validation error (`ERR_ERL_PERMISSIVE_TRUST_PROXY`)
- ✅ Fixed Mongoose 8.x callback deprecation di `MongoDB/function.js`
  - Updated `limitAdd()` function to use async/await
  - Updated `resetAllLimit()` function to use Promise.all
- ✅ Fixed jQuery syntax error di `views/index.ejs` (extra closing script tag)
- ✅ Fixed jQuery not loading di `views/home.ejs` (added CDN jQuery)
- ✅ Removed deprecated package dependencies
- ✅ Better error messages dan logging dengan try-catch blocks

### 🚀 System Improvements
- ✅ Installed ffmpeg, imagemagick, libwebp via Nix
- ✅ Configured workflow untuk run di port 5000
- ✅ Node.js 20 LTS support

### ⚠️ Known Issues
1. **MongoDB Configuration Required**: 
   - Set `MONGO_DB_URI` di `settings.js` untuk enable database
   - Gunakan MongoDB Atlas atau provider MongoDB lainnya

2. **Email Configuration Required**:
   - Set `your_email` dan `email_password` di `settings.js`

3. **Package 'request' Deprecated**:
   - Masih digunakan di `routes/api.js` (12 usages)
   - Recommended: Migrate ke axios di update berikutnya

### 📝 Migration Notes

**Untuk Developer:**
- Mongoose 8.x tidak lagi memerlukan `useNewUrlParser` atau `useUnifiedTopology`
- Express-rate-limit 7.x lebih strict dengan trust proxy settings
- Package 'crypto' sekarang built-in di Node.js (tidak perlu install)

**Next Steps:**
1. Configure MongoDB connection string
2. Configure email settings untuk nodemailer
3. (Optional) Migrate dari 'request' ke axios untuk better security

---

## Kompatibilitas

- ✅ Node.js 20.x LTS
- ✅ MongoDB 4.0+ / MongoDB Atlas
- ✅ Replit Environment
- ✅ Railway, Heroku, Cyclic (dengan konfigurasi)

---

**Catatan**: Update ini meningkatkan security, performance, dan compatibility dengan modern Node.js ecosystem.
