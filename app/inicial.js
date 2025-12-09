import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ImagemAdaptativa from "../Componentes/imagemAdaptativa";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Inicial() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const router = useRouter();

  // offsetY negativo move a view para cima proporcionalmente
  const offsetY = -screenHeight * 0.25; // sobe 25% da altura da tela

  const handleComecaAUsar = () => {
    router.push("/login");
  };

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
              { translateY: -size.h / 2 + offsetY },
            ],
          },
        ]}
      />
      <View style={styles.controle}>
        <View style={styles.container_titulo}>
          <Text style={styles.titulo}>Seu guia de alimentação</Text>
        </View>
        <View style={styles.imageContainer}>
          <ImagemAdaptativa
            source={require("../assets/logoNutri2.png")}
            style={styles.logoImage}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleComecaAUsar}>
        <Text style={styles.btnText}>Comece a usar</Text>
      </TouchableOpacity>
      <ImagemAdaptativa
        source={require("../assets/frutasNutriapp.png")}
        style={styles.frutaImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  controle: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: screenWidth * 0.03, // proporcional
  },
  titulo: {
    color: "#008000",
    fontSize: screenWidth * 0.10, // responsivo
    fontWeight: "bold",
    textAlign: "center",
  },
  container_titulo: {
    marginTop: screenHeight * 0.15, // proporcional
    marginBottom: screenHeight * 0.01,
    alignItems: "center",
    justifyContent: "center",
  },
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
    borderRadius: 1000,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -screenHeight * 0.1,
    marginBottom: screenHeight * 0.03,
  },
  logoImage: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    resizeMode: "contain",
  },
  btn: {
    width: "80%",
    height: screenHeight * 0.08,
    borderRadius: 50,
    backgroundColor: "#008000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: screenHeight * 0.05, // proporcional
    zIndex:1,
    
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: screenWidth * 0.045,
  },
  frutaImage: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.7,
    marginTop: -screenHeight * 0.2,
    resizeMode: "cover",
    right:0,
    bottom:-screenHeight * 0.025,
    position: "absolute",
    zIndex: 0,
    transform: [{ rotate: "-11deg" }],
  },
});
