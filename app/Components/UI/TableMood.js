import React, {useState} from 'react';
import {AsyncStorage, ScrollView, StyleSheet, View} from 'react-native';
import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';
import {db} from "../../firebase";

export const TableMood = ({data}) => {

  const dataArr = data.map(d => [d.mood, d.energy, d.anxiety, d.caution, d.memory, d.anger, d.sleep])
  const dataDaysArr = data.map(d => [('0' + d.date.getDate()).slice(-2) + '/' + ('0' + (d.date.getMonth() + 1)).slice(-2) + '/' + (d.date.getFullYear())])
  dataDaysArr.unshift('')

    function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
      return a.map(function(r) { return r[c]; });
    });
  }

  const dataArrTranspose = transpose(dataArr)

  const [state, setState] = useState({
    tableHead: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    tableTitle: ['Mood', 'Energy', 'Anxiety', 'Caution', 'Memory', 'Anger', 'Sleep', 'Tags'],
    data: dataArr,
  })

  const getDailyTags = () => {
    console.log('getDailyTags')
    return async dispatch => {
      let userId = await AsyncStorage.getItem('userId')

      return db.collection('data').doc(userId)
        .get().then(function (doc) {
          // return dispatch(user_tags(doc.data().tags))
        })

    }
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1}}>
            <Row data={dataDaysArr} width={100} style={styles.head} textStyle={styles.text}/>
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1}}>
              <TableWrapper style={styles.wrapper}>
                <Col data={state.tableTitle} style={styles.title} height={35} width={100} textStyle={styles.text}/>
                <Rows data={dataArrTranspose} height={35} width={100} style={styles.row}
                      textStyle={styles.text}/>
                {/*{*/}
                {/*  dataArr.map((rowData, index) => (*/}
                {/*    <Row*/}
                {/*      key={index}*/}
                {/*      data={rowData}*/}
                {/*      width={100}*/}
                {/*      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}*/}
                {/*      textStyle={styles.text}*/}
                {/*    />*/}
                {/*  ))*/}
                {/*}*/}
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
  // }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 35},
  text: {textAlign: 'center'},
  dataWrapper: {marginTop: -1},
});