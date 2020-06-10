

const request = require('request');
const cheerio = require('cheerio');


// testing link ( will be provided from our database)
let url='https://vidstreaming.io/streaming.php?id=MTExMDMy&title=Captain+Tsubasa+%282018%29+episode+32&typesub=SUB'
// getting all server's url from the source page
request(url, function(err, res, body) {  
//    dumb all html data in var
    var $ = cheerio.load(body);

    // get all the data-video attr value in a array d
    var d = $('li.linkserver').map((i, x) => $(x).attr('data-video')).toArray();
    // console.log(d)
    // search for specific start link string
    d.forEach(element => {   
    if(element.startsWith('https://fcdn.stream')){
        // console.log("found it");
        //Replace with start link to get main code 

        code = element.replace("https://fcdn.stream/v/","");

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
          console.log(json_o[json_o.length-1]['file']);
        })
        
    }
    else{
        // console.log("cant find it");    
    }
    });

  }
)

