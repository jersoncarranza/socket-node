import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';
//const server = new Server();
const server = Server.instance;

//Body Parser
server.app.use(bodyParser.urlencoded({extended:true}))
// server.app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
//   })
// CORS
server.app.use(cors ({ origin:true, credentials:true}));
server.app.use('/', router)
server.start(() =>{
    console.log(`Runner port: ${ server.port }`);
});
