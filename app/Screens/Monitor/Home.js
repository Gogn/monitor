import React from 'react';
import {Text, View} from 'react-native';
import {db} from '../../firebase';
import 'firebase/firestore';
import * as firebase from "firebase";

const createUser = () => {
  db.collection('users')
    .doc('123123asd')
    .set({
      created: firebase.firestore.Timestamp.fromDate(new Date()),
      email: 'qwe@qwe.qwe',
      lastLogin: firebase.firestore.Timestamp.fromDate(new Date()),
      name: 'qwe',
      password: '2132weqwadead2334'
    })
    .then(() => console.log("Document successfully written!"))
}

const createData = () => {
  db.collection('data')
    .doc('123123asd')
    .set({
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      mood: 5,
      drugs: ['asd', 'tyu', 'oiu']
    })
    .then(() => console.log("Document successfully written!"))
}

const dataOfUser = () => {
  let user = () => {
    db.collection('data')
      .where('mood', '==', 6)
      .get().then(function (s) {
      s.forEach(function (d) {
        console.log(d.data())
      })
    })
  }
  {
    user()
  }
}

export const Home = () =>
  <View>
    {/*{dataOfUser()}*/}
    <Text>
      Edit App.js to change this screen and turn it
      into your app.
    </Text>
  </View>
