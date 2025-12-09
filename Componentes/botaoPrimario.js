import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotaoPrimario({
  titulo,
  onPress,
  cor = '#008000',
  largura = '80%',
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        { backgroundColor: cor, width: largura },
        disabled && styles.botaoDesativado,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  botaoDesativado: {
    opacity: 0.5,
  },
  texto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
