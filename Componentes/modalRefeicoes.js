import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, TextInputComponent } from "react-native";
import { Link } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ModalRefeicoes(texto) {
  return (
    <View style={styles.geral}>   
        <View style={styles.texto}>
            <Text style={styles.nomeRefeicao}> Café da Manhã </Text>
            <Text style={styles.calorias}>412-476</Text>
        </View>
        <View style={styles.comidaIcon}>
            <Image style={{height:'100%', width:'80%', alignSelf:'center', position:'absolute'}} source={require('../assets/comida1.png')}></Image>
        </View>
    </View>
      )}
    const styles = StyleSheet.create({
        geral: {
            alignItems:"center",
            alignSelf:'center',
    flexDirection:"row",
    gap:20,
    height: 130,
    width: 400,
    padding:15,
    justifyContent:'flex-start',
    backgroundColor: "#D9D9D9",
    borderColor:'#ffffff',
    borderWidth:2,
    borderRadius:20,
    marginBottom:10

  },
        nomeRefeicao:{
            marginBottom:'7%',
            fontSize:28,
        },
        texto:{
            height:"100%",
            width:"70%",
            flexDirection:'collumn',
        },
        calorias:{
            fontSize:28,
        },
        comidaIcon:{

            height:"85%",
            width:"30%",
        }
    });