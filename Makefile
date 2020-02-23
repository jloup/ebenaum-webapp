SHELL=/bin/bash
ENV ?= dev
export PATH := $(PATH):./node_modules/.bin:/home/admin/.nvm/versions/node/v11.1.0/bin/

# Static resources
TS_SRC=$(wildcard src/*.ts src/*.tsx) src/css/style.css
BUILD_DIR=build
STATIC_BUILD_DIR=build/dist
STATIC_FILES=index.html
CONTENT_BUILD_DIR = $(BUILD_DIR)/ebenaum-content-master

# Rules
install:
	node --version
	npm --version
	yarn --version
	yarn install

static: $(addprefix $(STATIC_BUILD_DIR)/, $(STATIC_FILES)) $(STATIC_BUILD_DIR)/copy.json $(STATIC_BUILD_DIR)/bundle.js

run-dev:
	node server.js

$(STATIC_BUILD_DIR)/bundle.js: $(TS_SRC) webpack.$(ENV).js
	webpack --config webpack.$(ENV).js

$(CONTENT_BUILD_DIR)/content/website/*.json: $(BUILD_DIR)/ebenaum-content-master

$(STATIC_BUILD_DIR)/copy.json: $(CONTENT_BUILD_DIR)/content/website/*.json
	jq -s 'map( { (.title|tostring|ascii_downcase|gsub(" "; "-")): .body } ) | add' $(CONTENT_BUILD_DIR)/content/website/*.json > $@

$(BUILD_DIR)/ebenaum-content-master: $(BUILD_DIR)
ifeq ($(INCOMING_HOOK_BODY),update-type=content)
  wget -O $(BUILD_DIR)/master.zip https://github.com/jloup/ebenaum-content/archive/master.zip
  unzip -a $(BUILD_DIR)/master.zip -d $(BUILD_DIR)
else
	cp -R content-repo $(BUILD_DIR)/ebenaum-content-master
endif

$(STATIC_BUILD_DIR)/%: static/% $(STATIC_BUILD_DIR)
	cp $< $@

$(STATIC_BUILD_DIR):
	mkdir -p $@

clean:
	rm -rf build
	rm -rf node_modules
