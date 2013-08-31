$(document).ready(function(){

    // The published URL of your Google Docs spreadsheet as CSV:
    var csvURL = 'https://spreadsheets.google.com/pub?key='+
            '0AsXSn_cHpaWCdDBvWDYwakFHTU50TFBnanllaGFITmc&single=true&gid=0&output=csv';

            // https://docs.google.com/spreadsheet/pub?key=0AsXSn_cHpaWCdDBvWDYwakFHTU50TFBnanllaGFITmc&single=true&gid=0&output=csv
    // The YQL address:
    var yqlURL =	"http://query.yahooapis.com/v1/public/yql?q="+
            "select%20*%20from%20csv%20where%20url%3D'"+encodeURIComponent(csvURL)+
            "'%20and%20columns%3D'heading%2Cbizname%2Caddress%2Cphone%2Ccomments'&format=json&callback=?";

    $.getJSON(yqlURL,function(msg){
        // var dl = $('<dl>');

        // Looping through all the entries in the CSV file:
        $.each(msg.query.results.row,function(index){

            if (index !== 0) {

                // Sometimes the entries are surrounded by double quotes. This is why
                // we strip them first with the replace method:
            
                if (this.bizname !== null) {  
                    var bizname = this.bizname.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else {
                    var bizname = ""
                }
                
                if (this.address !== null) {  
                    var address = this.address.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else { 
                    var address = ""
                }

                if (this.phone !== null) {  
                    var phone = this.phone.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else {
                    var phone = ""
                }

                if (this.comments !== null) {  
                    var comments = this.comments.replace(/""/g,'"').replace(/^"|"$/g,'');
                } else {
                    var comments = ""
                }

                console.log(this.heading)


                if (this.heading == "Y") {
                     var tableRow = "<tr><td colspan='4'><h3>"+ bizname +"<h3></td></tr>"
                } else {
                    var tableRow = "<tr><td>"+ bizname +"</td><td>"+ address +"</td><td>"+ phone +"</td><td>"+ comments +"</td></tr>"
                }

                $("#resources_table tbody").append(tableRow);  
            }

            // Formatting the FAQ as a definition list: dt for the question
            // and a dd for the answer.

            // dl.append('<dt><span class="icon"></span>'+
            // question+'</dt><dd>'+answer+'</dd>');
        });

        // Appending the definition list:
        // $('#faqSection').append(dl);

        // $('dt').live('click',function(){
        //     var dd = $(this).next();

        //     // If the title is clicked and the dd is not currently animated,
        //     // start an animation with the slideToggle() method.

        //     if(!dd.is(':animated')){
        //         dd.slideToggle();
        //         $(this).toggleClass('opened');
        //     }

        // });

        // $('a.button').click(function(){

        //     // To expand/collapse all of the FAQs simultaneously,
        //     // just trigger the click event on the DTs

        //     if($(this).hasClass('collapse')){
        //         $('dt.opened').click();
        //     }
        //     else $('dt:not(.opened)').click();

        //     $(this).toggleClass('expand collapse');

        //     return false;
        // });

    });
});