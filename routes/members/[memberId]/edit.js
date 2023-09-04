import multer from "multer";
import { member } from "../../../models/members";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

export const PUT = [
  upload.single("image"),
  async (req, res) => {
    req.body.languages = [req.body.language];
    const m = await member
      .findOneAndUpdate(
        { _id: req.params.memberId },
        {
          ...req.body,
          profilePicture: req.file
            ? process.env.STORAGE + req.file?.filename
            : null,
        },
        { new: true }
      )
      .select("-password")
      .lean();
    res.json(m);
  },
];
