// funcion para para los tokens

const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
 return new Promise( (resolve, reject)=> {
    const payload = { uid, name }
    jwt.sign(payload, process.env.SECRET_JWT_SEED,{
        expiresIn: '2h'
    }, (err, token)=> {
        if (err) {
            console.log(err)
            reject('No se pudo generar el token')
        }

        // si todo fue bien
        resolve(token)
    })

    })

}




  

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });
  
    jwt.verify(token, process.env.SECRET_JWT_SEED, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido' });
      req.user = user;
      next();
    });
  };


module.exports = { 
    generateJWT,
    authenticateToken
}