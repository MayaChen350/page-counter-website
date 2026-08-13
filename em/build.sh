#!/bin/sh
INPUT="include/page_counter.c include/utils.c include/include/ttf.c"
OUTPUT="test.js"
EXPORTED_FUNCTIONS="_page_count"

emcc $INPUT -o $OUTPUT -sEXPORT_ES6=1 -sMODULARIZE=1 -sEXPORTED_FUNCTIONS="$EXPORTED_FUNCTIONS" -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,FS -sEXIT_RUNTIME=1 --embed-file include/arial.ttf@/arial.ttf
