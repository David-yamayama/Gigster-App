import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Platform, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function AnnounceCardSearch(props) {
    return (
        <View style={styles.recoCardSearch}>
            <View style={styles.recoImage}>
                <Image style={styles.recoImg} source={props.image} />
            </View>
            <View style={styles.recoDesc}>
                <View style={styles.descContainer}>
                    <Text style={styles.recoTitle}>{props.title}</Text>
                    <Text style={styles.recoPlace}>{props.location}</Text>
                    <Text style={styles.recoDate}>{props.availability}</Text>
                </View>
                <View style={styles.recoNote}>
                    <FontAwesome name='star' size={30} color={'#d4a60f'} />
                    <Text style={styles.recoPlace}>{props.note}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    recoCardSearch: {
        width: '90%',
        height: 250,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
    },
    recoImage: {
        width: '100%',
        height: '70%',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 6,
        borderBottomWidth: 1,
        overflow: 'hidden'
    },
    recoImg: {
        width: '105%',
        height: '105%',
    },
    recoDesc: {
        width: '100%',
        height: '30%',
        backgroundColor: 'white',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15,
    },
    descContainer: {
        height: '100%',
        justifyContent: 'center'
    },
    recoTitle: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    recoPlace: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    recoNote: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    recoDate: {
        fontSize: 11
    },
});

export default AnnounceCardSearch