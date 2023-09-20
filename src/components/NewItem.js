import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';

export default function NewItem({ name, price, isSelected, onSelect, isAssigned }) {

    const containerStyle = isSelected ? styles.selectedItemContainer : styles.itemContainer;
    const textStyle = styles.itemText;
  
    // Function to handle item selection and assignment
    const handlePress = () => {
        if (onSelect) {
            onSelect(name);
        }
    };
  
    return (
        <View>
            <Pressable style={containerStyle} onPress={handlePress}>
                <Text style={textStyle}>{name}</Text>
                <Text style={textStyle}>${price}</Text>
            </Pressable>
            {isAssigned && <Text style={styles.assignedText}>Assigned</Text>}
        </View>
    );
  }
  
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    selectedItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#ff5c1c',
        marginBottom: 1,
    },
    itemPressable: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: 'white',
    },
    assignedText: {
        color: '#ff5c1c', // Change color for assigned items
        fontSize: 12,
        fontFamily: 'Avenir',
    },
});