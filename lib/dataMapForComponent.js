import { formateurs } from "./realData";

export function formateurForFields(formList = formateurs) {
  let arr = [];
  for (let email in formList) {
    let { nom, prenom } = formList[email];
    arr.push({ label: `${nom} ${prenom}`, id: email });
  }
  return arr;
}
