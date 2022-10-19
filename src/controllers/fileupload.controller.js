const upload = require('../services/aws.service');
const singleUpload = upload.single('image');
exports.create = (req, res) => {
    singleUpload(req, res, function(err) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        return res.json({'imageUrl': req.file.location});
      });
}