const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/pubic/uploads');
    },
    filename: (req, file, cb) => {
        // Add timestamp to the original filename to avoid duplicates
        const timestamp = Date.now();
        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        const ext = path.extname(file.originalname);
    
        cb(null, `${originalName}-${timestamp}${ext}`); // Combine original name, timestamp, and extension
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
};


const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB
    fileFilter: fileFilter
  });
  
module.exports = upload;