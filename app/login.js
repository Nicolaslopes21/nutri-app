import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { useRouter } from "expo-router";
import { validarLogin, marcarLogado, verificarLogado, buscarTodosUsuarios } from "../servico/usuarioService";
import InputField from "../Componentes/InputField";
import BotaoPrimario from "../Componentes/BotaoPrimario";
import ImagemAdaptativa from "../Componentes/ImagemAdaptativa";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Login() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const offsetY = -screenHeight * 0.35;

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setCarregando(true);
    try {
      // Debug: mostra usuários salvos
      const usuarios = await buscarTodosUsuarios();
      console.log("Usuários salvos:", usuarios);
      console.log("Tentando logar com:", { email: email.trim(), senha: senha.trim() });

      const valido = await validarLogin(email.trim(), senha.trim());
      console.log("Login válido?", valido);

      if (valido) {
        await marcarLogado();
        Alert.alert("Sucesso", "Bem-vindo!");
        router.replace("/configuracao");
      } else {
        Alert.alert("Erro", "Email ou senha incorretos");
      }
    } catch (err) {
      Alert.alert("Erro", "Algo deu errado. Tente novamente.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const irParaCadastro = () => {
    router.push("/cadastro");
  };

  return (
    <View style={styles.geral}>
      {/* Fundo verde curvo */}
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

      {/* Logo */}
      <View style={styles.logoContainer}>
        <ImagemAdaptativa
          source={require("../assets/logoNutri2.png")}
          style={styles.logo}
        />
      </View>

      {/* Formulário de Login */}
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Fazer Login</Text>

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

        <BotaoPrimario
          titulo={carregando ? "Entrando..." : "Entrar"}
          onPress={handleLogin}
          disabled={carregando}
        />

        <View style={styles.cadastroContainer}>
          <Text style={styles.textoAuxiliar}>Não tem cadastro? </Text>
          <BotaoPrimario
            titulo="Cadastre-se aqui"
            onPress={irParaCadastro}
            cor="#666"
            largura="60%"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  geral: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
  },
  bordas: {
    backgroundColor: "#008000",
    borderRadius: 9999,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
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
  cadastroContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  textoAuxiliar: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
});
