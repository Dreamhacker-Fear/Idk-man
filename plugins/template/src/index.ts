import { metro } from "@vendetta/metro/common";
import { after } from "@vendetta/patcher";

let unpatch: (() => void) | null = null;

export default {
    onLoad() {
        const Composer = metro.findByName("ChannelTextArea");

        if (!Composer) return;

        unpatch = after(
            "default",
            Composer,
            (_args: any[], result: any) => {
                if (!result?.props) return result;

                const oldOnChange = result.props.onChange;

                if (!oldOnChange) return result;

                result.props.onChange = (text: string) => {
                    if (
                        typeof text === "string" &&
                        text.length > 0 &&
                        !text.startsWith(">>> ")
                    ) {
                        text = `>>> ${text}`;
                    }

                    oldOnChange(text);
                };

                return result;
            }
        );
    },

    onUnload() {
        unpatch?.();
        unpatch = null;
    },
};
