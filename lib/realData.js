import { parse } from "./date";
import { formatISO } from "date-fns";
import { faker } from "@faker-js/faker";

/* ----------------------

    FORMATEURS

  ---------------------- */

export const formateurs = {};
const randomFormateur = () => ({
  prenom: faker.name.firstName(),
  nom: faker.name.lastName(),
});
Array.from({ length: 10 }).forEach(() => {
  let f = randomFormateur();
  f.mail = faker.internet.email(f.nom, f.prenom);
  formateurs[f.mail] = f;
});
formateurs["na@na.na"] = {
  nom: "NA",
  prenom: "Na",
  mail: "na@na.na",
};

/* ----------------------

    MODULES

  ---------------------- */

const raw = [
  {
    id: "d97b0e4e-ced0-489d-9b16-2d4e1d517e3a",
    name: "ROLE ET COMPORTEMENT DU CONSULTANT",
    start: "12/8/2022",
    end: "12/8/2022",
    theme: "COMPORTEMENTAL",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "bebe0097-9419-491c-83d7-27c9f4613b18",
    name: "SAVOIR SE PRESENTER AVEC SES NOUVELLES COMPETENCES METIERS",
    start: "12/9/2022",
    end: "12/9/2022",
    theme: "COMPORTEMENTAL",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "0e571c82-806d-4748-bcfa-2b9bcd1d689d",
    name: "ALGO AVEC JAVA",
    start: "12/12/2022",
    end: "12/14/2022",
    theme: "JAVA",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "0c40263f-d38b-48c7-94e4-ed24ca889d3c",
    name: "JAVA OBJET",
    start: "12/15/2022",
    end: "12/20/2022",
    theme: "JAVA",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "b06d9731-35d1-44aa-97c5-5525f4759479",
    name: "INIT BDD ET SQL",
    start: "12/21/2022",
    end: "12/23/2022",
    theme: "FONDAMENTAUX ET BASE DE DONNEES",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "5e9542d6-e79a-4520-80fb-b196dab8f67a",
    name: "UML",
    start: "1/2/2023",
    end: "1/2/2023",
    theme: "FONDAMENTAUX ET BASE DE DONNEES",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "569cd8ed-16e2-444f-9634-e7aa3d9b8d62",
    name: "JAVA AVANCEE",
    start: "1/3/2023",
    end: "1/9/2023",
    theme: "JAVA",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "66432815-2bc6-47bf-b4df-5f24ea5cbe93",
    name: "XML ET JSON",
    start: "1/10/2023",
    end: "1/10/2023",
    theme: "WEB",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "06d6de05-f0b5-46ba-b880-f057ef158db9",
    name: "MAVEN ET GIT",
    start: "1/11/2023",
    end: "1/11/2023",
    theme: "METHODES ET OUTILS",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "6313720b-ce59-4a60-91d9-7082e7252525",
    name: "HTML5, CSS, BOOTSTRAP4",
    start: "1/12/2023",
    end: "1/13/2023",
    theme: "WEB",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "790e3b05-b512-4b1f-bd39-ed944b2ea4ef",
    name: "JAVASCRIPT",
    start: "1/16/2023",
    end: "1/18/2023",
    theme: "WEB",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "4ad16ba0-2f20-4394-878c-2d265893edcf",
    name: "SERVLET / JSP",
    start: "1/19/2023",
    end: "1/20/2023",
    theme: "WEB",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "7d98a5e6-3469-4dd8-a3de-5d73ed05ce57",
    name: "JPA 2 AVEC HIBERNATE",
    start: "1/23/2023",
    end: "1/27/2023",
    theme: "FRAMEWORKS",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "f30b6fb4-9bf2-404c-a127-ab6ab87c0875",
    name: "SPRING CORE, DATA ET TEST",
    start: "1/30/2023",
    end: "2/1/2023",
    theme: "FRAMEWORKS",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "ec923019-d95a-48e2-b6cd-db5e6b0469c9",
    name: "SPRING MVC",
    start: "2/2/2023",
    end: "2/3/2023",
    theme: "FRAMEWORKS",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "34842f84-e21e-42cc-9fb4-c9c556c0be94",
    name: "AGILE SCRUM + SAFE",
    start: "2/6/2023",
    end: "2/9/2023",
    theme: "METHODES ET OUTILS",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "fad6ecd0-9b3e-4a6b-9375-6773a9c58cf8",
    name: "UNIX",
    start: "2/10/2023",
    end: "2/10/2023",
    theme: "FONDAMENTAUX ET BASE DE DONNEES",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "2fb0f0ec-f635-4522-88ec-a39b0fadf99a",
    name: "SPRING MVC",
    start: "2/13/2023",
    end: "2/15/2023",
    theme: "FRAMEWORKS",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "f5a85d29-2fd1-4069-807e-6b004cc01baa",
    name: "SPRING BOOT, REST ET SECURITY",
    start: "2/16/2023",
    end: "2/17/2023",
    theme: "FRAMEWORKS",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "e4cfe1a2-ac82-45bb-9808-0c04dafe37bb",
    name: "ANGULAR",
    start: "2/20/2023",
    end: "2/24/2023",
    theme: "FRAMEWORKS",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },
  {
    id: "7d6fb23f-fdbc-4149-a506-aa55da754f9a",
    name: "PROJET FINAL",
    start: "2/27/2023",
    end: "3/3/2023",
    theme: "PROJET",
    filiere: "I-221208-DIS-399-SOPRA-JAVA",
  },

  {
    id: "524e8c31-a4e0-4345-894f-3be383e97bfe",
    name: "ROLE ET COMPORTEMENT DU CONSULTANT",
    start: "1/19/2023",
    end: "1/19/2023",
    theme: "COMPORTEMENTAL",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "36edbbf3-a8bc-455f-819f-6cba1f1a45ac",
    name: "SAVOIR SE PRESENTER AVEC SES NOUVELLES COMPETENCES METIERS",
    start: "1/20/2023",
    end: "1/20/2023",
    theme: "COMPORTEMENTAL",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "8399f9a5-9ac0-4179-a31f-9ac8ce44b664",
    name: "ALGO AVEC JAVA",
    start: "1/23/2023",
    end: "1/25/2023",
    theme: "JAVA",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "2195e079-2a1c-4758-a08f-6c9dee7420ea",
    name: "JAVA OBJET",
    start: "1/26/2023",
    end: "1/31/2023",
    theme: "JAVA",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "d0579259-a15b-4330-8103-f75fe032d5ae",
    name: "INIT BDD ET SQL",
    start: "2/1/2023",
    end: "2/3/2023",
    theme: "FONDAMENTAUX ET BASE DE DONNEES",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "8dd52c79-33ec-4f67-a0dd-8379861e2147",
    name: "UML",
    start: "2/6/2023",
    end: "2/6/2023",
    theme: "FONDAMENTAUX ET BASE DE DONNEES",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "89ca737c-5e0c-47d5-a54d-e626d4ffddaf",
    name: "JAVA AVANCEE",
    start: "2/7/2023",
    end: "2/13/2023",
    theme: "JAVA",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "51b8818e-7b44-4c99-8167-278721af79ee",
    name: "XML ET JSON",
    start: "2/14/2023",
    end: "2/14/2023",
    theme: "WEB",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "3d0b7b4e-1e5f-4281-852c-119e8b7cbaed",
    name: "MAVEN ET GIT",
    start: "2/15/2023",
    end: "2/15/2023",
    theme: "METHODES ET OUTILS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "bfa683c7-a8a8-48ca-bc35-bacc10031f35",
    name: "JPA 2 AVEC HIBERNATE",
    start: "2/16/2023",
    end: "2/22/2023",
    theme: "FRAMEWORKS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "f822466e-c5c3-4d68-af1e-3fade6e954b4",
    name: "HTML5, CSS, BOOTSTRAP4",
    start: "2/23/2023",
    end: "2/24/2023",
    theme: "WEB",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "4509b15d-1ab9-4227-9f0e-a12653a88dc0",
    name: "JAVASCRIPT",
    start: "2/27/2023",
    end: "3/1/2023",
    theme: "WEB",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "be9d1987-1465-43f3-b676-77b73ef18cec",
    name: "SERVLET / JSP",
    start: "3/2/2023",
    end: "3/3/2023",
    theme: "WEB",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "70546664-5619-49e0-8e9b-2b8e53574851",
    name: "SPRING CORE, DATA ET TEST",
    start: "3/6/2023",
    end: "3/8/2023",
    theme: "FRAMEWORKS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "ef1e1071-d7a6-49ef-b1e9-f86ffd9d56b0",
    name: "SPRING MVC",
    start: "3/9/2023",
    end: "3/15/2023",
    theme: "FRAMEWORKS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "8158f760-1964-402e-89ce-53f4b506cf56",
    name: "SPRING BOOT, REST ET SECURITY",
    start: "3/16/2023",
    end: "3/17/2023",
    theme: "FRAMEWORKS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "9fb3c6df-493a-4bba-8450-5bb66bd06794",
    name: "AGILE SCRUM + SAFE",
    start: "3/20/2023",
    end: "3/23/2023",
    theme: "METHODES ET OUTILS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "19050a80-68d7-41d1-bc97-fc6851b57a95",
    name: "UNIX",
    start: "3/24/2023",
    end: "3/24/2023",
    theme: "FONDAMENTAUX ET BASE DE DONNEES",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "fcff45aa-c138-4514-90f9-ee4df059fa8f",
    name: "ANGULAR",
    start: "3/27/2023",
    end: "3/30/2023",
    theme: "FRAMEWORKS",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
  {
    id: "519e9410-094f-428f-ad3d-38f7bb5791be",
    name: "PROJET FINAL",
    start: "4/3/2023",
    end: "4/7/2023",
    theme: "PROJET",
    filiere: "I-230119-DIS-399-SOPRA-JAVA",
  },
];

const parsedModules = raw;
for (let m of parsedModules) {
  m.start = formatISO(parse(m.start, "M/d/yyyy"));
  m.end = formatISO(parse(m.end, "M/d/yyyy"));
  let rndmail = Object.keys(formateurs)[Math.floor(Math.random() * Object.keys(formateurs).length)];
  m.formateur = formateurs[rndmail];
}

export var modules = parsedModules;
console.log(modules);

/* ----------------------

    FORMATEURS

  ---------------------- */

// export const formateurs = {
//   "cabdaoui@gmail.com": {
//     nom: "ABDAOUI",
//     prenom: "Cherif",
//     mail: "cabdaoui@gmail.com",
//   },
//   "cedric@ajc-formation.fr": {
//     nom: "ABID",
//     prenom: "Cédric",
//     mail: "cedric@ajc-formation.fr",
//   },
//   "charly@ajc-formation.fr": {
//     nom: "ABID",
//     prenom: "Charly",
//     mail: "charly@ajc-formation.fr",
//   },
//   "didier.abid@gmail.com": {
//     nom: "ABID",
//     prenom: "Didier",
//     mail: "didier.abid@gmail.com",
//   },
//   "jeabid@ajc-formation.fr": {
//     nom: "ABID",
//     prenom: "Jérémy",
//     mail: "jeabid@ajc-formation.fr",
//   },
//   "j.abid@ajc-ingenierie.fr": {
//     nom: "ABID",
//     prenom: "Jordan",
//     mail: "j.abid@ajc-ingenierie.fr",
//   },
//   "laurent.abid@gmail.com": {
//     nom: "ABID",
//     prenom: "Laurent",
//     mail: "laurent.abid@gmail.com",
//   },
//   "yohan.abid@gmail.com": {
//     nom: "ABID",
//     prenom: "Yohan",
//     mail: "yohan.abid@gmail.com",
//   },
//   "admin@ajc-ingenierie.fr": {
//     nom: "ADMIN",
//     prenom: "Rh",
//     mail: "admin@ajc-ingenierie.fr",
//   },
//   "vincent.alcouffe@posteo.net": {
//     nom: "ALCOUFFE",
//     prenom: "Vincent",
//     mail: "vincent.alcouffe@posteo.net",
//   },
//   "mohamed.amine-scparis@altran.com": {
//     nom: "AMINE",
//     prenom: "Mohamed",
//     mail: "mohamed.amine-scparis@altran.com",
//   },
//   "jm.anciaux@ajc-ingenierie.fr": {
//     nom: "ANCIAUX",
//     prenom: "Jean-Marc",
//     mail: "jm.anciaux@ajc-ingenierie.fr",
//   },
//   "sebastien.antherieu@gmail.com": {
//     nom: "ANTHÉRIEU",
//     prenom: "Sébastien",
//     mail: "sebastien.antherieu@gmail.com",
//   },
//   "sassous@ajc-formation.fr": {
//     nom: "ASSOUS",
//     prenom: "Sandrine",
//     mail: "sassous@ajc-formation.fr",
//   },
//   "muriel.attal@gmail.com": {
//     nom: "ATTAL",
//     prenom: "Murielle",
//     mail: "muriel.attal@gmail.com",
//   },
//   "dattali@ajc-formation.fr": {
//     nom: "ATTALI",
//     prenom: "Danielle",
//     mail: "dattali@ajc-formation.fr",
//   },
//   "az_yacine@hotmail.com": {
//     nom: "AZOUNE",
//     prenom: "Yacine",
//     mail: "az_yacine@hotmail.com",
//   },
//   "thibault.beauvillard@hotmail.fr": {
//     nom: "BEAUVILLARD",
//     prenom: "Thibault",
//     mail: "thibault.beauvillard@hotmail.fr",
//   },
//   "bekkali.zakariae@gmail.com": {
//     nom: "BEKKALI",
//     prenom: "Zakariae",
//     mail: "bekkali.zakariae@gmail.com",
//   },
//   "nabil.benslama@triumph-solutions.tn": {
//     nom: "BEN SLAMA",
//     prenom: "Nabil",
//     mail: "nabil.benslama@triumph-solutions.tn",
//   },
//   "consultingpresco@gmail.com": {
//     nom: "BEN YOUCEF",
//     prenom: "Moussa",
//     mail: "consultingpresco@gmail.com",
//   },
//   "jluc.benard@jlb-consulting.net": {
//     nom: "BENARD",
//     prenom: "Jean-Luc",
//     mail: "jluc.benard@jlb-consulting.net",
//   },
//   "laurence@ajc-formation.fr": {
//     nom: "BENHAMOU",
//     prenom: "Laurence",
//     mail: "laurence@ajc-formation.fr",
//   },
//   "ybenisty@ajc-formation.fr": {
//     nom: "BENISTY",
//     prenom: "Yaël",
//     mail: "ybenisty@ajc-formation.fr",
//   },
//   "zohrabillaud@gmail.com": {
//     nom: "BILLAUD",
//     prenom: "Zohra",
//     mail: "zohrabillaud@gmail.com",
//   },
//   "contact@w-i.cool": {
//     nom: "BONNIER",
//     prenom: "Laurent",
//     mail: "contact@w-i.cool",
//   },
//   "bonnier.vincentpro@gmail.com": {
//     nom: "BONNIER",
//     prenom: "Vincent",
//     mail: "bonnier.vincentpro@gmail.com",
//   },
//   "gilles.bouhana@exponentiel.eu": {
//     nom: "BOUHANA",
//     prenom: "Gilles",
//     mail: "gilles.bouhana@exponentiel.eu",
//   },
//   "gilles.bousna@exponentiel.eu": {
//     nom: "BOUSNA",
//     prenom: "Gilles",
//     mail: "gilles.bousna@exponentiel.eu",
//   },
//   "pascale.boussard@multidevid.com": {
//     nom: "BOUSSARD",
//     prenom: "Pascale",
//     mail: "pascale.boussard@multidevid.com",
//   },
//   "fboutin76@gmail.com": {
//     nom: "BOUTIN",
//     prenom: "Florent",
//     mail: "fboutin76@gmail.com",
//   },
//   "jfbouzereau@netcourrier.com": {
//     nom: "BOUZEREAU",
//     prenom: "Jean-François",
//     mail: "jfbouzereau@netcourrier.com",
//   },
//   "lionel.boye@gmail.com": {
//     nom: "BOYE",
//     prenom: "Lionel",
//     mail: "lionel.boye@gmail.com",
//   },
//   "mbrayer@ajc-formation.fr": {
//     nom: "BRAYER",
//     prenom: "Marc",
//     mail: "mbrayer@ajc-formation.fr",
//   },
//   "d.bueno@ajc-ingenierie.fr": {
//     nom: "BUENO",
//     prenom: "Delphine",
//     mail: "d.bueno@ajc-ingenierie.fr",
//   },
//   "michel.cadennes@sens-commun.fr": {
//     nom: "CADENNES",
//     prenom: "Michel",
//     mail: "michel.cadennes@sens-commun.fr",
//   },
//   "jeremie.campari@gmail.com": {
//     nom: "CAMPARI",
//     prenom: "Jérémie",
//     mail: "jeremie.campari@gmail.com",
//   },
//   "alain.camps@whynotendances.fr": {
//     nom: "CAMPS",
//     prenom: "Alain",
//     mail: "alain.camps@whynotendances.fr",
//   },
//   "carlevaris.mt@gmail.com": {
//     nom: "CARLEVARIS",
//     prenom: "Maria",
//     mail: "carlevaris.mt@gmail.com",
//   },
//   "philippe.casano@pcasano.com": {
//     nom: "CASANO",
//     prenom: "Philippe",
//     mail: "philippe.casano@pcasano.com",
//   },
//   "guillaume.chevrot@numgrade.com": {
//     nom: "CHEVROT",
//     prenom: "Guillaume",
//     mail: "guillaume.chevrot@numgrade.com",
//   },
//   "omarcisses@gmail.com": {
//     nom: "CISSE",
//     prenom: "Omar",
//     mail: "omarcisses@gmail.com",
//   },
//   "fabrice_y@yahoo.fr": {
//     nom: "COURTES",
//     prenom: "Fabrice",
//     mail: "fabrice_y@yahoo.fr",
//   },
//   "didier@d-defrance.fr": {
//     nom: "DEFRANCE",
//     prenom: "Didier",
//     mail: "didier@d-defrance.fr",
//   },
//   "jacques.derhy@gmail.com": {
//     nom: "DERHY",
//     prenom: "Jacques",
//     mail: "jacques.derhy@gmail.com",
//   },
//   "sylvie.desprez@live.fr": {
//     nom: "DESPREZ",
//     prenom: "Sylvie",
//     mail: "sylvie.desprez@live.fr",
//   },
//   "ndjian@ajc-formation.fr": {
//     nom: "DJIAN",
//     prenom: "Nathalie",
//     mail: "ndjian@ajc-formation.fr",
//   },
//   "afdouglas74@gmail.com": {
//     nom: "DOUGLAS",
//     prenom: "Alistair",
//     mail: "afdouglas74@gmail.com",
//   },
//   "nico.dudouet@exponentiel.eu": {
//     nom: "DUDOUET",
//     prenom: "Nicolas",
//     mail: "nico.dudouet@exponentiel.eu",
//   },
//   "jeancharles.edel@gmail.com": {
//     nom: "EDEL",
//     prenom: "Jean-Charles",
//     mail: "jeancharles.edel@gmail.com",
//   },
//   "rachid.el.moutaoukil@gmail.com": {
//     nom: "EL MOUTAOUKIL",
//     prenom: "Rachid",
//     mail: "rachid.el.moutaoukil@gmail.com",
//   },
//   "catherine@epaillard.com": {
//     nom: "EPAILLARD",
//     prenom: "Catherine",
//     mail: "catherine@epaillard.com",
//   },
//   "pascal.escale@futurskill.fr": {
//     nom: "ESCALE",
//     prenom: "Pascal",
//     mail: "pascal.escale@futurskill.fr",
//   },
//   "evraere.benoit@gmail.com": {
//     nom: "EVRAERE",
//     prenom: "Benoit",
//     mail: "evraere.benoit@gmail.com",
//   },
//   "f.fargeon@ajc-ingenierie.fr": {
//     nom: "FARGEON",
//     prenom: "Franck",
//     mail: "f.fargeon@ajc-ingenierie.fr",
//   },
//   "huguette.faty@skema.edu": {
//     nom: "FATY",
//     prenom: "Huguette",
//     mail: "huguette.faty@skema.edu",
//   },
//   "baudouin-fm@hotmail.fr": {
//     nom: "FAUCHIER-MAGNAN",
//     prenom: "Baudouin",
//     mail: "baudouin-fm@hotmail.fr",
//   },
//   "florent.fercoq@gmail.com": {
//     nom: "FERCOQ",
//     prenom: "Florent",
//     mail: "florent.fercoq@gmail.com",
//   },
//   "antoine@semifir.com": {
//     nom: "FISSOT",
//     prenom: "Antoine",
//     mail: "antoine@semifir.com",
//   },
//   "fitoptic@hotmail.fr": {
//     nom: "FITOUSI",
//     prenom: "Thierry",
//     mail: "fitoptic@hotmail.fr",
//   },
//   "bfliecx@hotmail.com": {
//     nom: "FLIEX",
//     prenom: "Brigitte",
//     mail: "bfliecx@hotmail.com",
//   },
//   "antonin.fontana@lib-consulting.com": {
//     nom: "FONTANA",
//     prenom: "Antonin",
//     mail: "antonin.fontana@lib-consulting.com",
//   },
//   "david.gayerie@free.fr": {
//     nom: "GAYERIE",
//     prenom: "David",
//     mail: "david.gayerie@free.fr",
//   },
//   "o.gozlan@ajc-ingenierie.fr": {
//     nom: "GOZLAN",
//     prenom: "Olivier",
//     mail: "o.gozlan@ajc-ingenierie.fr",
//   },
//   "v_greceanu@yahoo.fr": {
//     nom: "GRECEANU",
//     prenom: "Valentin",
//     mail: "v_greceanu@yahoo.fr",
//   },
//   "jguenver@gmail.com": {
//     nom: "GUENVER",
//     prenom: "Jérome",
//     mail: "jguenver@gmail.com",
//   },
//   "f.guereve@ajc-ingenierie.fr": {
//     nom: "GUEREVE",
//     prenom: "Fanta",
//     mail: "f.guereve@ajc-ingenierie.fr",
//   },
//   "olivier.guttierez@gmail.com": {
//     nom: "GUTTIEREZ",
//     prenom: "Olivier",
//     mail: "olivier.guttierez@gmail.com",
//   },
//   "sylvere.hagel@gmail.com": {
//     nom: "HAGEL",
//     prenom: "Sylvère",
//     mail: "sylvere.hagel@gmail.com",
//   },
//   "jean-marie.hardy-neveu@gmail.com": {
//     nom: "HARDY-NEVEU",
//     prenom: "Jean-Marie",
//     mail: "jean-marie.hardy-neveu@gmail.com",
//   },
//   "mourad.hassini@wevioo.com": {
//     nom: "HASSINI",
//     prenom: "Mourad",
//     mail: "mourad.hassini@wevioo.com",
//   },
//   "stephane.hercot@gmail.com": {
//     nom: "HERCOT",
//     prenom: "Stéphane",
//     mail: "stephane.hercot@gmail.com",
//   },
//   "awatef.hicheurcairns@altran.com": {
//     nom: "HICHEUR CAIRNS",
//     prenom: "Awatef",
//     mail: "awatef.hicheurcairns@altran.com",
//   },
//   "domimperial@aol.com": {
//     nom: "IMPÉRIAL",
//     prenom: "Dominique",
//     mail: "domimperial@aol.com",
//   },
//   "m.janvier@ajc-ingenierie.fr": {
//     nom: "JANVIER",
//     prenom: "Manuela",
//     mail: "m.janvier@ajc-ingenierie.fr",
//   },
//   "m.jean@ajc-ingenierie.fr": {
//     nom: "JEAN",
//     prenom: "Mickael",
//     mail: "m.jean@ajc-ingenierie.fr",
//   },
//   "amel.kerai@gmail.com": {
//     nom: "KERAI",
//     prenom: "Amel",
//     mail: "amel.kerai@gmail.com",
//   },
//   "ak@ajc-formation.fr": {
//     nom: "KHAIDA",
//     prenom: "Armand",
//     mail: "ak@ajc-formation.fr",
//   },
//   "dkoskas@ajc-formation.fr": {
//     nom: "KOSKAS",
//     prenom: "David",
//     mail: "dkoskas@ajc-formation.fr",
//   },
//   "ilacour@ajc-formation.fr": {
//     nom: "LACOUR",
//     prenom: "Isabelle",
//     mail: "ilacour@ajc-formation.fr",
//   },
//   "nadia.lamar@gmail.com": {
//     nom: "LAMAR",
//     prenom: "Nadia",
//     mail: "nadia.lamar@gmail.com",
//   },
//   "launay.franck@gmail.com": {
//     nom: "LAUNAY",
//     prenom: "Franck",
//     mail: "launay.franck@gmail.com",
//   },
//   "angele.lemort@gmail.com": {
//     nom: "LEMORT",
//     prenom: "Angele",
//     mail: "angele.lemort@gmail.com",
//   },
//   "rleroy@pacphenix.fr": {
//     nom: "LEROY",
//     prenom: "René",
//     mail: "rleroy@pacphenix.fr",
//   },
//   "blconseilcontact@gmail.com": {
//     nom: "LESBATS",
//     prenom: "Bruno",
//     mail: "blconseilcontact@gmail.com",
//   },
//   "permanent101@yahoo.com": {
//     nom: "LÉVY",
//     prenom: "Marc",
//     mail: "permanent101@yahoo.com",
//   },
//   "lhomme.thomas@gmail.com": {
//     nom: "LHOMME",
//     prenom: "Thomas",
//     mail: "lhomme.thomas@gmail.com",
//   },
//   "globre@mereo.fr": {
//     nom: "LOBRE",
//     prenom: "Guilhem",
//     mail: "globre@mereo.fr",
//   },
//   "frederic.lossignol@gmail.com": {
//     nom: "LOSSIGNOL",
//     prenom: "Frédéric",
//     mail: "frederic.lossignol@gmail.com",
//   },
//   "denis.madec@gmail.com": {
//     nom: "MADEC",
//     prenom: "Denis",
//     mail: "denis.madec@gmail.com",
//   },
//   "prisca.malecot@grandvision.fr": {
//     nom: "MALECOT",
//     prenom: "Prisca",
//     mail: "prisca.malecot@grandvision.fr",
//   },
//   "pierrealexandre.manneau@gmail.com": {
//     nom: "MANNEAU",
//     prenom: "Pierre-Alexandre",
//     mail: "pierrealexandre.manneau@gmail.com",
//   },
//   "soa.marcella@gmail.com": {
//     nom: "MARCELLA",
//     prenom: "Soa",
//     mail: "soa.marcella@gmail.com",
//   },
//   "dmartin@onsoft.fr": {
//     nom: "MARTIN",
//     prenom: "David",
//     mail: "dmartin@onsoft.fr",
//   },
//   "bbcr.mbaye@gmail.com": {
//     nom: "MBAYE",
//     prenom: "Babacar",
//     mail: "bbcr.mbaye@gmail.com",
//   },
//   "is.meheust@gmail.com": {
//     nom: "MEHEUST",
//     prenom: "Isabelle",
//     mail: "is.meheust@gmail.com",
//   },
//   "mehrez.salhi@yahoo.fr": {
//     nom: "MEHREZ",
//     prenom: "Mohamed",
//     mail: "mehrez.salhi@yahoo.fr",
//   },
//   "mellouljacky@hotmail.com": {
//     nom: "MELLOUL",
//     prenom: "Jacky",
//     mail: "mellouljacky@hotmail.com",
//   },
//   "fmetche@ajc-formation.fr": {
//     nom: "METCHELIAKOFF",
//     prenom: "Florine",
//     mail: "fmetche@ajc-formation.fr",
//   },
//   "mickael.metesreau@gmail.com": {
//     nom: "METESREAU",
//     prenom: "Mickaël",
//     mail: "mickael.metesreau@gmail.com",
//   },
//   "m.duc@lunanovel.com": {
//     nom: "MINH",
//     prenom: "Duc",
//     mail: "m.duc@lunanovel.com",
//   },
//   "pierrealexandre.monneau@gmail.com": {
//     nom: "MONNEAU",
//     prenom: "Pierre-Alexandre",
//     mail: "pierrealexandre.monneau@gmail.com",
//   },
//   "mmorin@ajc-formation.fr": {
//     nom: "MORIN",
//     prenom: "Manon",
//     mail: "mmorin@ajc-formation.fr",
//   },
//   "m.nassur@almteam-consulting.com": {
//     nom: "MHOUMADI",
//     prenom: "Nassur",
//     mail: "m.nassur@almteam-consulting.com",
//   },
//   "martin.mous@gmail.com": {
//     nom: "MUSWAMBA",
//     prenom: "Martin",
//     mail: "martin.mous@gmail.com",
//   },
//   "emilie.nahon@optical-center.com": {
//     nom: "NAYON",
//     prenom: "Emilie",
//     mail: "emilie.nahon@optical-center.com",
//   },
//   "na@na.na": {
//     nom: "NA",
//     prenom: "Na",
//     mail: "na@na.na",
//   },
//   "dnesic@ajc-formation.fr": {
//     nom: "NESIC",
//     prenom: "Dimitri",
//     mail: "dnesic@ajc-formation.fr",
//   },
//   "michel.nguyen.consultant@gmail.com": {
//     nom: "NGUYEN",
//     prenom: "Michel",
//     mail: "michel.nguyen.consultant@gmail.com",
//   },
//   "philippe.nguyenduc@nubytouch.com": {
//     nom: "NGUYEN",
//     prenom: "Philippe",
//     mail: "philippe.nguyenduc@nubytouch.com",
//   },
//   "frederic.noel@gmail.com": {
//     nom: "NOEL",
//     prenom: "Frédéric",
//     mail: "frederic.noel@gmail.com",
//   },
//   "toms.noel@gmail.com": {
//     nom: "NOEL",
//     prenom: "Thomas",
//     mail: "toms.noel@gmail.com",
//   },
//   "michael.obel@gmail.com": {
//     nom: "OBEL",
//     prenom: "Michaël",
//     mail: "michael.obel@gmail.com",
//   },
//   "souaknine@feeleurope.com": {
//     nom: "OUAKNINE",
//     prenom: "Samy",
//     mail: "souaknine@feeleurope.com",
//   },
//   "jeremy.perrouault@ascadis.fr": {
//     nom: "PERROUAULT",
//     prenom: "Jeremy",
//     mail: "jeremy.perrouault@ascadis.fr",
//   },
//   "tpetitpi@gmail.com": {
//     nom: "PETIT",
//     prenom: "Thomas",
//     mail: "tpetitpi@gmail.com",
//   },
//   "a.pitula@facemweb.com": {
//     nom: "PITULA",
//     prenom: "Antoine",
//     mail: "a.pitula@facemweb.com",
//   },
//   "romain.plantefeve@gmail.com": {
//     nom: "PLANTEFÈVE",
//     prenom: "Romain",
//     mail: "romain.plantefeve@gmail.com",
//   },
//   "pierre-nicolas@genessis.fr": {
//     nom: "PLEE",
//     prenom: "Pierre Nicolas",
//     mail: "pierre-nicolas@genessis.fr",
//   },
//   "lquenec@gmail.com": {
//     nom: "QUENEC HDU",
//     prenom: "Ludovic",
//     mail: "lquenec@gmail.com",
//   },
//   "raymond@razafimamonjy.fr": {
//     nom: "RAZAFIMAMONJY",
//     prenom: "Raymond",
//     mail: "raymond@razafimamonjy.fr",
//   },
//   "didier@razon.fr": {
//     nom: "RAZON",
//     prenom: "Didier",
//     mail: "didier@razon.fr",
//   },
//   "jrippinger@ajc-formation.fr": {
//     nom: "RIPPINGER",
//     prenom: "Julie",
//     mail: "jrippinger@ajc-formation.fr",
//   },
//   "glenux@glenux.net": {
//     nom: "ROLLAND",
//     prenom: "Glenn",
//     mail: "glenux@glenux.net",
//   },
//   "jacky.salmi@paranaconsulting.com": {
//     nom: "SALMI",
//     prenom: "Jacky",
//     mail: "jacky.salmi@paranaconsulting.com",
//   },
//   "seles83@gmail.com": {
//     nom: "SEGATO",
//     prenom: "Elena",
//     mail: "seles83@gmail.com",
//   },
//   "msellam@ajc-formation.fr": {
//     nom: "SELLAM",
//     prenom: "Maurice",
//     mail: "msellam@ajc-formation.fr",
//   },
//   "yacine.sikaddour@gmail.com": {
//     nom: "SIKADDOUR",
//     prenom: "Yacine",
//     mail: "yacine.sikaddour@gmail.com",
//   },
//   "nilani.siva@hotmail.fr": {
//     nom: "SIVA",
//     prenom: "Nilani",
//     mail: "nilani.siva@hotmail.fr",
//   },
//   "psmadja@aws-formation.fr": {
//     nom: "SMADJA",
//     prenom: "Patrick",
//     mail: "psmadja@aws-formation.fr",
//   },
//   "soaformation@hotmail.fr": {
//     nom: "SOA",
//     prenom: "Marcella",
//     mail: "soaformation@hotmail.fr",
//   },
//   "spanneut.herve@gmail.com": {
//     nom: "SPANNEUT",
//     prenom: "Hervé",
//     mail: "spanneut.herve@gmail.com",
//   },
//   "m.stroobant@ajc-ingenierie.fr": {
//     nom: "STROOBANT",
//     prenom: "Marine",
//     mail: "m.stroobant@ajc-ingenierie.fr",
//   },
//   "e.sultan@ajc-ingenierie.fr": {
//     nom: "SULTAN",
//     prenom: "Eric",
//     mail: "e.sultan@ajc-ingenierie.fr",
//   },
//   "mohammed.tahabelbattach@gmail.com": {
//     nom: "TAHA BELBATTACH",
//     prenom: "Mohammed",
//     mail: "mohammed.tahabelbattach@gmail.com",
//   },
//   "richard.tobert@gmail.com": {
//     nom: "TOBERT",
//     prenom: "Richard",
//     mail: "richard.tobert@gmail.com",
//   },
//   "mtouitou.pro@gmail.com": {
//     nom: "TOUITOU",
//     prenom: "Michaël",
//     mail: "mtouitou.pro@gmail.com",
//   },
//   "jonathan.turpin@hotmail.com": {
//     nom: "TURPIN",
//     prenom: "Jonathan",
//     mail: "jonathan.turpin@hotmail.com",
//   },
//   "k.uzan@ajc-ingenierie.fr": {
//     nom: "UZAN",
//     prenom: "Kelly",
//     mail: "k.uzan@ajc-ingenierie.fr",
//   },
//   "guillaume@semifir.com": {
//     nom: "VASSEUR",
//     prenom: "Guillaume",
//     mail: "guillaume@semifir.com",
//   },
//   "viatorm@yahoo.fr": {
//     nom: "VIATOR",
//     prenom: "Marie Christine",
//     mail: "viatorm@yahoo.fr",
//   },
//   "contact@aconsk.com": {
//     nom: "VITAL",
//     prenom: "Victor",
//     mail: "contact@aconsk.com",
//   },
//   "avossough@semifir.com": {
//     nom: "VOSSOUGH",
//     prenom: "Adrien",
//     mail: "avossough@semifir.com",
//   },
//   "bernard.wanfat@gmail.com": {
//     nom: "WAN FAT",
//     prenom: "Bernard",
//     mail: "bernard.wanfat@gmail.com",
//   },
//   "d.widawski@ajc-ingenierie.fr": {
//     nom: "WIDAWSKI",
//     prenom: "Diane",
//     mail: "d.widawski@ajc-ingenierie.fr",
//   },
//   "j.zanarelli@ajc-ingenierie.fr": {
//     nom: "ZANARELLI",
//     prenom: "Johanna",
//     mail: "j.zanarelli@ajc-ingenierie.fr",
//   },
//   "h.zinsou@laposte.net": {
//     nom: "ZINSOU",
//     prenom: "Hospice",
//     mail: "h.zinsou@laposte.net",
//   },
// };

const MISSING_FORMATEUR = "na@na.na";

export const isFormateurMissing = (mod) => {
  return mod.formateur.mail == MISSING_FORMATEUR;
};
