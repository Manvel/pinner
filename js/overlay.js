function Layer() {
    this.possition = "";
    this.possitionName = "";
    this.url = "";
    this.resource = "";
    this.overlay = "";
    this.level = 1;
}

Layer.prototype = {
    createOverlay: function(url, possition, possitionName) {
        var currentLayer = this;
        this.possition = possition;
        this.possitionName = possitionName;
        this.url = url;
        
        this.resource = gapi.hangout.av.effects.createImageResource(this.url);

        // Use an onLoad handler 
        this.resource.onLoad.add( function(event) {
            if ( !event.isLoaded ) {
                info.error("Could not load your image.");
            } else {
                mainLayer = currentLayer;
                mainLayer.updateMainLayer();
                pinned.add();
            }
        });
        
        this.overlay = this.resource.createFaceTrackingOverlay({
              'trackingFeature': this.possition
            , 'scaleWithFace': true
            , 'rotateWithFace': true
            , 'scale': this.level
            , 'offset': { 'x': 0, 'y': 0 }
        });
        this.overlay.setVisible(true);
    },
    updateMainLayer: function(level) {
        if(!this.url) {
            $("#mainImg").css('background-image','url(data:image/gif;base64,R0lGODlhZABkAMQAAP////v7+/Pz8+/v7+vr6+Pj49/f39fX19LS0s7OzsbGxsLCwrq6ura2trKysqqqqqampgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAABkAGQAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq93B4TAKEAQvAR9aQwQDCMEEAgvCIiCEBAGIoeJLouTZ4MQD3qSIwYLDAl+JpUiCQwDBwwKAQIKDAWGrguwIgEIqgSghp8JekGDCxALAJwACoQJDw8Do4wAgwwOD8IPDY6iDwoI0wQi0MmEIgbIEA1CgwHcnAMQDiIFws2TwADwEMzW3QC+pOzu9eEAKNNzTN+PQQDGOYCXiJQIR/K8Qeh2qNCziZFcOWDksCKxdghuOTsIQaK1hiMhupZwOIhiwJYAH4hEOcnjoQcMcjKABAQhAAHTGMGzyM7cSmcwPV7sNggWqXHDABwIFyCTryE+ASxydpKANVokWGJUCvOYggLWFgRIByGBgmkWExAqQOAAWB9ZAZys9bbc3RFiXVqEOWDjAgPcABSeG1DqRkIG64xLYOeEAm3JHoiqTIKAKVCbOYseTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfznx2CAA7)');
            return;
        }
        $("#mainImg").css('background-image','url('+this.url+')');
        $("#current-pin .feature").html(this.possitionName);
        if(level) {
            slider.updateZoom(level);
        }
    },
    updateZoom: function() {
        if(this.overlay)
            this.overlay.setScale(this.level);
    },
    changePossition: function(possition) {
        pinned.remove(mainLayer.possition);
        var overlayHelperObj = overlayHelper(possition);
        oldOverlayPossition = mainLayer.possition;
        this.overlay.setTrackingFeature(overlayHelperObj.possition);
        this.possitionName = overlayHelperObj.possitionName;
        this.possition = possition;
        pinned.add();
        this.updateMainLayer();
        
        updateAfterChange(oldOverlayPossition, false);
        updateAfterChange(possition, true);
        
    },
    disposeResource: function() {
        this.resource.dispose();
    }
}



var createLayer = function(url, possition) {
    var overlayHelperObj = overlayHelper(possition);
    var overlayObj = overlayHelperObj.overlayObj;
    var imgPossition = overlayHelperObj.possition;
    var possitionName = overlayHelperObj.possitionName;
    if(overlayObj.resource) {
        console.log("dispose");
        overlayObj.resource.dispose();
    }
    overlayObj.createOverlay(url, imgPossition, possitionName);
}


