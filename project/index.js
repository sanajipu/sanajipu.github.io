var att = [];
function loadjson() {
    var nftImg;
    var jsonObj;
    for (var i = 0; i < 30; i++) {
        index = i.toString()
        $.get("json/data/" + i.toString() + ".json", function (data) {
            jsonObj = data;
            jsonObj.attributes.forEach(element => {
                att.push(element.value); 
            });
            id = jsonObj.name.split('#')[1]
            var myImage = new Image();
            myImage.src = "https://s7nspfp.mypinata.cloud/ipfs/" + jsonObj.image;
            $(".nft-images").append("<img src=" + myImage.src + " id=" + "json/data/" + id + ">");
            index = '';
            if(id == "29"){
                dropdown();
            }
        })
    }
}
loadjson();


function dropdown(){
    var htmlString = '<select  id="val" onchange="filterData()">'
    att.forEach(function(item){
        htmlString +=  "<option value="+item+">"+item+"</option>";
    });
    htmlString += '</select>'
    $(".nft-images-filter").append(htmlString);
}

function filterData(){
    var present;
    var x = document.getElementById("val").value;
    $(".nft-images").empty();
    for (var i = 0; i < 30; i++) {
        $.get("json/data/" + i.toString() + ".json", function (data) {
             present =  data.attributes.filter(function(item){
                if(item.value == x){
                    return true;
                }
            })
            id = data.name.split('#')[1]
            if(present.length){
            var myImage = new Image();
            myImage.src = "https://s7nspfp.mypinata.cloud/ipfs/" + data.image;
            $(".nft-images").append("<img src=" + myImage.src + " id=" + "json/data/" + id + ">");
            }
        })
}
}


$(document).ready(function () {
    $('body').on('click','.nft-images img', function(e) {
            window.location = 'nft-detail.html?id='+this.id;
    });
});

function myFunction() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");
    $.get(id + ".json", function (data) {
            console.log(data)
            var myImage = new Image();
            var htmlString = "<table>"
            myImage.src = "https://s7nspfp.mypinata.cloud/ipfs/" + data.image;
            $(".nft-detail-container").append("<img src=" + myImage.src + ">");
            for(var i=0;i<data.attributes.length;i++){
            htmlString +=  "<tr><td>"+data.attributes[i].trait_type+"</td><td><small>"+data.attributes[i].value+"</small></td></tr>";
            }
            htmlString += "</table>"
            $(".nft-detail-container").append(htmlString);
    })
}


