import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Index() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  // offsetY negativo move a view para cima; ajuste conforme necessário
  const offsetY = -screenHeight * 0.35; // subir 25% da altura da tela

  return (
    <View style={styles.geral}>
      {/*Parte de cima verde*/}
      <View
        onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
        style={[
          styles.bordas,
          {
            position: "absolute",
            top: 0,
            left: screenWidth / 2,
            width: screenWidth * 2,
            height: screenHeight,
            transform: [
              { translateX: -size.w / 2 },
              // aplica o offset para subir/baixar
              { translateY: -size.h / 2 + offsetY },
            ],
          },
        ]}
      />
      <View style={styles.titulo}>
        <Text>Seu guia de alimentação</Text>
      </View>
      <View style={styles.imageContainer}>
              <Image
                source={require('../assets/logoNutri2.png')}
                style={styles.logoImage}
              />
            </View>
    </View>
      )}
    const styles = StyleSheet.create({
        geral: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  bordas: {
    backgroundColor: "#008000",
    borderRadius: 9999,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -170,
    marginBottom: 50,
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    position: 'relative',
  }
    });