import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CropDetail from "../../Component/CropDetail"
import CenterButton from "../../Component/CenterButton"
import { stack_navigate } from "../../Context/NavigationRoot"
const FieldLastedCrop = (props) => {
    const { field_id } = props
    const [data, setData] = useState({})

    return (
        <ScrollView>
            <CropDetail {...props} mode={"field"} field_id={field_id} data={data} setData={setData} />
            {data["field_id"] ?
                (data["id"] ?
                    (
                        <CenterButton
                            action={() => { stack_navigate("Crop", { crop_id: data["id"] }) }}
                            text={"Detail"}
                            color={"red"} />
                    ) : (
                        <CenterButton
                            action={() => { stack_navigate("CreateCrop", {}) }}
                            text={"New crop"}
                            color={"red"} />
                    )) : (
                    <></>
                )

            }

        </ScrollView>
    )
}

export default FieldLastedCrop;