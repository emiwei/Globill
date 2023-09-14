import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateBill from './src/pages/CreateBill';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 20, paddingTop: 110 }}>
      <Pressable onPress={() => navigation.navigate('CreateBill')}>
        <Text style={styles.categories}>New Bill</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('JoinBill')}>
        <Text style={styles.categories}>Join Bill</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('MyBills')}>
        <Text style={styles.categories}>My Bills</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('LogIn')}>
        <Text style={styles.categories}>Log In/Sign Up</Text>
      </Pressable>
    </View>
  );
}


function JoinBill() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Join an existing bill</Text>
    </View>
  );
}

function MyBill() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Previous bills</Text>
    </View>
  );
}

function LogIn() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Log in or create an account</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#363738', }
        }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="CreateBill" component={CreateBill} />
        <Stack.Screen name="JoinBill" component={JoinBill} />
        <Stack.Screen name="MyBills" component={MyBill} />
        <Stack.Screen name="LogIn" component={LogIn} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  categories: {
    fontSize: 37,
    paddingBottom: 40,
    fontFamily: 'Avenir'
  }
});
