import { isGet, ok, parseBool } from "../../../lib/api";
import { formateurs } from "../../../lib/realData";

export default function handler(req, res) {
  if (isGet(req)) {
    let {available,able} = req.query;
    available = parseBool(available);
    able = parseBool(able);
    
    return ok(res,formateurs);
  }
}
