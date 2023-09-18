import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewPerson({ name }) {
    return (
        <View style={{width: 65, height: 80, paddingVertical: 10}}>
            <View style={styles.personBox}>
                <Text style={styles.boxText}>{name}</Text>
            </View>
            <View style={{ borderBottomColor: '#ff5c1c', 
                            borderBottomWidth: 3,
                            width: '100%',
                            paddingTop: 10, }}/>
        </View>
        
    )
};

const styles = StyleSheet.create({
    personBox: {
        width: 65,
        height: 65,
        backgroundColor: '#ff5c1c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Avenir',
    }
    
});