import React from 'react';
import {Text, View} from 'react-native';
import {db} from '../../firebase';

db.collection('users').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
})

export const Home = () =>
  <View>
    <Text>
      Edit App.js to change this screen and turn it
      into your app.
    </Text>
  </View>
