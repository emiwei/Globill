import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewPerson({ name }) {

    const [selected, setSelected] = useState(false);

    return (
        <View style={{width: 65, height: 80, marginHorizontal: 7,}}>
            <Pressable style={selected ? styles.selectedBox : styles.personBox}
                onPress={() => setSelected(true)}>
                <Text style={styles.boxText}>{name}</Text>
            </Pressable>
            { selected && (
                <View style={{ borderBottomColor: '#ff5c1c', 
                            borderBottomWidth: 3,
                            width: '100%',
                            paddingTop: 10, }}/>)
            }
        </View>
        
    )
};

const styles = StyleSheet.create({
    personBox: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
    },
    selectedBox: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff5c1c',
    },
    boxText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Avenir',
    }
    
});