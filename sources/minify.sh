#!/bin/bash

echo "[INFO] - Minify started";

echo "[INFO] - Merge typescript files inprogress...";
tsc --out ../generated-sources/pgn-viewer.js PgnViewer.ts --declaration --removeComments
echo "[INFO] - Merge typescript files into 'pgn-viewer.js' finished";

echo "[INFO] - Minify  javascript inprogress...";
/Users/kokeny/node_modules/uglify-js/bin/uglifyjs ../generated-sources/pgn-viewer.js -o ../generated-sources/pgn-viewer.min.js --compress --define --mangle


echo "[INFO] - Minify finished";
exit 1;
