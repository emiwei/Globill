import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, TextInput, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import NewItem from '../components/NewItem';
import NewPerson from '../components/NewPerson';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
// import { firebase } from '../../firebase';

export default function CreateBill() {
    const [modalVisible, setModalVisible] = useState(false);
    const [firstModal, setFirstModal] = useState(false);
    const [userModal, setUserModal] = useState(false);    
    const [currItemName, setCurrItemName] = useState('');
    const [currItemPrice, setCurrItemPrice] = useState(0.0);
    const [data, setData ] = useState([]); 
    const [userItemsMap, setUserItemsMap] = useState(new Map());
    const [selectedUser, setSelectedUser] = useState(null);

    const navigation = useNavigation();
    

    // const db = firebase.database().ref();

    // ensure at least one person is added when bill is first created
    useEffect(() => {
        setFirstModal(true);
    }, []);

    const goToSummaryPage = () => {
        navigation.navigate('Summary', { data, userItemsMap });
    }

    const saveItem = () => {
        setModalVisible(!modalVisible);
        if (currItemName && currItemPrice) {
            let newDish = { id: Date.now().toString(), name: currItemName, price: currItemPrice, assignedTo: null };
            setData((prevData) => [...prevData, newDish]);
            setCurrItemName('');
            setCurrItemPrice(0.0);
        }
    };

    const assignItem = (itemName) => {
        if (selectedUser && itemName) {
            const assignedItems = userItemsMap.get(selectedUser) || [];
            const itemIndex = data.findIndex((item) => item.name === itemName);
      
            if (itemIndex !== -1) {
              // Update the assignedTo property of the item
              const isAssigned = assignedItems.includes(itemName);

              if (isAssigned) {
                    const updatedAssignedItems = assignedItems.filter((item) => item !== itemName);
                    setUserItemsMap(new Map(userItemsMap.set(selectedUser, updatedAssignedItems)));
              }
              else {
                    const updatedItem = { ...data[itemIndex], assignedTo: selectedUser };
                    const updatedData = [...data];
                    updatedData[itemIndex] = updatedItem;
                    setData(updatedData);
            
                    // Update the mapping between users and items
                    assignedItems.push(itemName);
                    setUserItemsMap(new Map(userItemsMap.set(selectedUser, assignedItems)));
              }
              
            }
        }
    }

    const cancelItem = () => {
        setModalVisible(!modalVisible);
        setCurrItemName('');
        setCurrItemPrice('');
    }

    const cancelPerson = () => {
        setUserModal(!userModal);
    }

    const goBack = () => {
        setFirstModal(!firstModal);
        navigation.goBack();
    }


    const addFirstUser = () => {
        setFirstModal(!firstModal);
        setUserItemsMap(new Map(userItemsMap.set(selectedUser, [])));
        setSelectedUser(selectedUser);
    }
    const addUser = () => {
        // need to error check to ensure no repeated user names
        if (selectedUser && !userItemsMap.has(selectedUser)) {
            setUserModal(!userModal);
            // Initialize userItemsMap with an empty array for the selected user
            setUserItemsMap(new Map(userItemsMap.set(selectedUser, [])));
        } 
        else {
            // Handle error when user already exists
            console.log('User already exists');
        }
    };

    const handleUserSelect = (user) => {
        // Handle user selection
        setSelectedUser(user);
      };

    const handleItemSelect = (item) => {
    // Handle item selection (toggle)
        if (selectedUser) {
            const isSelected = data.some((d) => d.name === item && d.assignedTo === selectedUser);
            if (isSelected) {
            // If the item is already assigned to the user, unassign it
            setData((prevData) => prevData.filter((d) => !(d.name === item && d.assignedTo === selectedUser)));
            } else {
            // Assign the item to the user
            const newItem = { id: Date.now().toString(), name: item, price: 0, assignedTo: selectedUser };
            setData((prevData) => [...prevData, newItem]);
            }
        }
      };

    return (
        <ScreenWrapper>
            <SafeAreaView style={styles.container}>
                {(modalVisible || firstModal || userModal) && (
                    <View style={styles.overlay}/>
                )}
                {/* First modal that pops up to ensure that there is at least one user */}
                <Modal
                    animationType='none'
                    visible={firstModal}
                    transparent={true}
                    onRequestClose={() => setFirstModal(false)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 180 }}>
                        <View style={styles.modalView}>
                            <Text style={{ fontFamily: 'Avenir', fontSize: 20, color: 'white', textAlign: 'center' }}>Enter a nickname for yourself first.</Text>
                            <TextInput
                                style={styles.textInputed}
                                onChangeText={setSelectedUser}
                                value={selectedUser}
                                placeholder="Nickname"
                                keyboardType='default'
                                selectionColor='orange'/>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                                <Pressable onPress={goBack}
                                    style={styles.buttons}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.buttons}
                                    onPress={addFirstUser}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </Pressable>
                            </View>
            
                        </View>
                    </View>
                </Modal>
                {/** Modal for adding new additional users */}
                <Modal
                    animationType='none'
                    visible={userModal}
                    transparent={true}
                    onRequestClose={() => setUserModal(false)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 180 }}>
                        <View style={styles.modalView}>
                            <Text style={{ fontFamily: 'Avenir', fontSize: 20, color: 'white', textAlign: 'center' }}>Add Person</Text>
                            <TextInput
                                style={styles.textInputed}
                                onChangeText={setSelectedUser}
                                value={selectedUser}
                                placeholder="Nickname"
                                keyboardType='default'
                                selectionColor='orange'/>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                                <Pressable onPress={cancelPerson}
                                    style={styles.buttons}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.buttons}
                                    onPress={addUser}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </Pressable>
                            </View>
            
                        </View>
                    </View>
                </Modal>
                {/** Modal for adding new items */}
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
                                onChangeText={setCurrItemName}
                                value={currItemName}
                                placeholder="Name"
                                keyboardType='default'
                                selectionColor='orange'/>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.dollarSign}>$</Text>
                                <TextInput
                                    style={styles.textInputed}
                                    onChangeText={setCurrItemPrice}
                                    value={currItemPrice}
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
                <View style={{ height: '80%'}}>
                    <ScrollView indicatorStyle={{ width: '100%', paddingVertical: 20 }}>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => (
                                    <NewItem name={item.name} 
                                             price={item.price}
                                             isSelected={selectedUser && userItemsMap.get(selectedUser)?.includes(item.name)}
                                             onSelect={() => assignItem(item.name)}
                                        
                                    />
                                )}
                            />
                            <Pressable
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    setModalVisible(true);
                                }}>
                                <Text style={styles.additem}>+Add an item</Text>
                            </Pressable>
                    </ScrollView>
                </View>
            
            
                <View style={{ borderBottomColor: 'white',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                width: '85%',}}/>
                <View style={{width: '100%', height: '25%'}}>
                    <ScrollView
                        style={{paddingTop: 15, marginStart: 10,}}
                        horizontal={true}
                        alwaysBounceHorizontal={true}>
                        {[...userItemsMap.keys()].map((user) => (
                            <NewPerson
                                key={user}
                                name={user}
                                isSelected={ user == selectedUser }
                                onSelect={handleUserSelect}
                            />
                        ))}
                        {/* <FlatList
                            data={[...users.keys()]} // Pass the user names array here
                            keyExtractor={(user) => user}
                            horizontal={true}
                            renderItem={({ item: user }) => (
                                <View style={{ alignContent: 'center'}}>
                                <NewPerson style={{backgroundColor: '#ff5c1c' }} name={user} />
                                </View>
                            )}
                        /> */}

                        <View style={styles.addUser}>
                            <Pressable
                                onPress={() => {setUserModal(true);}}
                                >
                                <Text style={styles.boxText}>+Add</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
                
            </SafeAreaView>
        </ScreenWrapper>
        
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        paddingTop: 100,
    },
    sharecode: {
        fontSize: 25,
        fontFamily: 'Avenir',
        paddingBottom: 10,
        color: 'white'
    },
    additem: {
        fontSize: 20,
        fontFamily: 'Avenir',
        paddingVertical: 20,
        color: 'white',
        fontWeight: '100',
        opacity: 0.6,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#2d2d2e',
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
    },
    boxText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Avenir',
    },
    addUser: {
        width: 65, 
        height: 65, 
        borderColor: 'white', 
        borderWidth: StyleSheet.hairlineWidth, 
        borderStyle: 'dashed', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 7,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        zIndex: 0.5, // Ensure the overlay is above other elements
    }
  });
