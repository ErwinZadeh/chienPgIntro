// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pg = require( 'pg' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = 5000;
// db setup
const pool = new pg.Pool({
    database: 'music_library',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 30000
}); //end pool
// server up
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) //end server up
// routes
app.get( '/songs', ( req, res )=>{
    console.log( 'in /songs GET' );
    // set up a query 
    let queryString = 'SELECT * FROM songs';
    // try to run query on our pool
    pool.query( queryString ).then( ( results )=>{
        // if successful, we'll send response with rows from results
        res.send( results.rows );
    }).catch( ( err )=>{
        // catch any errors
        console.log( err );
        res.sendStatus( 500 );
    })
}); //end /songs GET