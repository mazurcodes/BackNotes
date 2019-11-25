# Backend Notes

[[toc]]

# Express

---

## Instalation

Create new project

```
npm init -y
npm i express -S
```

## Importing modules, creating server

```
 const express = require("express");
 const app = express();
```

### Listening on port 3000

```
app.listen(3000, () => {
	console.log("Server is running on http://127.0.0.1:3000");
});
```

## Route methods of Express

---

- **GET** method requests a representation of the specified resource. Requests using GET should only retrieve data: + html + images + json

  ```
        app.get('/', (req, res) => {
            console.log("Retriving data");
        });
  ```

  ***

- **POST** method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.
  ```
        app.post('/', (req, res) => {
            console.log("Posting new data");
        });
  ```
  ***
- **PUT** method replaces all current representations of the target resource with the request payload.
  ```
      app.put('/', (req, res) => {
          console.log("Changing all data");
      });
  ```
  ***
- **PATCH** method is used to apply partial modifications to a resource.
  ```
        app.patch('/', (req, res) => {
            console.log(`Modification of data`);
        });
  ```
  ***
- **DELETE** method deletes the specified resource.
  ```
       app.delete('/', (req, res) => {
            console.log(`Deleting data`);
        });
  ```
  ***
  [[toc]]

---

## Object Request - req methods

```
  app.get('/', (req, res) => {
      console.log(req.query);
  });
```

- **req.query** - This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.

```
// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse

    console.dir(req.query.order)
    // => "desc"

    console.dir(req.query.shoe.color)
    // => "blue"

    console.dir(req.query.shoe.type)
    // => "converse"
```

- **req.get('Field')** Returns the specified HTTP request header field (case-insensitive match).

```
  req.get('Content-Type')
  // => "text/plain"
```

- **req.ip** Contains the remote IP address of the request.

```
  console.dir(req.ip)
  // => '127.0.0.1'
```

- **req.ips** Contains entire proxy route with ips
- **req.method** Contains string with method of the request (GET, POST...)
- **req.originalUrl** This property is much like req.url; however, it retains the original request URL, allowing you to rewrite req.url freely for internal routing purposes.

```
  app.get('/admin', function (req, res) { // GET 'http://www.example.com/admin/new'
      console.dir(req.originalUrl) // '/admin/new'
      console.dir(req.baseUrl) // '/admin'
      console.dir(req.path) // '/new'
  })
```

- **req.path** Contains the path last part of the request URL. See above.
- **req.params** This property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the “name” property is available as req.params.name. This object defaults to {}.

```
  app.get('/hi/:name/:surname', (req, res) => { GET 'http://www.example.com/hi/john/malkovitz
      console.log(req.params.name)      // 'john'
      console.log(req.params.surname)   // 'malkovitz'
  })
```

- **req.protocol** Contains the request protocol string: either _http_ or _https_.
- **req.secure** A Boolean property that is true if a TLS connection is established (true or false)

---

[[toc]]

## Object Response - res methods

```
    app.get('/', (req, res) => {
        res.send("Hello World");
    });
```

---

### Working with data

- **res.send("\<h1>HELLOOOOOO\</h1>")** Sends the HTTP response. The body parameter can be a Buffer object, a String, an object, or an Array. Array or Object is automatically converted to JSON, String is converted to HTML.[CHECK DOCS](https://expressjs.com/en/4x/api.html#res.send)
  For example:
  ```
      app.get('/', (req, res) => {
          res.send({some: 'json'});
      });
  ```
- **req.json('Field')** Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify(). [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.json)
  ```
    app.get('/', (req, res) => {
          res.json("Hello World"); // "Hello World"
      });
  ```
- **req.redirect(statusCode, path)** Returns the specified HTTP request header field (case-insensitive match). [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.redirect)
  ```
    app.get('/', (req, res) => {
          res.redirect(302, 'https://google.com');
      });
  ```

---

### Working with files

- **res.sendFile(path, {options}, callback)** Transfers the file at the given path. Sets the Content-Type response HTTP header field based on the filename’s extension. Unless the root option is set in the options object, path must be an absolute path to the file. [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.sendFile)
  ```
      app.get('/', (req, res) => {
          res.sendFile('http://www.mywebsite/file/kitten.jpg');
      });
  ```
- **res.attachment(path)** Sets the HTTP response Content-Disposition header field to “attachment”. If a filename is given, then it sets the Content-Type based on the extension name via res.type(), and sets the Content-Disposition “filename=” parameter. [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.attachment)
  ```
      app.get('/', (req, res) => {
          res.attachment('http://www.mywebsite/file/kitten.jpg');
      });
  ```
- **res.download(pathFileToSend, outputFileForClient, {options})** Same as two previous methods combined. Sends file but we can also set options from same as in sendFile. [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.download)

  ```
      app.get('/', (req, res) => {
          res.download('/file/kitten.jpg', 'super-cute-kitten.jpg');
      });
  ```

---

### Working with headers

- **res.set({'field': 'value', 'field2': 'value2'})** Sets the response’s HTTP header field to value. To set multiple fields at once, pass an object as the parameter. [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.set)

  ```
      app.get('/', (req, res) => {
          res.set('field', 'value');
      });
  ```

  ```
      app.get('/', (req, res) => {
          res.set({
            'Content-Type': 'text/plain',
            'Content-Length': '123',
            'ETag': '12345'
          });
      });
  ```

- **res.headersSent** Boolean property that indicates if the app sent HTTP headers for the response. (true or false) [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.headersSent)

  ```
      app.get('/', (req, res) => {
          res.set('field', 'value');
          console.log(res.headersSent) // "true"
      });
  ```

- **res.cookie** Sets cookie name to value. The value parameter may be a string or object converted to JSON. [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.cookie)

  ```
      app.get('/', (req, res) => {
          res.cookie('name', 'tobi', { domain: '.example.com', secure: true });
      });
  ```

- **res.clearCookie** Clears the cookie specified by name. [CHECK DOCS](https://expressjs.com/en/4x/api.html#res.clearCookie)

  ```
      app.get('/', (req, res) => {
          res.cookie('name', 'tobi', { path: '/admin' });
          res.clearCookie('name', { path: '/admin' });
      });
  ```

---

[[toc]]

---

## Middleware

```
  app.use(someMiddleware());
```

- **REMEMBER** Always register middlewares before routes

---

### Built-In Middleware

- **express.json()** It parses incoming requests with JSON payloads and populates req.body with JSON data. [CHECK DOCS](http://expressjs.com/en/4x/api.html#express.json)

  ```
      app.use(express.json());
  ```

- **express.static()** It serves static files and is based on serve-static. [CHECK DOCS](http://expressjs.com/en/4x/api.html#express.static)

  ```
      app.use(express.static());
  ```

---

### "Need to install" Middleware

- **cookie-parser** Parse Cookie header and populate req.cookies with an object keyed by the cookie names. [CHECK DOCS](https://www.npmjs.com/package/cookie-parser)

  ```
      npm install cookie-parser --save
      npm i cookie-parser -S
  ```

  ```
      var express = require('express');
      var cookieParser = require('cookie-parser');

      var app = express();
      app.use(cookieParser());
  ```
