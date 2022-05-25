import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location'

import { initializeApp } from "firebase/app";

import { getFirestore, collection, setDoc, doc } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAgOMQJK2IUibkAS9yBIDTrAUi0plz_6sA",
  authDomain: "smartdustbin1-b8fe8.firebaseapp.com",
  databaseURL: "https://smartdustbin1-b8fe8-default-rtdb.firebaseio.com",
  projectId: "smartdustbin1-b8fe8",
  storageBucket: "smartdustbin1-b8fe8.appspot.com",
  messagingSenderId: "985074760523",
  appId: "1:985074760523:web:541bcbc548f1341c5cc6ce",
  measurementId: "G-FG2J3MD8W2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default function Apps() {
  const [running,setrunning]=useState(false)
  const [location, setLocation] = useState(null)
  const [device, setdevice] = useState(null)
  const addtoDB = async (location) => {
    console.log("called----------------------------------------",location)
    if (location){
      await setDoc(doc(db, "location", device), {
        ...location
    })
    }

  }
  const getlocation = async () => {
    setrunning(true)
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      alert("Are you fucking kidding me")
    }
    let location = await Location.getCurrentPositionAsync()
    setLocation(location)
    addtoDB(location)
    console.log(location)
    setInterval(async () => {
      let location = await Location.getCurrentPositionAsync()
      setLocation(location)
      addtoDB(location)
      console.log(location)
    }, 10000)

  }
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.status}>Smart Dustbin</Text>
      </View>
      <View style={styles.logo}>
        <Entypo name="location" size={200} color="#03C28E" />

      </View>
      <View>
        {
          device == null ?
          <View style={styles.btns}>
          <TouchableOpacity style={styles.btn} onPress={()=>setdevice("One")} activeOpacity={0.8}>
            <Text style={styles.buttontxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>setdevice("Two")} activeOpacity={0.8}>
            <Text style={styles.buttontxt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>setdevice("Three")} activeOpacity={0.8}>
            <Text style={styles.buttontxt}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>setdevice("Four")} activeOpacity={0.8}>
            <Text style={styles.buttontxt}>4</Text>
          </TouchableOpacity>
          </View>
          :
          <View style={styles.clrs}>
              <Text style={styles.clrs}>Selected device: {device}</Text>
          </View>

        }</View>

      <TouchableOpacity style={styles.button} onPress={getlocation} activeOpacity={0.8}>
        <Text style={styles.buttontxt}>Start</Text>
      </TouchableOpacity>
      {
    running && <Text style={{color:"white",textAlign:"center",marginTop:20,fontSize:18}}>Running.....</Text>
  }
      <StatusBar style="auto" backgroundColor='#03C28E' />
    </View>
  );
}

const styles = StyleSheet.create({
  clrs:{
    margin:20,
    color:"white",
    fontSize:18
  },
  btn:{
    backgroundColor:"#03C28E",
    margin:20,
    paddingHorizontal:20,
    paddingVertical:14,
    borderRadius:50
  },
  btns:{
    flexDirection:"row"
  },
  container: {
    flex: 1,
    backgroundColor: '#1B1616',
    alignItems: 'center',

  },
  logo: {
    marginTop: "30%"
  },
  topbar: {
    height: 80,
    backgroundColor: "#03C28E",
    width: "100%",
    marginTop: 37,
    paddingHorizontal: 20,
    paddingVertical: 0
  },
  status: {
    color: "white",
    fontSize: 20,
    marginTop: 24,
    fontWeight: '900'
  },
  button: {
    marginTop: "10%",
    backgroundColor: "#03C28E",
    paddingVertical: 20,
    paddingHorizontal: 80,
    color: "white",
    borderRadius: 10
  },
  buttontxt: {
    color: "white",
    fontSize: 16
  }
});
