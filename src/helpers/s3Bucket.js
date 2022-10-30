var AWS = require('aws-sdk');
var s3config = {
    s3ForcePathStyle: true
};
var isLocal = process.env.IS_OFFLINE;
if (isLocal) {
    AWS.config.update({
        credentials: {
            accessKeyId: 'test',
            secretAccessKey: 'test'
        }
    });
    var host = "localhost";
    //@ts-ignore
    s3config.endpoint = new AWS.Endpoint("http://".concat(host, ":4566"));
}
var S3Client = new AWS.S3(s3config);
module.exports = {
    S3Client: S3Client
};
