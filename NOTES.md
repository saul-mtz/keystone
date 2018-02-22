Publicar una nueva versión:

babel . -d dist --copy-files --ignore dosc,node_modules,test
yarn build
mv admin/public/js/packages.js dist/admin/public/js
cp admin/server/app/createStaticRouter.js dist/admin/server/app
