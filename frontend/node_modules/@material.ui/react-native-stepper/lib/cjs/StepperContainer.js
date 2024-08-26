"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepperContainer = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const StepProvider_1 = require("./StepProvider");
function StepperContainer({ themeColor = '#2196F3', layout = 'vertical', submitButtonText = 'Submit', contentViewStyle = {}, allowTapOnTitle = false, children, }) {
    return (react_1.default.createElement(react_native_1.ScrollView, { style: { ...styles.container, ...contentViewStyle } }, layout === 'vertical' ? (react_1.default.createElement(StepProvider_1.StepProvider, { themeColor: themeColor, submitButtonText: submitButtonText, allowTapOnTitle: allowTapOnTitle }, children)) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_native_1.Text, null, "Horizontal steppers not yet supported, please use layout=\"vertical\"")))));
}
exports.StepperContainer = StepperContainer;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
});
//# sourceMappingURL=StepperContainer.js.map