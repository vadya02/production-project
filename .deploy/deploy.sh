cd ..
npm run build:prod

rm -rf /var/www/production_project/html

mv /opt/course/production-project/build /var/www/production_project/html