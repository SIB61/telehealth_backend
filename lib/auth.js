import jwt from "jsonwebtoken";
export function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // Extract the token without 'Bearer '
  const jwtToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(jwtToken, "SECRET"); // Replace 'your-secret-key' with your actual JWT secret key

    // Attach the decoded user information to the request object for further use
    req.user = decoded;

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
