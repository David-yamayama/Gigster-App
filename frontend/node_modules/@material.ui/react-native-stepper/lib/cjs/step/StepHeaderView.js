"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepHeaderView = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const StepProvider_1 = require("../StepProvider");
// TODO: Add horizontal view
function StepHeaderView({ position, title, subTitle, allowTapOnTitle, onTitleTap }) {
    const { jumpToStep } = StepProvider_1.useStep();
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_1.Text, { style: styles.title, onPress: () => {
                if (allowTapOnTitle && jumpToStep) {
                    onTitleTap && onTitleTap();
                    jumpToStep(position);
                }
            } }, title),
        subTitle && (react_1.default.createElement(react_native_1.Text, { onPress: () => {
                allowTapOnTitle && jumpToStep && jumpToStep(position);
            }, style: styles.subTitle }, subTitle))));
}
exports.StepHeaderView = StepHeaderView;
const styles = react_native_1.StyleSheet.create({
    container: {
        padding: 4,
        flexDirection: 'column',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
    },
    subTitle: {
        fontSize: 12,
    },
});
//# sourceMappingURL=StepHeaderView.js.map