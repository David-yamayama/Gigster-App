import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Step1 from './Step1';
import Step2 from './Step2';
import { useSelector } from 'react-redux';




const ProgressStepsComponent = () => {
    const stepper = useSelector(state => state.stepper.value)


    return (
        <View style={styles.mainSelect}>
            {!stepper.nextPage ? <Step1 /> : <Step2 />}

        </View>
    );
};

const styles = StyleSheet.create({

    mainSelect: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginHorizontal: 5,
        marginTop: 10

    },
    input: {
        backgroundColor: 'white',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        marginTop: 5
    },
    btn: {
        backgroundColor: '#5100FF',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 8,
        marginTop: 20,
        position: 'absolute'


    },
    stepCont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'red'

    }
});

export default ProgressStepsComponent;


