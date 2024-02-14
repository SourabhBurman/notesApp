const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const  token  = req.headers.authorization?.split(" ")[1];
    try {
      const decoded =   jwt.verify(token, 'masai');
      if(decoded) {
        req.body.userId = decoded.userId;
        req.body.author = decoded.author;
        next();
      } else {
        res.status(400).send({msg:"error while authenticating"})
      }
       
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = auth

