import {View, Text, Image, StyleSheet} from 'react-native';
const image = require('../assets/cascudo.png');
const Avatar = () => {
    return (
        <View>
            <Image source={image} style={styles.imagem}/>
        </View>
    );
}; 
const styles = StyleSheet.create({
    imagem: {   
        width: 50,
        height: 50,
        borderRadius: '100%',
    }
});
    export default Avatar;