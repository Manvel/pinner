function Pinned() {
    this.layersObj = {};
}

Pinned.prototype = {
    add: function() {
        this.layersObj[mainLayer.possition] = mainLayer;
        this.update();
    },
    remove: function(key) {
        delete this.layersObj[key];
        this.update();
        info.success("Item removed");
    },
    update: function() {
        $("#currentGallery .currentGalleryWrap").empty();
        for (var key in this.layersObj) {
            layer = this.layersObj[key];
            var content = "<div class='"+layer.possition+" box-show'>";
            content += "<span class='caption fade-caption'>";
            content += "<p>"+layer.possitionName+"</p>";
            content += "</span>";
            content += "</div>";
            $("#currentGallery .currentGalleryWrap").append(content);
            $("#currentGallery ."+layer.possition).css("background-image", "url("+layer.url+")");
       }
        //Pinned gallery item clicked
        $("#currentGallery  .box-show").click(pinnedItemClick);
        
        var itemCurr = $('#currentGallery .box-show'),
        visible = 4,
        index = 0,
        endIndex = ( itemCurr.length / visible ) - 1;
        $('#galleryContainer div#arrowR').click(function(){
            if(index < endIndex ){
              index++;
              itemCurr.animate({'left':'-=260px'});
            }
        });
        
        $('#galleryContainer div#arrowL').click(function(){
            if(index > 0){
              index--;            
              itemCurr.animate({'left':'+=260px'});
            }
        });
    }
}