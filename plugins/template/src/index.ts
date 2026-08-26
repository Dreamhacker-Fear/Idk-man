import { logger } from "@vendetta";

export default {
    onLoad() {
        logger.log("Auto Quote loaded");
    },

    onUnload() {
        logger.log("Auto Quote unloaded");
    },
};
