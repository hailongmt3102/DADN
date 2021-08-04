import axiosInstance from './Axios'

export const key_set = {
    location_index              : 'FIELD NO.',
    name                        : 'NAME',
    created_at                  : 'CREATED AT',
    latitude                    : 'LATITUDE',
    longtitude                  : 'LONGTITUDE',
    image                       : 'IMAGE',
    farm_create_at              : 'CREATED',
    air_humidity                : 'HUMIDITY',
    air_temperature             : 'TEMPERATURE',
    area_length                 : 'LENGTH',
    area_width                  : 'WIDTH',
    field_create_at             : 'CREATED',
    ground_humidity             : 'GROUND HUMIDITY',
    relay                       : 'RELAY',
    record_time                 : 'LAST UPDATE',
    plant                       : 'PLANT',
    crop_start_date             : 'START',
    crop_harvest_date           : 'HARVEST',
    crop_state                  : 'STATUS',
    production_name             : 'PLANT',
    production_period           : 'PERIOD',
    record_at                   : 'RECORD AT',
    period                      :'PERIOD',
    temp_lower_bound            : 'TEMP LOWER BOUND',
    temp_upper_bound            : 'TEMP UPPER BOUND',
    soil_humid_lower_bound      : 'SOIL HUMID LOWER BOUND',
    soil_humid_upper_bound      : 'SOIL HUMID UPPER BOUND',
    production                  : 'PLANT',
    started_at                  : 'PLANT AT',
    harvested_at                : 'HARVESTED AT',
    state                       : 'STATE',
    updated_at                  : 'LAST UPDATE',
    index                       : 'INDEX',
    width                       : 'WIDTH',
    length                      : 'LENGTH',

}

export const crop_state = {
    0: 'HYDRATED',
    1: 'DEHYDRATED',
    2: 'HARVESTED',
}

export const stringToDate = (param) => {
    return new Date(Date.parse(param))
}

export const dateToDDMMYYYY = (day) => {
    return day.toDateString()
}

export const validation = {
    isEmailAddress: function (str) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty: function (str) {
        var pattern = /\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber: function (str) {
        var pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
    },
    isSame: function (str1, str2) {
        return str1 === str2;
    },
    isInteger: (str) => {
        var pattern = /^\d+$/;
        return pattern.test(str);
    }
};

export function ToggleField(fieldUUID, val) {
    return axiosInstance.post("/api/farms/fields/toggle", {
        'uuid':fieldUUID,
        "relay": val
    })
}