import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import NewItem from '../components/NewItem';
import NewPerson from '../components/NewPerson';
import { ScrollView } from 'react-native-web';

export default function CreateBill() {
    const [modalVisible, setModalVisible] = useState(false);    
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0.0);
    const [data, setData ] = useState([]); 

    const saveItem = () => {
        setModalVisible(!modalVisible);
        if (itemName && itemPrice) {
            const newDish = { id: Date.now().toString(), name: itemName, price: itemPrice };
            setData((prevData) => [...prevData, newDish]);
            setItemName('');
            setItemPrice('');
        }
    };

    const cancelItem = () => {
        setModalVisible(!modalVisible)
        setItemName('');
        setItemPrice('');
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 100 }}>
            <Text style={styles.sharecode}>Share Code: </Text>
            <Modal
                animationType='none'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 180 }}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.textInputed}
                            onChangeText={setItemName}
                            value={itemName}
                            placeholder="Name"
                            keyboardType='default'
                            selectionColor='orange'/>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.dollarSign}>$</Text>
                            <TextInput
                                style={styles.textInputed}
                                onChangeText={setItemPrice}
                                value={itemPrice}
                                placeholder='0.00'
                                keyboardType='decimal-pad'
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                            <Pressable onPress={cancelItem}
                                style={styles.buttons}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={styles.buttons}
                                onPress={saveItem}>
                                <Text style={styles.buttonText}>Save</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                </View>
            </Modal>
            
            <View style={{ width:'85%', paddingVertical: 20 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <NewItem name={item.name} price={item.price}></NewItem>
                        )}
                    />
                
            </View>  
            <Pressable 
                onPress={() => {
                    setModalVisible(true); 

                }}>
                <Text style={styles.additem}>+Add an item</Text>
            </Pressable>
            <View style={{ borderBottomColor: 'black', 
                            borderBottomWidth: 1,
                            width: '85%'}}/>
            <NewPerson name="Em"/>
        </View>
    )
}

const styles = StyleSheet.create({
    sharecode: {
        fontSize: 25,
        fontFamily: 'Avenir',
        paddingBottom: 10,
    },
    additem: {
        fontSize: 20,
        fontFamily: 'Avenir',
        paddingVertical: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'gray',
        borderRadius: 0,
        padding: 15,
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '75%',
    },
    textInputed: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: 'white',
        paddingVertical: 10,
    },
    dollarSign: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: 'white',
        margin: 0,
        paddingVertical: 10,
    },
    buttons: {
        color: 'white',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Avenir',
    }
  });
