# Rust RCON-API

The general idea is that you can set up a simple API server that will allow you to send authenticated requests to it... the server will execute those commands on the specified Rust server via RCON websocket.

For this proof of concept I made one /give route that accepts a POST. When properly executed it will use the [give plugin](http://oxidemod.org/plugins/give.666/) to give the specified item(s) to the specified user.

I am using a REALLY simple (not super secure) method for validating the requests. The "client" (havent written one yet) making the request will use a secret key to hash the request data. This is sent as an auth header and verified on the server before the command is executed. Since the server and client both know the secret key, this is good enough for proof of concept security. 

An example request: 
```shell
curl -X POST \
  http://localhost:8000/give \
  -H 'auth: cf9cfff502a71b5fc59a444740c3339b' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'user=76561198026242506&item=syringe.medical&amount=1'
```

This example assumes the shared secret key is "this.should.be.a.longish.preferably.random.secret.key"

To generate the auth hash (used in the header) you build the a string like so:

```user|item|amount|secret_key```

so, for this example post:

```76561198026242506|syringe.medical|1|this.should.be.a.longish.preferably.random.secret.key```

Which, if you generate an MD5 hash, gives you this: ```cf9cfff502a71b5fc59a444740c3339b``` ---  [try it](http://www.miraclesalad.com/webtools/md5.php)

Since this can be calculated on both sides, the server can validate the request without sending the actual key.  

Ill probably want to use json web tokens or something in the future but again, this is just proof of concept.

# Setup

I assume you have some knowledge of node.js ... if not you should probably read up on that before doing much with this.

 * clone the reposiory and cd into the directory
 * use ```npm install``` to install the dependencies
 * copy .env_template and rename to .env
 * edit .env to use your server ip, port, pass and a key of your choosing - [generate something here?](https://randomkeygen.com/)
 * you should be able to start the server with ```node app.js```

if you were successful, you should see output something like:

```
Running on port 8000
CONNECTED
MESSAGE: ServerMessage {
  message: 'hello world!',
  type: 'Generic',
  stacktrace: null,
  identity: 0,
  time: 1510094552372 }
MESSAGE: ServerMessage {
  message: '',
  type: 'Generic',
  stacktrace: null,
  identity: 0,
  time: 1510094552462 }
```

You can now use curl or PostMan to send test requests to http://localhost:8000/give

remember to hash the data carefully (or remove my security and replace) and send the auth header.

Postman example (same as curl example above):

![alt text](https://i.imgur.com/QGBemkV.png)

![alt text](https://i.imgur.com/s9ysoPI.png)
