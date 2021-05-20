import {StyleSheet, Dimensions} from 'react-native';
const dimen = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      height: dimen.height,
    },
    WelcomeLogo: {
      height: dimen.height * 2/3,
      resizeMode: 'cover',
    },
    content:{
      height: dimen.height * 1/3,
      backgroundColor: '#FBFDFE',
      fontFamily: 'Roboto',
    },
    text_title:{
      fontWeight: 'bold',
      fontSize: 25,
      paddingLeft:20,
    },
    text_content:{
      fontSize: 18,
    },
    text_welcome:{
      fontSize: 18,
      marginLeft:20
    },
    button:{
      alignSelf:'center',
      alignItems:'center',
      justifyContent:'center',
      marginTop:20,
      width:200,
      height:50,
      borderRadius:20,
      backgroundColor:'#9A79FE'
    }
  });

export default styles;