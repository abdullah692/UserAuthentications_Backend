const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {

    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // Handle expired token
                    res.status(401).json({ message: "Token has expired" });
                } else {
                    // Handle other errors
                    res.status(400).json({ message: "User is unauthorized" });
                }
            } else {
                // Token is valid, continue with the request
                req.user = decoded.user;
                console.log('decoded', decoded.user);
                console.log('req.user', req.user);
                next();
            }
    })
}
    
    if(!token)
    {
        res.status(400).json({message:'Token is expired or missing..!!'})
    }
};

module.exports=validateToken;