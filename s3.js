require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3 and return upload information
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  // console.log("filestream: ", fileStream);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}

// downloads a file from s3 and read the image data
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}

// need to wrap uploadFile in curly braces if not you will not be able to destructure it when you import it in userCtrl
module.exports = { uploadFile, getFileStream };
// exports.uploadFile = uploadFile;
// exports.getFileStream = getFileStream;
