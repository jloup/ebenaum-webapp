SHELL=/bin/bash
ENV ?= dev
export PATH := $(PATH):./node_modules/.bin:/home/admin/.nvm/versions/node/v11.1.0/bin/

# Static resources
TS_SRC=$(wildcard src/*.ts src/*.tsx) src/css/style.css
STATIC_BUILD_DIR=build/dist
STATIC_FILES=index.html

# Rules
install:
	node --version
	npm --version
	#yarn --version
	#yarn install

static: $(addprefix $(STATIC_BUILD_DIR)/, $(STATIC_FILES)) $(STATIC_BUILD_DIR)/bundle.js

run-dev:
	node server.js

$(STATIC_BUILD_DIR)/bundle.js: $(TS_SRC) webpack.$(ENV).js
	webpack --config webpack.$(ENV).js

$(STATIC_BUILD_DIR)/%: static/% $(STATIC_BUILD_DIR)
	cp $< $@

$(STATIC_BUILD_DIR):
	mkdir -p $@

clean:
	rm -rf build
	rm -rf node_modules
