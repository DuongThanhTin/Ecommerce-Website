var LocalStrategy = require('passport-local').Strategy

var mysql = require('mysql')
var bcrypt = require('bcrypt-nodejs')
var dbconfig = require('./database')

rts= function(passport){
    passport.serializedUser(function(user,done){
        done(null,user.username)
    })

    passport.deserializedUser(function(username,done){
        mysqlconnection.query("select * from user where username = ?",[username]),
        function(err, rows){
            done(err,rows[0])
        }
    })
}
