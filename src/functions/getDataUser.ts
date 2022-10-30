import DB from '../../config/databaseConfig/dynamoDb';

export default async function getDataUser(event){
    const user =   event.requestContext.authorizer.user
    
    const params = {
        TableName :  process.env.USER_TABLE_NAME_BASE,
        FilterExpression : 'name = :',
        ScanIndexForward: false,
        ExpressionAttributeValues: {
            ':name': user.name,
        }
    };

    await DB.query(params)
        .promise()
        .then((value)=>{
            return(
                {
                    statusCode: 200,
                    data: value
                }
            )
        })
        .catch((err)=>{
            console.log('error Method randomText::',err)
            return({
                statusCode:400,
                data: err 
            })
        })

}