import axios from "axios";
import config from "./conf";
export const putData = async (content) => {
  return await axios.put(
    config.uri + config.endpoint + `/${content.id}`,
    content
  );
};
