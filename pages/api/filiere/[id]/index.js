import { notFound } from "../../../../lib/api";
import { modules } from "../../../../lib/realData";

export default function handler(req, res) {
  if (isGet(req)) {
    return modules.filter((m) => m.filiere == req.query.id);
  }
  return notFound(res, "URL NOT Mapped");
}
