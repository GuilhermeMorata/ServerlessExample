import buildIAMPolicy from "src/helpers/buildIAMPolicy";

const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

const authorizeUser = (userScopes, methodArn) => {
    return userScopes.find(
        scope => ~methodArn.indexOf(scope)
    )
}

export default async function handlerAuthorizeUser(event){
    const token = event.authorizationToken;

    try {
        const decodedUser = jwt.verify(
            token, JWT_KEY
        )
         
        const user = decodedUser.user
        const userId = user.username
        //scopes defined the acesss for route!
        const isAllowed = authorizeUser(
            user.scopes,
            event.methodArn
        )

        //context of user
        const authorizerContext = {
            user: JSON.stringify(user)
        }
        const policyDocument = buildIAMPolicy(
            userId,
            isAllowed ? 'Allow': 'Deny',
            event.methodArn,
            authorizerContext
        ) 
        return policyDocument
    } catch (error) {
        console.log('auth error**', error.stack)
        //insert error handling
        return {
            statusCode: 401,
            body: error.stack
        }
    }
}