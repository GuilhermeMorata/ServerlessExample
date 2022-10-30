const JWT_KEY = process.env.JWT_KEY
const { sign } = require('jsonwebtoken')
import DB from '../../config/databaseConfig/dynamoDb';

export default async function handlerlogin(event){
    console.log('Login invoked!..', new Date().toISOString(), event.body)
    const params = {
        TableName : process.env.USER_TABLE_NAME_BASE,
        ScanIndexForward : true,
        Limit:1,
    };
    
    const users = await DB.scan(params).promise()
    const {
        username,
        password
    } = JSON.parse(event.body)

    const validUser = users.find(
        user => 
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password
    )

    if(!validUser) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: 'Unauthorized'
            })
        }
    }

    const signUser = {
        scopes: validUser.scopes,
        username: validUser.username
    }

    const token = sign({
        user: signUser,
    }, JWT_KEY, { expiresIn: '5m'})

    return {
        statusCode: 200,
        body: JSON.stringify({
            token
        })
    }
}
