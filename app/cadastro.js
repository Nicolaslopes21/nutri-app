import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { useRouter } from "expo-router";
import { salvarUsuario } from "../servico/usuarioService";
import InputField from "../Componentes/InputField";
import BotaoPrimario from "../Componentes/BotaoPrimario";
import ImagemAdaptativa from "../Componentes/ImagemAdaptativa";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Cadastro() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const offsetY = -screenHeight * 0.35;

  const validarCampos = () => {
    if (!email.trim()) return "Por favor, preencha o email";
    if (!senha.trim()) return "Por favor, preencha a senha";
    if (!nome.trim()) return "Por favor, preencha o nome";
    if (!idade.trim()) return "Por favor, preencha a idade";
    if (!peso.trim()) return "Por favor, preencha o peso";
    return null;
  };

  const handleCadastro = async () => {
    const erro = validarCampos();
    if (erro) {
      Alert.alert("Erro", erro);
      return;
    }

    setCarregando(true);
    try {
      const usuario = {
        email: email.trim(),
        senha: senha.trim(),
        nome: nome.trim(),
        idade: idade.trim(),
        peso: peso.trim(),
        dataCadastro: new Date().toISOString(),
      };

      const salvo = await salvarUsuario(usuario);
      if (salvo) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        router.replace("/login");
      } else {
        Alert.alert("Erro", "Email já cadastrado ou erro ao salvar. Tente novamente.");
      }
    } catch (err) {
      Alert.alert("Erro", "Algo deu errado. Tente novamente.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const handleVoltar = () => {
    router.back();
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
      <View style={styles.imageContainer}>
        <ImagemAdaptativa
          source={require('../assets/logoNutri2.png')}
          style={styles.logoImage}
        />
      </View>

      {/* Formulário */}
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Cadastre-se</Text>
        <InputField
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <InputField
          label="Senha"
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <InputField
          label="Nome"
          placeholder="Seu nome completo"
          value={nome}
          onChangeText={setNome}
        />
        <InputField
          label="Idade"
          placeholder="Ex: 25"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />
        <InputField
          label="Peso (kg)"
          placeholder="Ex: 70"
          value={peso}
          onChangeText={setPeso}
          keyboardType="decimal-pad"
        />

        <BotaoPrimario
          titulo={carregando ? "Cadastrando..." : "Cadastre-se"}
          onPress={handleCadastro}
          disabled={carregando}
        />

        <BotaoPrimario
          titulo="Voltar ao Login"
          onPress={handleVoltar}
          cor="#666"
          disabled={carregando}
        />
      </View>
    </View>
  );
}

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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -170,
    marginBottom: 20,
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#008000",
    marginBottom: 20,
    textAlign: "center",
  },
});
