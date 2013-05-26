FINAL = dom-toolkit.js
SRC = src
WISP_BIN = node_modules/.bin/wisp

WISP_FILES = $(SRC)/core.wisp \
	   $(SRC)/dom.wisp

JS_FILES = $(WISP_FILES:.wisp=.js)

all: $(FINAL)

$(FINAL): $(JS_FILES)
	cat $(SRC)/head.js $^ $(SRC)/tail.js > $@
	rm -f $^

%.js: %.wisp
	cat $^ | $(WISP_BIN) | sed -e 's/^/  /g' > $@
	echo >> $@
	echo >> $@

clean: 
	rm -f $(FINAL)

.DEFAULT_GOAL := all
