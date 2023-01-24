import { addDays, formatISO, isWithinInterval, parseISO } from "date-fns";
import { isPut, notFound, ok, requestError } from "../../../../lib/api";
import { modules,formateurs as formateurReal } from "../../../../lib/realData";
import { v4 as uuidv4 } from "uuid";

export default function handler(req,res) {

   if(isGet(req)) {
    return modules.filter(m => m.filiere == req.query.id);
   }
   return notFound(res,'URL NOT Mapped');
}