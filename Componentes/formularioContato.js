import {Button, View, StyleSheet, Text, TextInput} from 'react-native';
import {useState, onSave} from "react";
const FormularioContato = ({onSave}) =>{
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    
    
    const salvar = () =>{
        const contato = {
            nome:nome,
            telefone:telefone,
        }
        onSave(contato)
    }

    return (
        <View style={styles.container}>
            <View>
                <TextInput style={{backgroundColor:'white',borderColor:'black', borderWidth: 2, margin:2}} 
                placeholder='Nome'
                onChangeText={(valor)=>setNome(valor)}/>
                <TextInput style={{backgroundColor:'white',borderColor:'black', borderWidth: 2, margin:2}} 
                placeholder='Telefone'
                onChangeText={(valor)=>setTelefone(valor)}/>
            </View>
            <Button title='Salvar' onPress={()=>{
                salvar();
                }}></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
    }
});
export default FormularioContato;