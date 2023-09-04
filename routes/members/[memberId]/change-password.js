import { compareSync, hashSync } from "bcrypt";
import { authMiddleware } from "../../../lib/auth";
import { member } from "../../../models/members";
export const PATCH = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const memberId = req.params.memberId;
  const m = await member.findById(memberId);
  console.log("hi");
  const isValidPassword = compareSync(oldPassword, m.password);
  if (!isValidPassword) {
    res.status(400);
    return res.json({ message: "Bad credential" });
  }
  m.password = hashSync(newPassword, 8);
  await m.save();
  return res.json({ message: "success" });
};
