package main

// Copyright (c) 2018 by Extreme Networks Inc.

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"uizip"
)

const (
	APP_PREFIX = "/extreme-central"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}
type Routes []Route

var staticRoutes = Routes{
	Route{
		"staticUIroot",
		"GET",
		"/",
		uizip.ExtractStaticFile,
	},
	Route{
		"staticUI",
		"GET",
		"/{page.*}",
		uizip.ExtractStaticFile,
	},
	Route{
		"staticAsset",
		"GET",
		"/assets/{page:.*}",
		uizip.ExtractStaticFile,
	},
}
var restRoutes = Routes{
	Route{
		"domainNode",
		"GET",
		"/domainNode/{nodeId}",
		domainNodeGet,
	},
	Route{
		"domainNode",
		"POST",
		"/domainNode",
		domainNodePost,
	},
	Route{
		"sites",
		"GET",
		"/sitesInDomainNode/{nodeId}",
		sitesInDomain,
	},
	Route{
		"devices",
		"GET",
		"/devicesInSite/{deviceId}",
		devicesInSite,
	},
}

func AddRoutes(router *mux.Router) *mux.Router {
	for _, route := range staticRoutes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}
    subRouter := router.PathPrefix(APP_PREFIX).Subrouter()
	for _, route := range restRoutes {
		subRouter.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
		log.Println(APP_PREFIX + route.Pattern)
	}
	return router
}

func DefaultNotfound(w http.ResponseWriter, r *http.Request) {
	log.Println("REST:", r.URL.Path)
	// w.Write([]byte("No REST for:" + r.URL.Path + "\n"))
	http.NotFound(w, r)
}
