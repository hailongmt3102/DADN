import React, { useEffect, useState } from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import styles from '../styles/st_home';

function listFieldsScreen ({navigation}) {
  const [isloading, setisloading] = useState(true);
  const list = [

  ]
  const param = {
    fieldId:'',
    image:'',
    name:'',
  }
  const get_data = () =>{

  }
  useEffect(()=>{
    // load data here
    get_data();
    // set loading when complete
    // setisloading(false);
    setTimeout(()=>{
      setisloading(false);
    }, 5000);
  }, []);

  if (isloading){
    return (
      <View styles={styles.container}>
        <ActivityIndicator/>
      </View>
    )
  }

  return(
    <View styles={styles.container}>
      <Text>
        list /.... 
      </Text>
    </View>
  )

}

export default listFieldsScreen;