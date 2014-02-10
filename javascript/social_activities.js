$(document).ready(function(){

    // The published URL of your Google Docs spreadsheet as CSV:
    var csvURL = 'https://spreadsheets.google.com/pub?key='+
            '0AsXSn_cHpaWCdDRCeDhsVEtqNFhKSW9BWko3ZTdRVXc&single=true&gid=0&output=csv';

            // https://docs.google.com/spreadsheet/pub?key=0AsXSn_cHpaWCdDBvWDYwakFHTU50TFBnanllaGFITmc&single=true&gid=0&output=csv
    // The YQL address:
    var yqlURL =	"https://query.yahooapis.com/v1/public/yql?q="+
            "select%20*%20from%20csv%20where%20url%3D'"+encodeURIComponent(csvURL)+
            "'%20and%20columns%3D'heading%2Cactivity%2Cwhen%2Cwhere%2Ccontact'&format=json&callback=?";

    $.getJSON(yqlURL,function(msg){
        // var dl = $('<dl>');

        // Looping through all the entries in the CSV file:
        $.each(msg.query.results.row,function(index){

            if (index !== 0) {

                // Sometimes the entries are surrounded by double quotes. This is why
                // we strip them first with the replace method:
            
                if (this.activity !== null) {  
                    var activity = this.activity.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else {
                    var activity = ""
                }
                
                if (this.when !== null) {  
                    var when = this.when.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else { 
                    var when = ""
                }

                if (this.where !== null) {  
                    var where = this.where.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else {
                    var where = ""
                }

                if (this.contact !== null) {  
                    var contact = this.contact.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else {
                    var contact = ""
                }

                if (this.heading == "Y") {
                     var tableRow = "<tr class='heading-row'><td colspan='4'><h3>"+ activity +"<h3></td></tr>"
                } else {
                    var tableRow = "<tr><td>"+ activity +"</td><td>"+ when +"</td><td>"+ where +"</td><td>"+ contact +"</td></tr>"
                }

                $("#social_activities_table tbody").append(tableRow);  
            }

        });
    });
});