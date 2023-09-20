import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewPerson({ name, isSelected, onSelect }) {

    // Apply styles based on whether the user is selected
    const containerStyle = isSelected ? styles.selectedPersonContainer : styles.personContainer;
    const boxStyle = isSelected ? styles.selectedPersonBox : styles.personBox;
    const textStyle = isSelected ? styles.selectedBoxText : styles.boxText;

    // Handle user selection when pressed
    const handlePress = () => {
        onSelect(name); // Callback to handle user selection
    };

    return (
        <View style={[containerStyle, { width: 65, height: 80, marginHorizontal: 7 }]}>
            <Pressable style={boxStyle} onPress={handlePress}>
                <Text style={textStyle}>{name}</Text>
            </Pressable>
            {isSelected && (
                <View
                    style={{
                        borderBottomColor: '#ff5c1c',
                        borderBottomWidth: 3,
                        width: '100%',
                        paddingTop: 10,
                    }}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    // Styles for unselected user
    personContainer: {
        width: 65,
        height: 80,
        marginHorizontal: 7,
    },
    personBox: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
    },
    boxText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Avenir',
    },

    // Styles for selected user
    selectedPersonContainer: {
        width: 65,
        height: 80,
        marginHorizontal: 7,
    },
    selectedPersonBox: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff5c1c',
    },
    selectedBoxText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Avenir',
    },
});