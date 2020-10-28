var request = require('request');
var cheerio = require('cheerio');
var excel = require('excel4node');

var workbook = new excel.Workbook();
var worksheet = workbook.addWorksheet('Sheet 1');

var style = workbook.createStyle({
    font: {
      color: '#FF0800',
      size: 12
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -'
  });
  
var counter = 1;

request('https://pt.wikipedia.org/wiki/Minecraft', function(err, res, body){
    if(err)
        console.log('Erro: '+ err);

    var $ = cheerio.load(body);

    // console.log('carregou o body: ' + res.body);

    $('h2').each(function(){
        var title = $(this).find('span').text().trim();


        worksheet.cell(1,counter++).string(title).style(style);
        console.log(title);
    });

    workbook.write('Excel.xlsx');
})




// gambiarra mode

// Just create a file with Tabs as delimiters ( parecido com CSV mas substitua virgula por Tab ). salve com a extenção .XLS


//exemplo

// var fs = require('fs');
// var writeStream = fs.createWriteStream("file.xls");

// var header="Sl No"+"\t"+" Age"+"\t"+"Name"+"\n";
// var row1 = "0"+"\t"+" 21"+"\t"+"Rob"+"\n";
// var row2 = "1"+"\t"+" 22"+"\t"+"bob"+"\n";

// writeStream.write(header);
// writeStream.write(row1);
// writeStream.write(row2);

// writeStream.close();