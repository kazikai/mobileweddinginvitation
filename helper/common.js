var path = require( 'path' );

module.exports.register = function( Handlebars, options, params ){
  Handlebars.registerHelper( 'path', function( prev, next ) {
    return path.relative( prev, next );
  });
};