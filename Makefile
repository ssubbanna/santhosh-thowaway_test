include defs.mk
SUBDIRS = \
	backend

UI_SUBDIR = \
	ui

SUB_MAKES := $(addsuffix /Makefile, $(SUBDIRS))
.PHONY: all $(SUB_MAKES) gui

APP = xcentral
DOCKER_DOCKER = $(BIN_DIR)/$(APP)_$(NEXT_VERSION).docker
DOCKER_CENTOS = $(BIN_DIR)/$(APP)_$(NEXT_VERSION)_centos.docker
DOCKER_INSTALL = $(BIN_DIR)/$(APP)_$(NEXT_VERSION)
DOCKER_TAG = $(APP):$(NEXT_VERSION)
TOOLS_INSTALL_PREFIX = $(TOOLS_DIR)/install_prefix
BIN_VER = $(BIN_DIR)/version

all: $(DOCKER_INSTALL)

$(DOCKER_INSTALL): $(DOCKER_DOCKER)
	sed -e s/_RELEASE_/$(NEXT_VERSION)/g -e s/_APP_/$(APP)/g < $(TOOLS_INSTALL_PREFIX) | cat - $(DOCKER_DOCKER) > $@
	chmod +x $@

$(DOCKER_DOCKER): $(SUB_MAKES)
	echo $(PWD)
	docker build --tag $(DOCKER_TAG) . && docker save $(DOCKER_TAG) -o $@
	docker image rm -f `docker images | grep $(APP) | awk '{print $$3}'`
	chmod ugo+rw $@

$(SUB_MAKES): $(BIN_VER) gui
	$(MAKE) -C $(@D)

$(BIN_VER):
	mkdir -p $(@D)
	echo $(NEXT_VERSION) > $@

# speical make to forec GUI to build first
gui:
	$(MAKE) -C $(UI_SUBDIR)

centos: $(DOCKER_CENTOS)
$(DOCKER_CENTOS):
	docker build --file Dockercentos --tag $(DOCKER_TAG) . && docker save $(DOCKER_TAG) -o $@


include rules.mk
