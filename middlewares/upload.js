const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderPath = '';
    const uploadsDirPath = path.join(__dirname, '..', 'uploads');
    
    if (req.path === '/create' || req.path === '/update') {
      folderPath = path.join(uploadsDirPath, 'products/');
    } else if (req.path === '/register' || req.path === '/user/update') {
      folderPath = path.join(uploadsDirPath, 'users/');
    }

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

function filterFile (req, file, cb) {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, filterFile });

module.exports = upload
