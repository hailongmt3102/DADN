import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FFF',
    padding:20,
  },
  text_input:{
    borderRadius:20,
    height:40,
    width:300,
    alignSelf:'center',
    fontSize:18,
    borderWidth:2,
    borderColor:'#9A79FE',
    paddingLeft:20,
    paddingRight:20,
    marginTop:20
  },
  purple_color:{
    color: '#9A79FE'
  },
  title:{
    fontSize:36,
    color: '#9A79FE',
    alignSelf:'center',
    paddingTop:55,
    paddingBottom:20,
  },
  button:{
    borderRadius:20,
    height:40,
    width:300,
    alignSelf:'center',
    backgroundColor:'#9A79FE',
    paddingLeft:20,
    paddingRight:20,
    marginTop:20,
    justifyContent:'center',
    textAlign:'center',
  },
  innerbtn:{
    color:'#FFF',
    fontSize:18,
  },
  baseText:{
    alignSelf:'center',
    fontSize:18,
    marginTop:40,
  },
  innerText:{
    color:'#9A79FE'
  }
});

export default styles;