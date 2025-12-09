import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_USUARIOS = '@nutriapp_usuarios';
const CHAVE_USUARIO_ATUAL = '@nutriapp_usuario_atual';
const CHAVE_LOGADO = '@nutriapp_logado';


export const salvarUsuario = async (usuario) => {
  try {
    
    const usuariosJSON = await AsyncStorage.getItem(CHAVE_USUARIOS);
    let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

    
    const emailExiste = usuarios.some(u => u.email === usuario.email);
    if (emailExiste) {
      return false; 
    }

    
    usuarios.push(usuario);
    await AsyncStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
    return true;
  } catch (erro) {
    console.error('Erro ao salvar usuário:', erro);
    return false;
  }
};


export const buscarUsuario = async () => {
  try {
    const usuarioJSON = await AsyncStorage.getItem(CHAVE_USUARIO_ATUAL);
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
  } catch (erro) {
    console.error('Erro ao buscar usuário:', erro);
    return null;
  }
};


export const buscarTodosUsuarios = async () => {
  try {
    const usuariosJSON = await AsyncStorage.getItem(CHAVE_USUARIOS);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  } catch (erro) {
    console.error('Erro ao buscar usuários:', erro);
    return [];
  }
};


export const atualizarUsuario = async (usuario) => {
  try {
   
    await AsyncStorage.setItem(CHAVE_USUARIO_ATUAL, JSON.stringify(usuario));

    const usuariosJSON = await AsyncStorage.getItem(CHAVE_USUARIOS);
    let usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    usuarios = usuarios.map(u => u.email === usuario.email ? usuario : u);
    await AsyncStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));

    return true;
  } catch (erro) {
    console.error('Erro ao atualizar usuário:', erro);
    return false;
  }
};


export const validarLogin = async (email, senha) => {
  try {
    const usuariosJSON = await AsyncStorage.getItem(CHAVE_USUARIOS);
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];


    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
      await AsyncStorage.setItem(CHAVE_USUARIO_ATUAL, JSON.stringify(usuario));
      return true;
    }
    return false;
  } catch (erro) {
    console.error('Erro ao validar login:', erro);
    return false;
  }
};

export const marcarLogado = async () => {
  try {
    await AsyncStorage.setItem(CHAVE_LOGADO, 'true');
    return true;
  } catch (erro) {
    console.error('Erro ao marcar logado:', erro);
    return false;
  }
};

export const verificarLogado = async () => {
  try {
    const logado = await AsyncStorage.getItem(CHAVE_LOGADO);
    return logado === 'true';
  } catch (erro) {
    console.error('Erro ao verificar logado:', erro);
    return false;
  }
};


export const fazerLogout = async () => {
  try {
    await AsyncStorage.removeItem(CHAVE_LOGADO);
    await AsyncStorage.removeItem(CHAVE_USUARIO_ATUAL);
    return true;
  } catch (erro) {
    console.error('Erro ao fazer logout:', erro);
    return false;
  }
};

export const limparDados = async () => {
  try {
    await AsyncStorage.removeItem(CHAVE_USUARIOS);
    await AsyncStorage.removeItem(CHAVE_USUARIO_ATUAL);
    await AsyncStorage.removeItem(CHAVE_LOGADO);
    return true;
  } catch (erro) {
    console.error('Erro ao limpar dados:', erro);
    return false;
  }
};
