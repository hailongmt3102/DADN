export const key_set = {
    field_location_index: "FIELD NO.",
    farm_name: "NAME",
    farm_create_at: "CREATED",
    air_humidity: "AIR HUMIDITY",
    air_temperature: "TEMPERATURE",
    area_length: "LENGTH",
    area_width: "WIDTH",
    field_create_at: "CREATED",
    ground_humidity: "GROUND HUMIDITY",
    is_relay_on: "IS WATER",
    record_time: "LAST UPDATE",
    plant: "PLANT",
    crop_start_date: "START",
    crop_harvest_date: "HARVEST",
    crop_state: "STATUS",
}

export const shorternstr = (param) => {
    const temp = param.toString()
    if (temp.length > 5)
        return temp.slice(0, 7)
    return temp
}

export const short_date = (param) => {
    try {
        var temp = new Date(Date.parse(param))
        return (temp.getHours().toString() + ":" + temp.getMinutes().toString() +
            "," + (temp.getDay() + 1) + "/" + temp.getMonth() + "/" + temp.getFullYear()
        )
    }
    catch (err) {
        return param
    }
}
export const date_of_date = (param) => {
    try {
        var temp = new Date(Date.parse(param))
        return (
            temp.toDateString()
        )
    }
    catch (err) {
        return param
    }
}
export const crop_state = {
    0: "HYDRATED",
    1: "DEHYDRATED",
    2: "HARVESTED",
}