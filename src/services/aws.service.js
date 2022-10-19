const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/aws.config');

aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: config.REGION
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: config.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {ContentType: file.mimetype});
    },
    key: function (req, file, cb) {
      cb(null,req.userId+'/'+ Date.now().toString())
    }
  })
});

module.exports = upload;