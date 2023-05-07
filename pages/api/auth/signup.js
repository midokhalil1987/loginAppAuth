import ConnectMongo from "@/database/connect";
import Users from "@/model/Schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  // res.json({ message: "Signup Post Request" });
  ConnectMongo().catch((error) =>
    res.jason({ error: "Connection failed....!" })
  );
  // only post method is allowed
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({
        error: "Don't have form data",
      });
    const { username, email, password } = req.body;

    // check if duplicate users
    const checkExisting = await Users.findOne({ email });
    if (checkExisting)
      return res.status(422).json({ message: "user already exists" });

    //hash password
    Users.create({
      username,
      email,
      password: await hash(password, 12),
      function(err, data) {
        if (err) return res.status(404).json({ err });
        res.status(200).json({ status: true, user: data });
      },
    });
  } else {
    res
      .status(500)
      .jason({ message: "Http method not supported only POST Accepted" });
  }
}
