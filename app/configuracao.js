import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Perfil() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  const offsetY = -screenHeight * 0.35;

  return (
    <View style={styles.geral}>

      {/* Fundo verde curvo igual ao modelo */}
      <View
        onLayout={(e) =>
          setSize({
            w: e.nativeEvent.layout.width,
            h: e.nativeEvent.layout.height,
          })
        }
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

      {/* TOPO COM NOME + AVATAR */}
      <View style={styles.header}>
        <Image
          source={require("../assets/usuarioimagem.png")} // coloque sua imagem
          style={styles.headerAvatar}
        />
        <Text style={styles.headerName}>Leonardo</Text>

        <Image
          source={require("../assets/logoNutri2.png")} // ícone do lado direito
          style={styles.headerIcon}
        />
      </View>

      {/* CARD BRANCO DA EDIÇÃO */}
      <View style={styles.card}>

        {/* Botão de fechar */}
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Avatar central */}
        <Image
          source={require("../assets/usuarioimagem.png")} // avatar
          style={styles.cardAvatar}
        />

        <Text style={styles.title}>
          <Text style={{ fontWeight: "bold" }}>EDITAR Perfil </Text>✎
        </Text>

        {/* Inputs */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Nome:</Text>
          <Text style={styles.inputValue}>Leonardo</Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Idade:</Text>
          <Text style={styles.inputValue}>19 anos</Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Peso:</Text>
          <Text style={styles.inputValue}>70</Text>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  geral: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },

  bordas: {
    backgroundColor: "#008000",
    borderRadius: 9999,
  },

  /* ------ HEADER SUPERIOR ------ */
  header: {
    marginTop: 60,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerAvatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  headerName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerIcon: {
    width: 45,
    height: 45,
  },

  /* ------ CARD BRANCO ------ */
  card: {
    width: "85%",
    backgroundColor: "#fff",
    marginTop: 40,
    paddingVertical: 30,
    borderRadius: 25,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  closeText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  cardAvatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    marginBottom: 20,
  },

  /* caixas brancas com texto - Nome/Idade/Peso */
  inputBox: {
    width: "75%",
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 22,
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  inputValue: {
    fontSize: 16,
    marginTop: 3,
  },

  /* Botão salvar */
  btn: {
    width: "60%",
    height: 45,
    borderRadius: 30,
    backgroundColor: "#008000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
