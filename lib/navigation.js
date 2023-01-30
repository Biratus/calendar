// Front
export const toGetParams = (params) =>
  "?" + new URLSearchParams(params).toString();

export const searchParamsClone = (params) => {
  let newParams = new URLSearchParams();
  for (let key of params.keys()) {
    newParams.set(key, params.get(key));
  }
  return newParams;
};

export const changeURLParam = ({ params: originalParams, path, newParams }) => {
  let params = searchParamsClone(originalParams);

  for (let k in newParams) {
    if (newParams[k] === undefined) params.delete(k);
    else params.set(k, newParams[k]);
  }

  return `${path}?${params.toString()}`;
};
