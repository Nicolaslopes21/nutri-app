import {View, Text, StyleSheet} from 'react-native';
import Avatar from './avatar';
const Contatos = ({contato}) => {
    return (
        <View style={styles.container}>
            <Avatar></Avatar>
            <View>
                <Text style={styles.nome}>{contato.id}-{contato.nome}</Text>
                <Text style={styles.telefone}>{contato.telefone}</Text>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    nome : {
        fontSize: 20,
        color: 'black',
        fontWeight:'bold'
    }
    ,
    telefone : {
        fontSize: 16,
        color: 'red',
        fontStyle:'italic'
    },
    container: {
        flexDirection:'row',
        gap:10,
        backgroundColor:'white',
        padding:5,
        borderRadius:3,
        margin:5
    }
})
export default Contatos;