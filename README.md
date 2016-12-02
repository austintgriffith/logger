# logger

POST a JSON object to /:yournamespace

![alt tag](https://s3.amazonaws.com/madshot/ad2b82bb527f25e03f90c7bd1a5f7719.png)

GET /:yournamespace/[:numberoflines] to read logs

![alt tag](https://s3.amazonaws.com/madshot/d741a0e413c6c61b7c6a89427f4dda83.png)



Example PHP Code:
```php
$ch = curl_init();curl_setopt($ch, CURLOPT_URL,"logger.madwire.net/###NAMESPACE###");curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2000);curl_setopt($ch, CURLOPT_TIMEOUT, 3000);curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS,"###somekey###=###somevalue###");$result=curl_exec($ch);curl_close($ch);
```

Example Node Code:
```javascript
function logger(namespace,object){
    var http = require("http");
    var options = {
      hostname: 'logger.madwire.net',
      port: 80,
      path: '/'+namespace,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
    };
    var req = http.request(options, function(res) {
      //console.log('Status: ' + res.statusCode);
      //console.log('Headers: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (body) {
        //console.log('Body: ' + body);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(JSON.stringify(object));
    req.end();
}
```
