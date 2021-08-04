import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  ScrollView
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker';
const Item = Picker.Item;
import axiosInstance from "../../Context/Axios"
import Button from "../../Component/Button"

const type_options = [
  {
    key: "Soil",
    value: 'SOIL'
  },
  {
    key: "Air",
    value: 'AIR'
  },
  {
    key: "Relay",
    value: 'RELAY'
  },
]


export default function CreateSensor(props) {

  const { fieldUUID } = props.route.params
  const { farmUUID } = props.route.params
  console.log('farm', farmUUID)
  const [options, setOptions] = useState([])
  const [submitData, setSubmitData] = useState({
    field:fieldUUID,
    sensor_type:'AIR',
    is_test:true
  })

  const getOptions = async () => {

    const data = await axiosInstance.post(
      "api/farms/feeds/matrix", {
      farm_uuid: farmUUID
    }).then(resp => resp.data.data)

    return data;
  }

  const handleSubmit = () => {
    console.log(submitData)
    axiosInstance.post("api/farms/fields/sensors/create", submitData
    ).then(resp => resp.data).
      then(data => {
        alert("added device id: " + data["uuid"].toString())
      })
  }

  useEffect(() => {
    getOptions().then(data => {
      setOptions(data)
      setSubmitData({...submitData,feed:(data[0] && data[0].uuid) || ""})

    })
  }, [])

  return (
    <ScrollView>
      <View
        style={{ borderBottomWidth: 2, margin: 20 }}
      >
        <Text style={{ fontSize: 20 }}>Plant</Text>

        <Picker
          mode="dialog"
          style={{ width: width * 2 / 3, alignSelf: "center" }}
          numberOfLines={5}
          selectedValue={submitData.sensor_type}
          onValueChange={(v) => setSubmitData({ ...submitData, "sensor_type": v })}
          prompt="Pick a sensor type"
        >
          {
            type_options.map((entrie, index) => {
              return (<Item
                key={entrie["value"]}
                label={entrie["key"]}
                value={entrie["value"]}
              />)
            }
            )
          }

        </Picker>
      </View>
      <View
        style={{ borderBottomWidth: 2, margin: 20 }}
      >
        <Text style={{ fontSize: 20 }}>Feed</Text>

        <Picker
          mode="dialog"
          style={{ width: width * 2 / 3, alignSelf: "center" }}
          numberOfLines={5}
          selectedValue={submitData.feed || ""}
          onValueChange={(v) => setSubmitData({ ...submitData, "feed": v })}
          prompt="Pick a feed"
        >
          {
            options.map((entrie, index) => {
              return (<Item
                key={entrie["uuid"]}
                label={entrie["username"]}
                value={entrie["uuid"]}
              />)
            }
            )
          }

        </Picker>
      </View>

      <TextInput
        style={{
          height: 40,
          width: 300,
          alignSelf: 'center',
          fontSize: 18,
          borderBottomWidth: 2,
          borderColor: '#000',
          marginTop: 20
        }}
        placeholder="Feed name"
        onChangeText={(feed) => { setSubmitData({ ...submitData, "feed": feed }) }}
      />

      <View
        style={{ flexDirection: "row", margin: 20, justifyContent: "center" }}
      >

        <CheckBox
          style={{ alignSelf: "center" }}
          disabled={false}
          value={submitData.is_test}
          onValueChange={(newValue) => setSubmitData({ ...submitData, "is_test": newValue })}
        />
        <Text style={{ fontSize: 20 }}>Is customm device</Text>

      </View>
      <Button
        textContent={"Submit"}
        onPress={handleSubmit}
      />
    </ScrollView>
  );
}


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const styles = StyleSheet.create({
  container: {
    color: 'white',
    backgroundColor: '#333',
  },
});
