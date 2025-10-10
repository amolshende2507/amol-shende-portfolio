// In server/middleware/auth.js
const jwt = require('jsonwebtoken');

// A middleware function has three parameters: req, res, and next.
module.exports = function(req, res, next) {
  // 1. Get the token from the request header.
  // When our frontend sends a request, we will add the token to a header called 'x-auth-token'.
  const token = req.header('x-auth-token');

  // 2. Check if no token is provided.
  if (!token) {
    // If there's no token, the user is not authorized. Send a 401 Unauthorized status.
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 3. If there is a token, verify it.
  try {
    // jwt.verify() decodes the token. If the token is not valid (e.g., it was tampered with or expired),
    // it will throw an error, which will be caught by the catch block.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // The token is valid! The 'decoded' payload (which contains the user ID) is attached to the request object.
    // Now, any subsequent function in the route handler will have access to req.user.
    req.user = decoded.user;
    
    // The 'next()' function tells Express to proceed to the next function in the chain (our actual route handler).
    next();
  } catch (err) {
    // If jwt.verify() throws an error, it means the token is invalid.
    res.status(401).json({ message: 'Token is not valid' });
  }
};