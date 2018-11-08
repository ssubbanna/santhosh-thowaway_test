package main

// Copyright (c) 2018 by Extreme Networks Inc.

import (
	"net/http"
    "github.com/gorilla/mux"
    "encoding/json"
    "fmt"
    "bytes"
    "strings"
    "crypto/tls"
)


func devicesInSite(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)

    did := params["deviceId"]
    didParts := strings.Split(did,":")
    if len(didParts) < 3 {
        http.NotFound(w, r)
        return
    }

    nodeId := didParts[1]
    //siteId := didParts[2]

    dn, _ := domainDbGetId(nodeId)

    // dn has the IP:port to query the domain node
    switch dn.Type {
        case "xmc server":
            devicesInSiteXMC(w, r, dn, did)
        default:
            http.NotFound(w, r)
            return
    }
}

func devicesInSiteXMC(w http.ResponseWriter, r *http.Request, dn domainNode_t, siteId string) {
    var jsonBody map[string]interface{}
    var err error

    http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
    client := &http.Client{}
    url := fmt.Sprintf("https://%s:%s/nbi/graphql", dn.Address, dn.Port)
    req, _ := http.NewRequest("POST", url, 
        bytes.NewBuffer([]byte(`{"query" : "{network {devices{
                                ip
                                status
                                deviceId
                                chassisId
                                deviceDisplayFamily
                                deviceName
                                sysUpTime
                                sysContact
                                sysLocation
                                sitePath
                                siteId
                                firmware
                                deviceData
                                {assetTag, archiveId, jsonVendorProfile}}}}"}`)))

    req.Header.Add("content-type", "application/json")
    req.Header.Add("Authorization", fmt.Sprintf("Basic %s", basicAuth(dn.Userid, dn.Userpassword)))

    resp, err := client.Do(req)
    if err != nil {
        http.Error(w, "Error connecting with XMC", 404)
        return
    }
    err = json.NewDecoder(resp.Body).Decode(&jsonBody)
    if err != nil {
        http.Error(w, "Error decoding XMC site data", 500)
        return
    }

    var devOut []interface{}

    data := jsonBody["data"].(map[string]interface{})
    network := data["network"].(map[string]interface{})
    deviceList := network["devices"].([]interface{})

    siteDevList, ok := siteDevList[siteId]
    if ok {
        for _, devInterface := range deviceList {
            devMap := devInterface.(map[string]interface{})
            devId := int(devMap["deviceId"].(float64))
            for _, siteDev := range siteDevList {
                if devId == siteDev {
                    devOut = append(devOut, devInterface)
                }
            }
        }
    }
    if len(devOut) == 0 {
        devOut = append(devOut, make(map[string][]interface{}))
    }

    json.NewEncoder(w).Encode(devOut)
}

