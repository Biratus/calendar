export function isPut({ method }) {
  return method === "PUT";
}
export function isGet({ method }) {
  return method === "GET";
}
export function isPost({ method }) {
  return method === "POST";
}
export function isDelete({ method }) {
  return method === "DELETE";
}

export function ok(res, object) {
  return res.status(200).json(object);
}

export function created(res, object) {
  return res.status(201).json(object);
}

export function notFound(res, message) {
  if (message)
    return res
      .status(404)
      .json({ message: `L'entité n'a pas pu être récupérer : [${message}]` });
  else res.status(404).send({});
}

export function serverError(res, message) {
  return res
    .status(500)
    .json({ message: `Une erreur est survenu durant [${message}]` });
}

export function requestError(res, message) {
  return res.status(400).json({ message });
}

export function parseBool(value) {
  return value === "true";
}
