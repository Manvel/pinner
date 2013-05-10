function SharedGal() {
    this.sharedArray = [];
}

SharedGal.prototype = {
    add:function(possition, url, possitionName) {
        var sharedObj = {"possition":possition, "url":url, "possitionName":possitionName};
        this.sharedArray.push(sharedObj);
        this.update();
    },
    update: function() {
         $("#sharedGallery .sharedGalleryWrap").empty();
        for (var i=0;i<this.sharedArray.length;i++){
            var sharedObj = this.sharedArray[i];
            var content = "<div class='"+sharedObj.possition+" gal"+i+" box-show'>";
            content += "<span class='caption fade-caption'>";
            content += "<p>"+sharedObj.possitionName+"</p>";
            content += "</span>";
            content += "</div>";
            $("#sharedGallery .sharedGalleryWrap").append(content);
            $("#sharedGallery .gal"+i).css("background-image", "url("+sharedObj.url+")");
        }
        //Pinned gallery item clicked
        $("#sharedGallery .box-show").click(galleryItemClick);
        
        var itemShare = $('#sharedGallery .box-show'),
        visible = 4,
        index = 0,
        endIndex = ( itemShare.length / visible ) - 1;
        $('#sharedGalleryContainer div#arrowR').click(function(){
            if(index < endIndex ){
              index++;
              itemShare.animate({'left':'-=260px'});
            }
        });
        
        $('#sharedGalleryContainer div#arrowL').click(function(){
            if(index > 0){
              index--;            
              itemShare.animate({'left':'+=260px'});
            }
        });
        info.success("Item shared");
    }
}