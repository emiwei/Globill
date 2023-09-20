import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomHeader() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: '#2d2d2e'}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.headers}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('NextScreen')}>
            <Text style={styles.headers}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ borderBottomColor: 'white',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    width: '90%'}}/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headers: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: 'white',
  }
})
