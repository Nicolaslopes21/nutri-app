import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import ModalAgua from "../Componentes/modalAgua1";
import ModalRefeicoes from "../Componentes/modalRefeicoes";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Pagina1() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  // offsetY negativo move a view para cima; ajuste conforme necessário
  const offsetY = -screenHeight * 0.35; // subir 25% da altura da tela

  return (
    <View style={styles.divpai}>
        <View style={styles.divModalAgua}>
            <View>
                <ModalAgua />
            </View>
            <View>
                <ModalAgua />
            </View>
            
        </View>
        <View style={styles.divModalRefeicoes}>
            <ModalRefeicoes/>
            <ModalRefeicoes/>
            <ModalRefeicoes/>
        </View>

        
    </View>
      )}
    const styles = StyleSheet.create({
    divModalAgua:{
        position:'absolute',
        flexDirection:'row',
        rowGap:90,
        alignSelf:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop:190,
        gap:200,
  },
  divpai:{
        height:"100%",
        width:"100%",
        alignSelf:'center'

  },
  divModalRefeicoes:{
        flexDirection:'column',
        columnGap:30,
        position:'absolute',
        marginTop:"40%",
        alignSelf:'center',
  }
  
    });