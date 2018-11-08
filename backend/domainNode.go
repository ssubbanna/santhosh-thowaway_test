package main

// Copyright (c) 2018 by Extreme Networks Inc.

import (
    "encoding/json"
	"log"
	"net/http"
    "github.com/gorilla/mux"
	"os"
	"path/filepath"
    "errors"
    "sort"
)

type domainNodeGetElem struct {
    DomainNodeId    string `json:"domainNodeId"`
    DomainNodeType  string `json:"domainNodeType"`
}

type domainNode_t struct {
	Type            string `json:"type"`
	Userid          string `json:"userid"`
	Userpassword    string `json:"userpassword"`
    Port            string `json:"port"`
    Address         string `json:"address"`
    Id              string `json:"id"`
}

type DomainMap_t map[string]domainNode_t

const (
    DOMAIN_FILE = "domain.json"
)

func domainNodeGet(w http.ResponseWriter, r *http.Request) {
    var getList []domainNodeGetElem
    for _, dn := range domainDbGet() {
        var d domainNodeGetElem
        d.DomainNodeId = dn.Id
        d.DomainNodeType = dn.Type
        getList = append (getList, d)
    }
    sort.Slice(getList, func(i, j int) bool {return getList[i].DomainNodeId < getList[j].DomainNodeId })
    json.NewEncoder(w).Encode(getList)
}

/*
func domainNodeGet(w http.ResponseWriter, r *http.Request) {
    var getList []domainNodeGetElem
    var wg sync.WaitGroup

    params := mux.Vars(r)
    messages := make(chan domainNodeGetElem, 100)

    for idx := 1; idx < 20; idx++ {
        wg.Add(1)
        go func(idx int) {
            var d domainNodeGetElem
            d.DomainNodeId = strconv.Itoa(idx)
            d.DomainNodeType = "xmc server"
            messages <- d
            wg.Done()
        }(idx)
    }

    wg.Wait()
    close(messages)
    for d := range messages {
        getList = append (getList, d)
    }

    json.NewEncoder(w).Encode(getList)
}
*/

func domainNodePost(w http.ResponseWriter, r *http.Request) {
    var dnode domainNode_t
    params := mux.Vars(r)
	log.Println("REST domainNode Post:", r.URL.Path, "params", params)
    _ = json.NewDecoder(r.Body).Decode(&dnode)
    log.Println(dnode)
    dnMap := domainDbGet()
    dnMap[dnode.Id] = dnode
    domainDbSet(dnMap)
}

func domainDbGet() (domainMap DomainMap_t) {
    // convert to DB
	// look for files in the same directory with the executable
	ex, _ := os.Executable()
	domainPath := filepath.Join(filepath.Dir(ex), DOMAIN_FILE)
    fd, err := os.Open(domainPath)
    if err != nil {
        domainMap = make(DomainMap_t)
        return
    }
    defer fd.Close()

    _ = json.NewDecoder(fd).Decode(&domainMap)
    return
}

func domainDbGetId(nodeId string ) (dn domainNode_t, err error) {
    // convert to DB
    dnMap := domainDbGet()
    dn, ok := dnMap[nodeId]
    if ok {
        err = nil
        return
    }
    err = errors.New("node ID notfound")
    return
}

func domainDbSet(domainMap DomainMap_t) {
    // convert to DB
	ex, _ := os.Executable()
	domainPath := filepath.Join(filepath.Dir(ex), DOMAIN_FILE)
    fd, err := os.Create(domainPath)
    if err != nil {
        return
    }
    defer fd.Close()

    _ = json.NewEncoder(fd).Encode(domainMap)
    return
}
