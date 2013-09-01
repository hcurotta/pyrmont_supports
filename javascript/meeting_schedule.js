$(document).ready(function(){

    // The published URL of your Google Docs spreadsheet as CSV:
    var csvURL = 'https://spreadsheets.google.com/pub?key='+
            '0AsXSn_cHpaWCdHN3UFN4dkhjXzJDWUZDNG9TdWFTQ1E&single=true&gid=0&output=csv';

            // https://docs.google.com/spreadsheet/pub?key=0AsXSn_cHpaWCdDBvWDYwakFHTU50TFBnanllaGFITmc&single=true&gid=0&output=csv
    // The YQL address:
    var yqlURL = "https://query.yahooapis.com/v1/public/yql?q="+
            "select%20*%20from%20csv%20where%20url%3D'"+encodeURIComponent(csvURL)+
            "'%20and%20columns%3D'meeting_time%2Ctopic'&format=json&callback=?";

    console.log(yqlURL)

    $.getJSON(yqlURL,function(msg){
        // var dl = $('<dl>');

        // Looping through all the entries in the CSV file:
        $.each(msg.query.results.row,function(index){

            if (index !== 0) {

                // Sometimes the entries are surrounded by double quotes. This is why
                // we strip them first with the replace method:
            
                if (this.time !== null) {  
                    var meeting_time = this.meeting_time.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else {
                    var meeting_time = ""
                }
                
                if (this.topic !== null) {  
                    var topic = this.topic.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else { 
                    var topic = ""
                }

                var topic_string = "<li><h4>"+meeting_time+"</h4><p>"+topic+"</p></li>"

                $("#schedule_list").append(topic_string);  
            }

        });

    });
});