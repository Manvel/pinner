function Info(selector) {
    this.selector = selector;
    this.init();
}

Info.prototype = {
    init:function() {
        $(this.selector).hide();
    },
    success: function(text) {
        $(this.selector+" span").html(text);
        $(this.selector+" span").attr('class', 'label label-info');
        $(this.selector).fadeIn("fast");
        setTimeout("info.clearInfo()", 6000);
    },
    error:function(text) {
        $(this.selector+" span").html(text);
        $(this.selector+" span").attr('class', 'label label-important');
        $("#infoLine").fadeIn(100).fadeOut(200).fadeIn(200);
        setTimeout("info.clearInfo()", 6000);
    },
    warning:function(text) {
        $(this.selector+" span").html(text);
        $(this.selector+" span").attr('class', 'label label-warning');
        $("#infoLine").fadeIn(100).fadeOut(200).fadeIn(200);
        setTimeout("info.clearInfo()", 6000);
    },
    clearInfo:function() {
        $(this.selector).fadeOut("slow");
    }
}