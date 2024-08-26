import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStep } from '../StepProvider';
// TODO: Add horizontal view
export function StepHeaderView({ position, title, subTitle, allowTapOnTitle, onTitleTap }) {
    const { jumpToStep } = useStep();
    return (React.createElement(View, { style: styles.container },
        React.createElement(Text, { style: styles.title, onPress: () => {
                if (allowTapOnTitle && jumpToStep) {
                    onTitleTap && onTitleTap();
                    jumpToStep(position);
                }
            } }, title),
        subTitle && (React.createElement(Text, { onPress: () => {
                allowTapOnTitle && jumpToStep && jumpToStep(position);
            }, style: styles.subTitle }, subTitle))));
}
const styles = StyleSheet.create({
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