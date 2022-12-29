import axios from "axios";

export async function switchFormateur(newModule) {
  try {
    const response = await axios.put("/api/modules", newModule);
    return true;
  } catch (e) {
    return false;
  }
}

export async function splitModule({ split, formateurs }) {
  try {
    await axios.put("/api/modules/" + hoverProps.module.id, {
      split,
      formateurs: formateurs.map((f) => {
        return { mail: f.id };
      }),
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function fetchMods() {
  const modResp = await axios.get("/api/modules");
  return modResp.data;
}