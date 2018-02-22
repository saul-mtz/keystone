Publicar una nueva versión:

release_version=x.z.y
git flow release start "$release_version"

babel . -d dist --copy-files --ignore dosc,node_modules,test
yarn build
mv admin/public/js/packages.js dist/admin/public/js
cp admin/server/app/createStaticRouter.js dist/admin/server/app

git flow release finish "$release_version"

git push origin develop
git push origin --tags
