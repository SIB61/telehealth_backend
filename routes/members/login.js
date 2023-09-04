import { compareSync } from "bcrypt";
import { member } from "../../models/members";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  const { email, password } = req.body;
  const user = await member.findOne({ email: email }).lean();
  console.log(user);

  if (!user) {
    res.status(404);
    return res.json({ message: "User not found" });
  }
  const isValid = compareSync(password, user.password);
  if (!isValid) {
    res.status(401);
    return res.json({ message: "Invalid email or password" });
  }
  const { password: pass, ...body } = user;
  const token = jwt.sign(
    {
      _id: body._id,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    },
    "SECRET"
  );
  return res.json({ ...body, token });
};
