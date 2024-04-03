import formatJsonFile from "./utils/formatJsonFile.js";
import {
  createTefeJson,
  checkTefeJson,
  TEFE_CONFIG,
} from "./utils/tefe.config.json.utils.js";

const config = ({ logger, args, options }) => {
  if (options.init) {
    createTefeJson();
    logger.info(`${TEFE_CONFIG} created.`);
  } else {
    checkTefeJson();
    logger.info(formatJsonFile(TEFE_CONFIG));
  }
};

export default config;
