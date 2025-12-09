import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, TextInputComponent } from "react-native";
import { Link } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ModalAgua(texto) {
  return (
    <View style={styles.geral}>   
        <View style={styles.gota}>
            <Image style={{height:'100%', width:'80%', alignSelf:'center', position:'absolute'}} source={require('../assets/aguaIcon1.png')}></Image>
        </View>
        <View style={styles.texto}>
            <Text style={{fontWeight:'bold', textAlign:'center'}}>texto de teste </Text>
        </View>
        <View style={styles.inputDeTxt}>  
            <TextInput placeholder="ex:2L" style={styles.caixaDeTxt}></TextInput>
        </View>
    </View>
      )}
    const styles = StyleSheet.create({
        geral: {

    flexDirection:"column",
    gap:20,
    height: 190,
    width: 190,
    justifyContent: "center",
    alignSelf:'center',
    alignItems:'center',
    backgroundColor: "#D9D9D9",
    position:"absolute",
  },
    gota:{
        height:"40%",
        width:'40%'
  },
  texto:{
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    
    height:'20%',
    width:'60%',
    fontSize:27,
  },
  inputDeTxt:{
    marginTop:-10,
    textAlign:'center',
    fontSize:12,
    height:20,
    width:100,
    
  },
  caixaDeTxt:{
    borderRadius:100,
    textAlign:'center',
    justifyContent:'center',
    height:'100%',
     width:'100%',
     border:'none',
     borderWidth:0,
     backgroundColor:'white'
    }
    });