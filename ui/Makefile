include ../defs.mk

GIT_REPO := extreme-ui

BIN_UI = $(BIN_DIR)/staticui

UI_DIR = $(BUILD_DIR)/$(GIT_REPO)
UI_DIST = $(UI_DIR)/dist
UI_DIST_UI = $(UI_DIR)/dist/ui

all:$(BIN_UI)

$(BIN_UI): $(UI_DIST)
	mkdir -p $(@D)
	cd $(UI_DIST_UI);zip $@ -r *

NODEJS_VERSION = 9.4.0
NODEJS_LINUX = node-v$(NODEJS_VERSION)-linux-x64
NODEJS_LINK = https://nodejs.org/dist/v$(NODEJS_VERSION)/$(NODEJS_LINUX).tar.xz
NODEJS_HOME = $(BUILD_TOOLS)/$(NODEJS_LINUX)
export PATH := $(NODEJS_HOME)/bin:$(PATH)

NPM = npm

$(UI_DIST): $(BUILD_TOOLS) $(UI_DIR)
	$(RM) -r $(UI_DIR)/node_modules
	cd $(UI_DIR);$(NPM) cache clean --force
	$(RM) -r $(UI_DIR)/package-lock.json
	cd $(UI_DIR);$(NPM) install
	cd $(UI_DIR);$(NPM) install -g @angular/cli@6.1.0
	cd $(UI_DIR);ng build --prod --configuration="appProd" --aot --no-progress  # --base-href="/" --deploy-url="/"

# this section dynamically downloads a set of build tools instead of storing them in the repo
$(BUILD_TOOLS):
	mkdir -p $@
	curl $(NODEJS_LINK) -o $@/node.tar.xz
	tar -xf $@/node.tar.xz -C $@

$(UI_DIR): 
	mkdir -p $@
	cp -r ui/* $@

include ../rules.mk
