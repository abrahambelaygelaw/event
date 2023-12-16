import queryString from "query-string";
export const makeQueryString = (obj) => {
  const query = queryString.stringify(obj, { skipEmptyString: true });
  return query;
};
