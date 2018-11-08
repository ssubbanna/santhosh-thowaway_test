package main

// Copyright (c) 2018 by Extreme Networks Inc.

import (
	"net/http"
    "github.com/gorilla/mux"
    "encoding/base64"
    "encoding/json"
    "fmt"
    "bytes"
    "strings"
    "io"
    "log"
    "crypto/tls"
)
var siteDevList = make(map[string][]interface{})

func sitesInDomain(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    dn, err := domainDbGetId(params["nodeId"])
    if err != nil {
        http.NotFound(w, r)
        return
    }

    // dn has the IP:port to query the domain node
    switch dn.Type {
        case "xmc server":
            sitesInDomainXMC(w, r, dn)
        default:
            http.NotFound(w, r)
            return
    }
}

func basicAuth(username, password string) string {
    auth := username + ":" + password
    return base64.StdEncoding.EncodeToString([]byte(auth))
}

func sitesInDomainXMC(w http.ResponseWriter, r *http.Request, dn domainNode_t) {
    var jsonBody map[string]interface{}
    var err error

    http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
    client := &http.Client{}
    url := fmt.Sprintf("https://%s:%s/nbi/graphql", dn.Address, dn.Port)
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer([]byte(`{"query" : "{network {siteTree}}"}`)))

    req.Header.Add("content-type", "application/json")
    req.Header.Add("Authorization", fmt.Sprintf("Basic %s", basicAuth(dn.Userid, dn.Userpassword)))

    resp, err := client.Do(req)
    if err != nil {
        log.Println(err)
        http.Error(w, "Error connecting with XMC", 404)
        return
    }
    err = json.NewDecoder(resp.Body).Decode(&jsonBody)
    if err != nil {
        log.Println(err)
        http.Error(w, "Error decoding XMC site data", 500)
        return
    }
    //j,_ := json.MarshalIndent(jsonBody, "", " ")
    //log.Println(string(j))
    data := jsonBody["data"].(map[string]interface{})
    network := data["network"].(map[string]interface{})
    siteTree := network["siteTree"].(map[string]interface{})
    siteExtractDevid(siteTree, dn)

    d,_ := json.MarshalIndent(siteTree, "", "")
    lines := strings.Split(string(d), "\n")
    var id int
    for idx, line := range lines {
        if strings.HasPrefix(line, `"id"`) {
            fmt.Sscanf(line, `"id": %d,`,&id)
            lines[idx] = fmt.Sprintf(`"siteId": "%d","siteIdKey": "siteId:%s:%d",`, id, dn.Id, id )
        }
        if strings.HasPrefix(line, `"location"`) {
            if strings.Count(line, "/") > 1 {
                loc_parts := strings.Split(line, "/")
                //log.Println("loc_parts", loc_parts)
                loc := loc_parts[len(loc_parts) - 1]
                lines[idx] = lines[idx] + fmt.Sprintf(`"rootNodeChildren": "%s`,loc )
                //log.Println("line", lines[idx] )
            }

        }
    }
    //log.Println(lines)
    io.WriteString(w, strings.Join(lines, ""))
}

func siteExtractDevid(node map[string]interface{}, dn domainNode_t) {
    id := int(node["id"].(float64))
    siteIdKey := fmt.Sprintf("siteId:%s:%d", dn.Id, id )
    leaf := node["leaf"].(bool)
    devlist := node["devIdList"].([]interface{})
    for _, dev := range devlist {
        siteDevList[siteIdKey] = append(siteDevList[siteIdKey], int(dev.(float64)))
    }
    if leaf {
        return
    }
    children := node["children"].([]interface{})
    for _, child := range children {
        siteExtractDevid(child.(map[string]interface{}), dn)
    }
}