function overlayHelper(possition) {
    var overlayObj;
    var imgPossition;
    var possitionName;
    switch (possition) {
        case 'left_eye_center':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.LEFT_EYE;
            overlayObj = LEFT_EYE_CENTER;
            possitionName = "Left eye";
            break;
        case 'left_eyebrow_left':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.LEFT_EYEBROW_LEFT;
            overlayObj = LEFT_EYEBROW_LEFT;
            possitionName = "Left eyebrow left";
            break;
        case 'left_eyebrow_right':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.LEFT_EYEBROW_RIGHT;
            overlayObj = LEFT_EYEBROW_RIGHT;
            possitionName = "Left eyebrow right";
            break;
        case 'lip_lower':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.LOWER_LIP;
            overlayObj = LOWER_LIP;
            possitionName = "Lower lip";
            break;
        case 'mouth_center':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.MOUTH_CENTER;
            overlayObj = MOUTH_CENTER;
            possitionName = "Mouth center";
            break;
        case 'mouth_left':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.MOUTH_LEFT;
            overlayObj = MOUTH_LEFT;
            possitionName = "Mouth left";
            break;
        case 'mouth_right':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.MOUTH_RIGHT;
            overlayObj = MOUTH_RIGHT;
            possitionName = "Mouth right";
            break;
        case 'nose_root':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.NOSE_ROOT;
            overlayObj = NOSE_ROOT;
            possitionName = "Nose root";
            break;
        case 'nose_tip':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.NOSE_TIP;
            overlayObj = NOSE_TIP;
            possitionName = "Nose tip";
            break;
        case 'right_eye_center':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.RIGHT_EYE;
            overlayObj = RIGHT_EYE_CENTER;
            possitionName = "Right eye";
            break;
        case 'right_eyebrow_left':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.RIGHT_EYEBROW_LEFT;
            overlayObj = RIGHT_EYEBROW_LEFT;
            possitionName = "Right eyebrow left";
            break;
        case 'right_eyebrow_right':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.RIGHT_EYEBROW_RIGHT;
            overlayObj = RIGHT_EYEBROW_RIGHT;
            possitionName = "Right eyebrow right";
            break;
        case 'lip_upper':
            imgPossition = gapi.hangout.av.effects.FaceTrackingFeature.UPPER_LIP;
            overlayObj = UPPER_LIP;
            possitionName = "Upper lip";
            break;
    }
    return {"overlayObj":overlayObj, "possition": imgPossition, "possitionName": possitionName};
}


function updateAfterChange(possition, newObj) {
    switch (possition) {
        case 'left_eye_center':
            if(newObj) 
                LEFT_EYE_CENTER = mainLayer;
            else
                LEFT_EYE_CENTER = new Layer();
            break;
        case 'left_eyebrow_left':
            if(newObj) 
                LEFT_EYEBROW_LEFT = mainLayer;
            else
                LEFT_EYEBROW_LEFT = new Layer();
            break;
        case 'left_eyebrow_right':
            if(newObj) 
                LEFT_EYEBROW_RIGHT = mainLayer;
            else
                LEFT_EYEBROW_RIGHT = new Layer();
            break;
        case 'lip_lower':
            if(newObj) 
                LOWER_LIP = mainLayer;
            else
                LOWER_LIP = new Layer();
            break;
        case 'mouth_center':
            if(newObj) 
                MOUTH_CENTER = mainLayer;
            else
                MOUTH_CENTER = new Layer();
            break;
        case 'mouth_left':
            if(newObj) 
                MOUTH_LEFT = mainLayer;
            else
                MOUTH_LEFT = new Layer();
            break;
        case 'mouth_right':
            if(newObj) 
                MOUTH_RIGHT = mainLayer;
            else
                MOUTH_RIGHT = new Layer();
            break;
        case 'nose_root':
            if(newObj) 
                NOSE_ROOT = mainLayer;
            else
                NOSE_ROOT = new Layer();
            break;
        case 'nose_tip':
            if(newObj) 
                NOSE_TIP = mainLayer;
            else
                NOSE_TIP = new Layer();
            break;
        case 'right_eye_center':
            if(newObj) 
                RIGHT_EYE_CENTER = mainLayer;
            else
                RIGHT_EYE_CENTER = new Layer();
            break;
        case 'right_eyebrow_left':
            if(newObj) 
                RIGHT_EYE_CENTER = mainLayer;
            else
                RIGHT_EYE_CENTER = new Layer();
            break;
        case 'right_eyebrow_right':
            if(newObj) 
                RIGHT_EYEBROW_RIGHT = mainLayer;
            else
                RIGHT_EYEBROW_RIGHT = new Layer();
            break;
        case 'lip_upper':
            UPPER_LIP = new Layer();
            break;
    }
}

