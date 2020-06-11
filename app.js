const request = require('request');
const cheerio = require('cheerio');
// const opn = require("opn")
var http = require('http');



  ip_url = "https://api6.ipify.org/?format=json"
  request(ip_url, {}, (error, res, body) => {
    //   if something went wrong
    if (error) {
      console.error(error);
      return;
    }
    // status code
    // console.log(`statusCode: ${res.statusCode}`)

    var json_o = JSON.parse(body);

  
    console.log("Client Ip is: " + json_o['ip']);
    // opn(fin_link);
  })


  var os = require('os');
  var networkInterfaces = os.networkInterfaces();

  console.log("This is wifi ip: " + networkInterfaces['Wireless Network Connection'][1].address);
  
  // console.log(time())

  // testing link ( will be provided from our database)
  let url = 'https://vidstreaming.io/streaming.php?id=MTExMDMy&title=Captain+Tsubasa+%282018%29+episode+32&typesub=SUB'
  // getting all server's url from the source page
  request(url, function (err, res, body) {
    //    dumb all html data in var
    var $ = cheerio.load(body);

    // get all the data-video attr value in a array d
    var d = $('li.linkserver').map((i, x) => $(x).attr('data-video')).toArray();
    // console.log(d)
    // search for specific start link string
    d.forEach(element => {
      if (element.startsWith('https://fcdn.stream')) {
        // console.log("found it");
        //Replace with start link to get main code 

        code = element.replace("https://fcdn.stream/v/", "");

        // console.log(code);
        console.log(code);
        new_url = "https://fcdn.stream/api/source/".concat(code);
        request.post(new_url, {}, (error, res, body) => {
          //   if something went wrong
          if (error) {
            console.error(error);
            return;
          }
          // status code
          //   console.log(`statusCode: ${res.statusCode}`)
          var json_o = JSON.parse(body)['data'];
          fin_link = json_o[json_o.length - 1]['file']
          http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write("<style>*{margin:0px;padding:0px;}h2{margin-top:20px;}</style><iframe width='100%' height='600px' src='"+fin_link+"' ></iframe><h2 align='center'>There will go other code...</h2>");
          res.end();
          }).listen(8080)
          console.log(fin_link);
          // opn(fin_link);




        })

      }
      else {
        // console.log("cant find it");    
      }
    });


  })

