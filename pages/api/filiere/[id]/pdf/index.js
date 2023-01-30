import { mapISO } from "../../../../../lib/date";
import { makePDF } from "../../../../../lib/pdf";
import { fetchFiliere } from "../../../../../lib/realData";
import htmlFromFiliere from "../../../../../pdfMakers/filiereSimple";

export default async function handler(req, res) {
  let fId = req.query.id;
  let modules = mapISO(fetchFiliere(fId), ["start", "end"]);

  const [pdfBuffer, finished] = await makePDF(htmlFromFiliere(fId, modules));
  // writeFileSync("table.html", tableHTML); // saving the pdf locally - DEBUG PURPOSE /!\
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="Planning_' + fId + '.pdf"'
  );
  res.send(pdfBuffer);

  await finished(); // Important!
}
