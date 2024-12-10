const express = require('express');
const next = require('next');
const { parse } = require('url');


const postsApi = require('./src/api/posts');
const addItemApi = require('./src/api/additem');
const logApi = require('./src/api/auth/admin');
const regApi = require('./src/api/auth/adminreg');


const dev = process.env.NODE_ENV !== 'production'; 
const hostname = 'app.sjggroupleaflet'; 
const port = process.env.PORT || 3000; 

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

  app.prepare().then(() => {
  const server = express(); 


  server.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.url}`);
    next(); 
  });

  
  
  server.use('/api/posts', postsApi);        
  server.use('/api/add-item', addItemApi);   
  server.use('/api/auth/admin', logApi);    
  server.use('/api/auth/adminreg', regApi);  

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true); 
    return handle(req, res, parsedUrl); 
  });

  server.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(err.status || 500).json({ error: 'Internal Server Error' });
  });

  
  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}).catch((err) => {
  console.error(`[ERROR] Failed to prepare Next.js app: ${err.message}`);
});
