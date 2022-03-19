require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME || "outreach-content-images";
const region = process.env.AWS_BUCKET_REGION || "ap-south-1";
const accessKeyId = process.env.AWS_ACCESS_KEY || "AKIARAHRWYBABI6ESY7P";
const secretAccessKey =
  process.env.AWS_SECRET_KEY || "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";

const s3 = new S3({
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
