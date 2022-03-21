const fs = require('fs');
const util = require('util');
const { uploadFile } = require('../s3.js');
const BaseController = require('./baseCtrl.js');

const unlinkFile = util.promisify(fs.unlink);

class ImageController extends BaseController {
  async uploadImage(req, res) {
    console.log('req.body: ', req.body);
    const { file } = req; // contains data about the image file that was sent over in formData
    console.log('req.file: ', req.file);
    const result = await uploadFile(file);
    /** result:  {
      ETag: '"76823f128b9a086c136a0f378a35691f"',
      // this location url can be used to directly access images
      // (if we allow public access) (we didnt though)
      Location: 'https://chinese-ar-app.s3.ap-southeast-1.amazonaws.com/16dd64db8c69c194e3b09696d8a6086b',
      key: '16dd64db8c69c194e3b09696d8a6086b',
      // This Key matches the name of the file that is on s3 bucket now (you can check it out!)
      Key: '16dd64db8c69c194e3b09696d8a6086b',
      Bucket: 'chinese-ar-app'
    } */
    // add Key to db under this user's name (to be continued)
    await this.model.updateOne(
      { _id: req.body.userId },
      // req.body.userId contains the userId of the user who submitted the form
      {
        $push: {
          images: {
            imagePath: `/${result.Key}`,
          },
        },
      },
    );

    await unlinkFile(file.path); // deletes file after it is uploaded
    res.send({ imagePath: `/${result.Key}` });
  }
}

module.exports = ImageController;
