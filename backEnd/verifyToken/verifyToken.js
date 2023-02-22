const Jwt = require('jsonwebtoken');

const verify = (req,res,next) => {
    const accessToken = req.headers.token;

    if (accessToken) {
        const token = accessToken.split(" ")[1]

        Jwt.verify(token, process.env.SECRET_KEY, (err,user)=>{
            if(err){
                res.status(401).json('Token is not valid')
            }
            req.user = user;
            next();
        })
    }else{
        res.status(404).json('You are not authenticated')
    }
}

module.exports = verify