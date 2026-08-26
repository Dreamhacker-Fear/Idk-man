import { metro } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";

let unpatch: (() => void) | null = null;

export default {
    onLoad() {
        const MessageActions = metro.findByProps("sendMessage");

        if (!MessageActions) return;

        unpatch = before(
            "sendMessage",
            MessageActions,
            (args: any[]) => {
                for (const arg of args) {
                    if (
                        arg &&
                        typeof arg === "object" &&
                        typeof arg.content === "string" &&
                        arg.content.length > 0
                    ) {
                        if (!arg.content.startsWith(">>>")) {
                            arg.content = `>>> ${arg.content}`;
                        }
                        break;
                    }
                }
            }
        );
    },

    onUnload() {
        unpatch?.();
        unpatch = null;
    },
};
