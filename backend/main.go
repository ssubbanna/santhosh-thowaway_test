/*
ExtremeCentral Manager of Managers

Copyright (c) 2018 by Extreme Networks Inc.

The ExtremeCentral container application is a Manager of Managers (MoM) to provided a consolidated view across
a range of domain management systems.

E.g. ExtremeCentral provides an aggregate view of:
    - multiple Extreme Manaagment Center (XMC) systems
    - multiple Extreme Cloud Appliance (XCA) systems
    - multiple Extreme Cloud accounts
    - (future) 3rd party management systems that offer Northbound APIs
*/
package main

import (
	"github.com/gorilla/mux"
    "github.com/gorilla/handlers"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"uizip"
)

// CONSTANTS
const (
	DEFAULT_PORT      = "10010"
	VERSION_FILE_NAME = "version"
	UI_URL_PREFIX     = "/"
	UI_ZIP_FILE_NAME  = "staticui.zip"
)

// GLOBAL VARIABLES
var (
	version string
)


func GetVersion() string {
	return version
}

func loadVersion(ex string) (err error) {
	verPath := filepath.Join(filepath.Dir(ex), VERSION_FILE_NAME)
	version_text, err := ioutil.ReadFile(verPath)
	if err != nil {
		log.Println(err)
		log.Println("Running", verPath, "Version Unknown")
		return
	}
	version = strings.TrimSuffix(string(version_text), "\n")
	log.Println("Running", ex, "Version:", version)
	return
}

func initUI(ex string) (err error) {
	uiPath := filepath.Join(filepath.Dir(ex), UI_ZIP_FILE_NAME)
	// init the static GUI pages zip file handler
	if err = uizip.Init(UI_URL_PREFIX, uiPath); err != nil {
		return
	}
	log.Println("Serving static files from", uiPath)
	return
}

func main() {
	// default http port if none provided
	port := DEFAULT_PORT

	// get the server port number from the command line
	if len(os.Args) == 2 {
		port = os.Args[1]
	}


	// look for files in the same directory with the executable
	ex, _ := os.Executable()

	// read version
	loadVersion(ex)

	// init the static GUI pages zip file handler
	initUI(ex)

	log.Println("Server started at http://localhost:" + port)

	muxRouter := mux.NewRouter().StrictSlash(true)
	router := AddRoutes(muxRouter)
	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS()(router)))
}
