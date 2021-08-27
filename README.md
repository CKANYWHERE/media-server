

#Nginx File Stream & Nest File Upload

- install nginx frist
- paste to nginx.conf file your nginx.conf file
- npm i .
- npm run start:dev
- create .env and configure NGINX_UPLOAD_FILE_PATH, SERVER_HOST
- send api with post localhost:3000/${array: array<files> ,field (array<file1>, array<file2>) , single file} with form data