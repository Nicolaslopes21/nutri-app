import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { verificarLogado } from '../servico/usuarioService';

export default function RootLayout() {
  const [inicializado, setInicializado] = useState(false);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    verificarEstado();
  }, []);

  const verificarEstado = async () => {
    const estaLogado = await verificarLogado();
    setLogado(estaLogado);
    setInicializado(true);
  };

  if (!inicializado) {
    return null; // Ou um splash screen
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Tela de Login (pública) */}
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />

      {/* Tela de Cadastro (pública) */}
      <Stack.Screen
        name="cadastro"
        options={{
          title: 'Cadastro',
        }}
      />

      {/* Tela Inicial (pública) */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Inicial',
        }}
      />

      {/* Tela Inicial (protegida) */}
      <Stack.Screen
        name="inicial"
        options={{
          title: 'Inicial',
        }}
      />

      {/* Tela de Configuração/Perfil (protegida) */}
      <Stack.Screen
        name="configuracao"
        options={{
          title: 'Meu Perfil',
        }}
      />
    </Stack>
  );
}
