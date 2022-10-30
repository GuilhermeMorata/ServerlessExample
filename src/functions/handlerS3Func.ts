const S3Client = require('../helpers/s3Bucket');

export default async function handlerS3Func(event){
    const user =   event.requestContext.authorizer.user
    const allBuckets = await S3Client.listBuckets().promise()

    return  {
        statusCode: 200,
        body: JSON.stringify(allBuckets[user])
    }
}