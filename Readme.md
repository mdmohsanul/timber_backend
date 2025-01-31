- Create a folder
- npm init -y
- npm i mongoose dotenv express cors
- npm i jsonwebtoken
- npm i bcryptjs

{
"version": 2,
"builds": [
{ "src": "server.js", "use": "@vercel/node" },
{ "src": "/index.html", "use": "@vercel/static" }
],
"routes": [
{ "src": "/api/(.*)", "destination": "/server.js" },
{ "src": "/(.*)", "destination": "/index.html" }
],
"headers": [
{
"source": "/api/(._)",
"headers": [
{ "key": "Access-Control-Allow-Credentials", "value": "true" },
{ "key": "Access-Control-Allow-Origin", "value": "_" },
{ "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
{ "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
]
}
]
}
