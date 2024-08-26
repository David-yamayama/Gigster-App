import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
const hideStyle = {
    width: 0,
    paddingHorizontal: 0,
};
export const ActionButton = ({ hidden = false, style = {}, color = '#9F9F9F', title, onPress }) => {
    const [loading, setLoading] = useState(false);
    // onPress
    const onPressAction = async () => {
        setLoading(true);
        await onPress();
        setLoading(false);
    };
    // occupy space but hide.
    const defaultStyle = {
        backgroundColor: color,
        color: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginRight: 16,
    };
    const hide = hidden
        ? {
            width: 0,
            paddingHorizontal: 0,
        }
        : {};
    return hidden ? null : (React.createElement(TouchableOpacity, { style: { ...defaultStyle, ...style, ...hide }, disabled: hidden || loading, onPress: onPressAction }, loading ? (React.createElement(ActivityIndicator, { size: 'small', color: '#ffffff', style: { paddingRight: 8 } })) : (React.createElement(Text, { style: { color: style.color || defaultStyle.color } }, title))));
};
//# sourceMappingURL=ActionButton.js.map