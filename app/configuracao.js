import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Dimensions, Alert, ScrollView, TouchableOpacity} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { buscarUsuario, atualizarUsuario, fazerLogout } from "../servico/usuarioService";
import InputField from "../Componentes/InputField";
import BotaoPrimario from "../Componentes/BotaoPrimario";
import ImagemAdaptativa from "../Componentes/ImagemAdaptativa";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Configuracao() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [usuario, setUsuario] = useState(null);
  const [edicao, setEdicao] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [dadosEditando, setDadosEditando] = useState({});
  const router = useRouter();

  const offsetY = -screenHeight * 0.35;

  // Carrega dados do usuário ao abrir a página
  useFocusEffect(
    React.useCallback(() => {
      carregarUsuario();
    }, [])
  );

  const carregarUsuario = async () => {
    try {
      const dados = await buscarUsuario();
      if (dados) {
        setUsuario(dados);
        setDadosEditando(dados);
      } else {
        Alert.alert("Erro", "Nenhum usuário encontrado");
        router.replace("/index");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Erro ao carregar dados");
    }
  };

  const handleSalvar = async () => {
    if (!dadosEditando.nome.trim() || !dadosEditando.idade.trim() || !dadosEditando.peso.trim()) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setCarregando(true);
    try {
      const usuarioAtualizado = {
        ...usuario,
        nome: dadosEditando.nome.trim(),
        idade: dadosEditando.idade.trim(),
        peso: dadosEditando.peso.trim(),
      };

      const salvo = await atualizarUsuario(usuarioAtualizado);
      if (salvo) {
        setUsuario(usuarioAtualizado);
        setEdicao(false);
        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      } else {
        Alert.alert("Erro", "Erro ao salvar dados");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Algo deu errado");
    } finally {
      setCarregando(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Deseja realmente sair?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: async () => {
          await fazerLogout();
          router.replace("/login");
        },
      },
    ]);
  };

  if (!usuario) {
    return (
      <View style={styles.geral}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.geral}>

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
        <ImagemAdaptativa
          source={require("../assets/usuarioimagem.png")}
          style={styles.headerAvatar}
        />
        <Text style={styles.headerName}>{usuario.nome}</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.headerIcon}>🚪</Text>
        </TouchableOpacity>
      </View>

      {/* CARD BRANCO DA EDIÇÃO */}
      <View style={styles.card}>
        {/* Botão de fechar/editar */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => (edicao ? setEdicao(false) : setEdicao(true))}
        >
          <Text style={styles.closeText}>{edicao ? "✕" : "✎"}</Text>
        </TouchableOpacity>

        {/* Avatar central */}
        <ImagemAdaptativa
          source={require("../assets/usuarioimagem.png")}
          style={styles.cardAvatar}
        />

        <Text style={styles.title}>
          {edicao ? "EDITANDO Perfil" : "MEUS DADOS"} {edicao && "✎"}
        </Text>

        {/* Inputs */}
        {edicao ? (
          <>
            <InputField
              label="Nome"
              placeholder="Seu nome"
              value={dadosEditando.nome || ""}
              onChangeText={(text) =>
                setDadosEditando({ ...dadosEditando, nome: text })
              }
            />
            <InputField
              label="Idade"
              placeholder="Sua idade"
              value={dadosEditando.idade || ""}
              onChangeText={(text) =>
                setDadosEditando({ ...dadosEditando, idade: text })
              }
              keyboardType="numeric"
            />
            <InputField
              label="Peso (kg)"
              placeholder="Seu peso"
              value={dadosEditando.peso || ""}
              onChangeText={(text) =>
                setDadosEditando({ ...dadosEditando, peso: text })
              }
              keyboardType="decimal-pad"
            />

            {/* Botões de ação em edição */}
            <View style={styles.buttonsRow}>
              <BotaoPrimario
                titulo={carregando ? "Salvando..." : "Salvar"}
                onPress={handleSalvar}
                disabled={carregando}
                largura="45%"
              />
              <BotaoPrimario
                titulo="Cancelar"
                onPress={() => {
                  setEdicao(false);
                  setDadosEditando(usuario);
                }}
                cor="#999"
                largura="45%"
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Nome:</Text>
              <Text style={styles.inputValue}>{usuario.nome}</Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Idade:</Text>
              <Text style={styles.inputValue}>{usuario.idade} anos</Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Peso:</Text>
              <Text style={styles.inputValue}>{usuario.peso} kg</Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email:</Text>
              <Text style={styles.inputValue}>{usuario.email}</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  geral: {
    flex: 1,
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
    fontSize: 28,
  },

  /* ------ CARD BRANCO ------ */
  card: {
    width: "85%",
    backgroundColor: "#fff",
    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 30,
    borderRadius: 25,
    alignItems: "center",
    elevation: 5,
    marginBottom: 30,
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
    fontWeight: "bold",
  },

  /* caixas com texto - Nome/Idade/Peso */
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
    color: "#333",
  },

  /* Botões lado a lado */
  buttonsRow: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
