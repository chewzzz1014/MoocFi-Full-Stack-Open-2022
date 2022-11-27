// install JSON server
npm install -g json-server

// run json-server
// assume that we have a db.json file
npx json-server --port 3001 --watch db.json

// to change port (default is 3000)
json-server --port 3001 --watch db.json





// Install json-server as a development dependency (only used during development) 
npm install json-server --save-dev

// We can now conveniently, without parameter definitions, start the json-server from the project root directory
npm run server
