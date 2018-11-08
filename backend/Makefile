include ../defs.mk
# Golang
GO_COMMON_PKGS = $(TOP_DIR)/common
DOWNLOAD_GO = https://dl.google.com/go/go1.11.1.linux-amd64.tar.gz

export GOBIN := $(BIN_DIR)
export GOPATH := $(BUILD_GOPKG):$(GO_COMMON_PKGS)
export GOROOT := $(BUILD_TOOLS)/go
export PATH := $(GOROOT)/bin:$(PATH)

GO_PACKAGES = \
	github.com/gorilla/mux \
	github.com/gorilla/handlers

BUILD_GO_PKGS = $(addprefix $(BUILD_GOPKG)/src/,$(GO_PACKAGES))

all: install_test

.PHONY: install_test install test
install_test: install
install_test test:
ifeq ($(V),1)
	go test -v
else
	go test
endif

install: $(BUILD_GO_PKGS)
	go install

$(BUILD_GO_PKGS): $(GOROOT)
	echo $@
	mkdir -p $(BUILD_GOPKG)
	go get $(subst $(BUILD_GOPKG)/src/,,$@)

# this section dynamically downloads a set of build tools instead of storing them in the repo
$(GOROOT):
	mkdir -p $(@D)
	cd $(@D);curl -O $(DOWNLOAD_GO)
	tar -xf $(@D)/*.gz -C $(@D)
	echo $(PATH)
	which go
	go version
