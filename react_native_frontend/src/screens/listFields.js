import React, { useEffect, useState } from 'react';
import {ActivityIndicator, View, Text , FlatList, Image} from 'react-native';
import styles from '../styles/st_home';

function listFieldsScreen ({navigation}) {
  const [isloading, setisloading] = useState(true);
  const list = [
    {
      fieldId:'',
      image:'../images/imageDefault.png',
      name:'asfd',
    }
  ]
  const get_data = () =>{

  }
  useEffect(()=>{
    // load data here
    get_data();
    // set loading when complete
    // setisloading(false);
    setTimeout(()=>{
      setisloading(false);
    }, 1000);
  }, []);

  if (isloading){
    return (
      <View styles={styles.container}>
        <ActivityIndicator/>
      </View>
    )
  }

  return(
    <View styles={styles.list_view_container}>
      <FlatList
        data={list}
        renderItem={({item}) => 
          <View style={styles.item_img_and_title}>
            <Image 
              style={styles.item_img}
              source={item.image}
            />
            <Text style={styles.item_title}>
              {item.name}
            </Text>
          </View>
          }
      />
    </View>
  )

}


export default listFieldsScreen;