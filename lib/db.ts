       
       
       
       
       
       
       
       
       
       
       
       
       // import mysql from 'mysql2/promise'

       //  let connection:any;
       //  export const createConnection = async () => {
       //  if(!connection){
       //  connection = await mysql.createConnection({
       //  host: process.env.DATABASE_HOST,
       //  user: process.env.DATABASE_USER,
       //  password: process.env.DATABASE_PASSWORD,
       //  database: process.env.DATABASE_NAME,
       //  })}
       //  return connection;
       //  }





       import { Client } from 'pg';

let client: Client | null = null;

export const createConnection = async () => {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL, // Using the Supabase connection string
    });

    await client.connect();
  }
  return client;
};
