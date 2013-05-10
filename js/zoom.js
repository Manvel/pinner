function Zoom(selector) {
    this.selector = selector;
    this.init();
    $(selector).on( "slide", this.zoom);
}

Zoom.prototype = {
    init: function(url, possition) {
       $(this.selector).slider();
       this.updateZoom();
    },
    zoom: function() {
        var level = $("#slider").slider( "option", "value" );
        level = level/20;
        mainLayer.level = level;
        mainLayer.updateZoom();
        updateAfterChange(mainLayer.possition, true);
    },
    updateZoom: function(level) {
        if(level) 
            $(this.selector).slider( "option", "value", level*20);
        else
            $(this.selector).slider( "option", "value", mainLayer.level*20);
    }
}