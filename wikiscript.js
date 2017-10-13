let isOn = Boolean(true); //is Icon is true
var targetBlank = "target=\"_blank\"";

// press enter key function
$("#searchTerm").keypress(function (e) {
    if (e.keyCode === 13) {
        wikiSearch();
        animateElements();// <-- animate
        $('#search').find('i').toggleClass('fa-search fa-caret-down'); 

    }
});

setBGImage();//<-- set random bg image


$(document).ready(function () {
    $("#searchTerm").focus();
    // button click to search
    $("#search").click(function () {
        if ($("#searchTerm").val() != "") {
            wikiSearch(); // <-- search                                        
            $("#searchTerm").val('');
        }

        $('#search').find('i').toggleClass('fa-search fa-caret-down'); 
        animateElements();// <-- animate
        
    })
});

var viewableOffset = $(".container").offset().top - $(window).scrollTop();
console.log(`before:  ${viewableOffset}`);

function animateElements() {
    if (isOn) {
        //move search box and search icon up
        $(".container").animate({
            marginTop: '30px',
        }, 1000);       

        //show output div
        $("#output").show("slow", function () {
            $("#output").animate({
                opacity: 1
            }, 1000);          
        });       
        $("#searchTerm").hide('slow'); 
        $("#luckyBtn").hide('slow');   
        isOn = false;
    }
    else {
        //move search box and search icon down
        $(".container").animate({
            marginTop: `${viewableOffset}px`,
        }, 1000);

        //hide div output
        $("#output").hide("slow", function () {
            $("#output").animate({
                opacity: 0
            }, 1000);
        });
        $("#searchTerm").show('slow'); 
        $("#searchTerm").focus();
        $("#luckyBtn").show('slow'); 
        
        isOn = true;
    }
}

function wikiSearch() {
    // var searchTerm = $("#searchTerm").val();
    // console.log(searchTerm);

    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + $("#searchTerm").val() + "&format=json&callback=?";
    console.log(url);

    $.ajax({
        url: url,
        type: "GET",
        async: false,
        dataType: "json",
        success: function (data, status, jqXHR) {
            console.log(data);

            //dynamtically create a html well
            for (var i = 0; i < data[1].length; i++) {
                $("#output").prepend("<div class='well'><a href=" + data[3][i] + " " + targetBlank + "><h2>" + data[1][i] + "</h2>" + "<p>" + data[2][i] + "</p></a></div>");
                // $('#output').prepend(
                //     `<div class="well">
                //         <a href="${data[3][i]}" target="_blank">
                //             <h2>${data[1][i]}</h2>
                //             <p>${data[2][i]}</p>
                //         </a>
                //     </div>`
                // );
            }
        }
    })
}




function setBGImage() {
    // Array of objects to display background image 
    var bgList = [
        {
            "url": "https://static.pexels.com/photos/125457/pexels-photo-125457.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/139575/pexels-photo-139575.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/395196/pexels-photo-395196.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/239107/pexels-photo-239107.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/169738/pexels-photo-169738.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/17739/pexels-photo.jpg"
        },
        {
            "url": "https://static.pexels.com/photos/249344/pexels-photo-249344.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/280204/pexels-photo-280204.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/54300/pexels-photo-54300.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/226460/pexels-photo-226460.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/205769/pexels-photo-205769.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/413186/pexels-photo-413186.jpeg"
        },
        {
            "url": "https://static.pexels.com/photos/439227/pexels-photo-439227.jpeg"
        }
    ]

    var num = Math.round(Math.random() * bgList.length - 1);

    if (num < 0) {
        num = 0;
    }
    $('body').css('background-image', 'url(' + bgList[num].url + ')');

}
