import axios from "axios";
import config from "./conf";
const deleteDataWidthId = async (id) => {
  return await axios.delete(config.uri + config.endpoint + `/${id}`);
};

export default deleteDataWidthId;
