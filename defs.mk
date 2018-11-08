TOP_DIR := $(shell z=$(PWD);while true; do if [ -f $$z/defs.mk ]; then echo $$z; break;fi;z=`dirname $$z`; done)
# tools
TOOLS_DIR = $(TOP_DIR)/tools

VERSION = $(shell cat $(TOP_DIR)/version)
NEXT_VERSION = $(shell $(TOP_DIR)/tools/next_version)

# bin contents
BIN_DIR := $(TOP_DIR)/_bin

# temp build
BUILD_DIR := $(TOP_DIR)/_build
BUILD_TOOLS := $(BUILD_DIR)/tools
BUILD_GOPKG := $(BUILD_DIR)/go

