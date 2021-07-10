import React, { useState, useEffect } from 'react';

export const baseURL = "http://192.168.1.1"

function Request(method, url,data)  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, baseURL+ url)
    xmlhttp.setRequestHeader("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyNDg2ODIyNTgyLCJqdGkiOiIyNGEwNWY4ZTYxNTA0MzhmOTlkN2RjODMwNTU1NWE2MiIsInVzZXJfaWQiOjF9.dEI1cSA5yFA9urLUkqu-_OG4hyq3h7e7o58-8Bmuw60")
    xmlhttp.setRequestHeader('Content-Type', 'application/json')
    xmlhttp.setRequestHeader('accept', 'application/json')
    return xmlhttp
}

export default Request;




