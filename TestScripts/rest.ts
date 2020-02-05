import { factory } from "../ConfigLog4j";

const should = require( "should" );
const request = require( "request" );
const getURL = "https://reqres.in/api/users?page=2";
const posttURL = "https://reqres.in/api/users";
const putURL = "https://reqres.in/api/users/2";

const util = require( "util" );
const log = factory.getLogger( "protractor" );

var postObj = require( '../TestData/post.json' );

var putObj = require( '../TestData/put.json' );

describe( 'API Get response', function() {
    it( 'returns API Get response', function( done ) {
        request.get( { url: getURL },
            function( error, response, body ) {
                const bodyObj = JSON.parse( body );
                log.info(() => "body is :z " + body );
                log.info(() => "error :: " + error );
                log.info(() => "response status is ::‘" +
                    response.statusCode );
                console.log( response.headers['content—type'] )

                expect( response.statusCode ).toEqual( 200 );
                done();
            } )
    } );


    it( 'returns POST response', function( done ) {
        request.post( putURL, {
            form: postObj
        }, function( error, response, body ) {
            const bodyobj = JSON.parse( body );
            log.info(() => "body is :: " + body );
            log.info(() => "error :: " + error );
            log.info(() => "response status is :: " + response.statusCode );
            console.log( response.headers['Content—type'] )
            expect( response.statusCode ).toEqual( 201 );
            done()
        } )
    } );

    it( 'returns PUT response', function( done ) {

        request.put( putURL, {
            form: putObj
        }, function( error, response, body ) {
            const bodyObj = JSON.parse( body );
            log.info(() => "body is :: " + body );
            log.info(() => "error :: " + error );
            log.info(() => "response status is :: " + response.statusCode );
            console.log( response.headers['content—type'] )
            expect( response.statusCode ).toEqual( 200 );
            done();
        } );
    } );
} );