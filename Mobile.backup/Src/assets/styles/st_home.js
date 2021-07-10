import {Dimensions, StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FBFDFE',
    width:width,
    height:height
  },
  image:{
    height:300,
    resizeMode:'contain',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:50
  },
  textline:{
    margin:10,
    marginLeft:20
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
  },
  text_content:{
    fontSize:20
  },
  button:{
    borderRadius:20,
    height:40,
    width:150,
    alignSelf:'center',
    backgroundColor:'#9A79FE',
    paddingLeft:20,
    paddingRight:20,
    marginTop:20,
    justifyContent:'center',
    textAlign:'center',
    flexDirection:'row'
  },
  innerbtn:{
    color:'#FFF',
    fontSize:18,
    alignSelf:'center'
  },
  list_view_container:{
    flex:1,
    padding:10,
  },
  item_img_and_title:{
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    backgroundColor: "#FFF",
    flex:1,
    flexDirection:'row',
    borderRadius:10
  },
  item_img:{
    width:100,
    height:100,
    resizeMode:'cover',
    marginLeft:10
  },
  item_title:{
    fontSize:20,
    justifyContent:'center',
    alignSelf:'center',
    marginLeft:20,
  }

})

export default styles