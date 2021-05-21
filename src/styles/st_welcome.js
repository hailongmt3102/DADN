import {StyleSheet, Dimensions} from 'react-native';
const dimen = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      height: dimen.height,
    },
    WelcomeLogo: {
      height: dimen.height * 2/3,
      resizeMode: 'center',
    },
    content:{
      height: dimen.height * 1/3,
      backgroundColor: '#FBFDFE',
      fontFamily: 'Roboto',
      paddingLeft: 40
    },
    text_title:{
      fontWeight: 'bold',
      fontSize: 25,
    },
    text_content:{
      fontSize: 18,
    },
    button:{
      alignItems:'center',
      justifyContent:'center',
      margin:20,
      maxWidth:200,
      height:40,
      borderRadius:20,
      backgroundColor:'#9A79FE'
    }
  });

export default styles;