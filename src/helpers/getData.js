import axios from "axios";
import config from "./conf";

export const getData = async () => {
  const { data } = await axios(config.uri + config.endpoint);
  return data
};
export const getDataWidthId = async (id) => {
  return await axios.post(config.uri + config.endpoint + `/${id}`, {});
};
