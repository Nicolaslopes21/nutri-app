let contatos = [];
const listarContatos = async () => {
    return contatos;
};

const adicionarContatos= async (contato) => {
    contatos.push({
        id: (contatos.length+1),
        ...contato});
    return contato;
}

export {listarContatos, adicionarContatos}