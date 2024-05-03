import formatJsonFile from '../utils/formatJsonFile.js';
import { createTefeJson, checkTefeJson, TEFE_CONFIG, } from '../utils/tefe.config.json.utils.js';
export const config = (options, _command) => {
    if (options.init) {
        createTefeJson();
        console.info(`${TEFE_CONFIG} created.`);
    }
    else {
        checkTefeJson();
        console.info(formatJsonFile(TEFE_CONFIG));
    }
};
//# sourceMappingURL=config.js.map