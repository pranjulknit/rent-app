import jwt from 'jsonwebtoken';  // Make sure to import jwt

 export default function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) {
       
        reject(err);
      } else {
        
        resolve(userData);
      }
    });
  });
}
