const jwt = require('jsonwebtoken');
const JWT_SAFE = "this is safe key"

const fetchuser=(req,res,next)=>{
const token = req.header('auth-token');
if(!token){
    res.status(501).send({error:"Please authenticate with a valid token"})
}
const data = jwt.verify(token,JWT_SAFE)
req.user = data.user
next();
}

module.exports = fetchuser;