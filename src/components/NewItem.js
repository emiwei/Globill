import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function NewItem({ name, price }) {
    return (
        <View style={styles.line}>
            <Text style={styles.listText}>{name}</Text>
            <Text style={styles.listText}>${price}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    listText:  {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: 'white',
    }
});