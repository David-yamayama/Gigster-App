import { View, Text, StyleSheet } from 'react-native';
import { StepHeaderView } from './StepHeaderView';
import React, { useState } from 'react';
import { useStep } from '../StepProvider';
import { ActionButton } from './ActionButton';
import { lineColor } from '../constants';
// view for horizontal stepper
export function StepView({ position = 0, title, subTitle, children, onNext, onPrevious, nextButtonText = 'Next', previousButtonText = 'Back', allowTapOnTitle, onTitleTap, }) {
    const { activeStep, stepCount, jumpStep, themeColor } = useStep();
    if (onNext === undefined)
        onNext = () => Promise.resolve(true);
    // undefined when tap on title is not allowd
    if (onPrevious === undefined && position !== 0 && !allowTapOnTitle)
        onPrevious = () => Promise.resolve(true);
    if (position === 0)
        onPrevious = undefined;
    const [err, setErr] = useState(undefined);
    const onNextPressed = async () => {
        // start loading screen
        const isValid = onNext && (await onNext());
        console.log('jumbing.. ', isValid);
        if (isValid === true) {
            setErr(undefined);
            jumpStep && jumpStep('up');
        }
        else {
            if (typeof isValid === 'string')
                setErr(isValid);
        }
        // end loading screen
    };
    const onPreviousPressed = async () => {
        // start loading screen
        const isValid = onPrevious && (await onPrevious());
        if (isValid === true) {
            setErr(undefined);
            console.log('jumping down');
            jumpStep && jumpStep('down');
        }
        else {
            if (typeof isValid === 'string')
                setErr(isValid);
        }
        // end loading screen
    };
    return (React.createElement(View, { style: styles.container },
        React.createElement(View, { style: styles.indexRow },
            React.createElement(View, { style: { ...styles.stepperCircle, backgroundColor: position <= activeStep ? themeColor : lineColor } },
                React.createElement(Text, { style: styles.stepperCircleText }, position + 1)),
            position < stepCount - 1 && React.createElement(View, { style: styles.connectingLine })),
        React.createElement(View, { style: styles.contentRow },
            React.createElement(StepHeaderView, { allowTapOnTitle: allowTapOnTitle || false, onTitleTap: onTitleTap, title: title, subTitle: subTitle, position: position }),
            React.createElement(View, { style: styles.contentView },
                err && React.createElement(Text, { style: { color: 'red' } }, `Error: ${err}`),
                position === activeStep && (React.createElement(React.Fragment, null,
                    React.createElement(View, { style: styles.contentChildren }, children),
                    React.createElement(View, { style: styles.buttonRow },
                        React.createElement(ActionButton, { title: previousButtonText, color: themeColor, onPress: onPreviousPressed, hidden: onPrevious === undefined }),
                        React.createElement(ActionButton, { title: nextButtonText, color: themeColor, onPress: onNextPressed, hidden: onNext === undefined }))))))));
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    indexRow: {},
    connectingLine: {
        flexGrow: 1,
        width: 1,
        backgroundColor: lineColor,
        alignSelf: 'center',
        margin: 4,
    },
    contentRow: {
        paddingBottom: 16,
        flexShrink: 1,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    contentView: {
        padding: 4,
    },
    contentChildren: {},
    stepperCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        margin: 4,
    },
    stepperCircleText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        paddingVertical: 16,
    },
});
//# sourceMappingURL=StepView.js.map