import React, { useEffect, useState } from 'react';
import {ActivityIndicator, View, Text , FlatList, Image, TouchableHighlight} from 'react-native';
import styles from '../styles/st_home';

function listFieldsScreen ({navigation}) {
  const [isloading, setisloading] = useState(true);
  const list = [
    {
      fieldId:'',
      image: require('../images/welcome.png'),
      name:'field 1',
    },
    {
      fieldId:'',
      image:require('../images/welcome.png'),
      name:'field 2',
    }
  ]
  const get_data = () =>{
    // load data and put on list above
  }
  useEffect(()=>{
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
  const onpress = (id) => {
    // TODO
  }
  return(
    <View styles={styles.list_view_container}>
      <FlatList
        data={list}
        renderItem={({item}) => 
          <View style={styles.item_img_and_title}
            onPress={onpress(item.fieldId)}
          >
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
      
      <TouchableHighlight
          style={styles.button}
          onPress={()=>{}}
        >
          <Text style={styles.innerbtn}
          >Add Field</Text>
        </TouchableHighlight>
    </View>
  )

}


export default listFieldsScreen;