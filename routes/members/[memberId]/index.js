import { member } from "../../../models/members";

export async function PUT(req, res) {
  await member.updateOne({ _id: req.params.memberId }, req.body);
  res.json({
    message: "Successfully updated profile",
  });
}

export async function GET(req, res) {
  const user = await member.findById(req.params.memberId).select("-password");
  res.json(user);
}
