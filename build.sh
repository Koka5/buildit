rm -rf static
rm -rf dist
mkdir static
mkdir dist
mkdir dist/static
mkdir static/js
mkdir static/css

node dev/cpVendorCssJs
cp -r dev/static/font static/

node dev/build
node_modules/json2server/bin/json2server -o=1
#node_modules/json2server/bin/json2server -o=static/js/client.js -b=1
cp server.js dist/

node dev/minifyAllCssJs

cp static/*-*.css dist/static/
cp static/index.html dist/static/
cp static/*-*.js dist/static/
cp -r static/font dist/static/
