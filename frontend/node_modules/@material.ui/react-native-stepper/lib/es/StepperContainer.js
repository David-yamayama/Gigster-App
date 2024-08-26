import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { StepProvider } from './StepProvider';
export function StepperContainer({ themeColor = '#2196F3', layout = 'vertical', submitButtonText = 'Submit', contentViewStyle = {}, allowTapOnTitle = false, children, }) {
    return (React.createElement(ScrollView, { style: { ...styles.container, ...contentViewStyle } }, layout === 'vertical' ? (React.createElement(StepProvider, { themeColor: themeColor, submitButtonText: submitButtonText, allowTapOnTitle: allowTapOnTitle }, children)) : (React.createElement(React.Fragment, null,
        React.createElement(Text, null, "Horizontal steppers not yet supported, please use layout=\"vertical\"")))));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
//# sourceMappingURL=StepperContainer.js.map