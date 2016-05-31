const _request = require( 'request' );

var url = 'http://localhost:3000';
var adduser_route = '/adduser';
var authenticate_route = '/authenticate';

var base_options = {
    method: 'POST',
    header: {
        'Content-Type': 'application/json',
        'User-Agent': 'sinopia'
    }
};

var encrypt = function ( str ) {
    return str;
};

function SinopiaRequest( config, stuff ) {

    /*    console.log( 'sinopia-request -----' );
     console.log( config );
     console.log( stuff );
     console.log( '---------------------' );*/

    var request = function ( user, password, route, callback ) {

        var options = base_options;
        options.url = url + route;
        options.json = {
            user: user,
            password: encrypt( password )
        };

        _request( options, function ( err, res, body ) {
            console.log(body);
            if ( err ) {
                err.status = 500;
                return callback( err );
            }
            else if ( body === undefined || body.result === undefined ) {
                err = new Error( 'Bad server response.' );
                err.status = 500;
                return callback( err );
            }
            else
                return callback( null, res.result );

        } );

    };

    this.adduser = function ( user, password, callback ) {
        return request( user, encrypt( password ), adduser_route, callback );
    };

    this.authenticate = function ( user, password, callback ) {
        return request( user, encrypt( password ), authenticate_route, callback );
    };

}

module.exports = function ( config, stuff ) {
    return new SinopiaRequest( config, stuff );
};