import axios from "axios";
import config from "./conf";
export const postData = async (data) => {
  await axios.post(config.uri + config.endpoint, { content: data });
};
