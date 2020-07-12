const firebase = require('firebase')
const firestore = require ('firebase/firestore')

const firebaseConfig = {
};
const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();

let a = []
function query() {
  // return async dispatch => {
    return db.collection('data')//.doc('123123asd')
      .get().then( (doc) => {
        doc.forEach(doc => {
          a.push(doc.data())
          console.log('a: ',a)
          // return doc.data()
          // console.log(doc.data())
        })
      })
  // }
}

// query().then((d) => {console.log(d)})
// let b
// async function f () {
//   b = await query()
//   console.log(b)
// }
//
// f().then(console.log('asdasd',b))

query()
