var LEFT_EYE_CENTER = new Layer();
var LEFT_EYEBROW_LEFT = new Layer();
var LEFT_EYEBROW_RIGHT = new Layer();
var LOWER_LIP = new Layer();
var MOUTH_CENTER = new Layer();
var MOUTH_LEFT = new Layer();
var MOUTH_RIGHT = new Layer();
var NOSE_ROOT = new Layer();
var NOSE_TIP = new Layer();
var RIGHT_EYE_CENTER = new Layer();
var RIGHT_EYEBROW_LEFT = new Layer();
var RIGHT_EYEBROW_RIGHT = new Layer();
var UPPER_LIP = new Layer();
var slider;
var mainLayer = new Layer();
var pinned;
var sharedGal;
var info;

window.onload = function() {
    pinned = new Pinned();
    sharedGal = new SharedGal();
    slider = new Zoom("#slider");
    eventsBinding();
    info = new Info("#infoLine");
    mainLayer.updateMainLayer();
};
var arbitraryResource;
var somevar = "bb";

function eventsBinding() {
    //Select url on focus
    $("#imageUrl").click(function(){$(this).select();});
    //Main pin choice
    $("#main-pin a").click(pinImage);
    // Change pin
    $("#current-pin a").click(changePin);
    //Share item
    $(".share-with-party").click(shareWithParty);
    
    //Delete item
    $(".delete-item").click(deleteItem);
    gapi.hangout.onApiReady.add(
      function() {
          gapi.hangout.data.setValue("gallery", "");
      }
    );
    gapi.hangout.data.onStateChanged.add(updateGallery);
   // var getImageButton  = document.getElementById('getImage');
//    getImageButton.addEventListener('click',createOverlay,false);
    
}

function createOverlay() {
    overlay = new Layer();
    overlay.createOverlay();
}

var pinImage = function() {
    var possition = $(this).attr('class');
    var url = $("#imageUrl").val();
    
    if(!url) {
        info.warning("Please fill in url");
        return;
    }
    createLayer(url, possition);
}

var changePin = function() {
    if(!mainLayer.url) {
        info.warning("Please select item");
        return;
    }
    var possition = $(this).attr('class');
    mainLayer.changePossition(possition);
}

var shareWithParty = function() {
    if(!mainLayer.url) {
        info.warning("Please select item");
        return;
    }
    var shareObj = {"possition":mainLayer.possition, "url":mainLayer.url, "possitionName": mainLayer.possitionName};
    gapi.hangout.data.setValue("gallery", JSON.stringify(shareObj));
}

var updateGallery = function(ev) {
    galleryObj = gapi.hangout.data.getValue('gallery');
    if(!galleryObj) {
        return;
    }
    galleryObj = JSON.parse(galleryObj);
    sharedGal.add(galleryObj.possition, galleryObj.url, galleryObj.possitionName);
}

var deleteItem = function() {
    if(!mainLayer.url) {
        info.warning("Please select item");
        return;
    }
    pinned.remove(mainLayer.possition);
    mainLayer.resource.dispose();
    mainLayer = new Layer();
    mainLayer.updateMainLayer();
}

var pinnedItemClick = function() {
    var itemPossition = $(this).attr("class").split(' ')[0];
    layerObj = pinned.layersObj[itemPossition];
    var zoomLevel = overlayHelper(itemPossition).overlayObj.level;
    mainLayer = layerObj;
    mainLayer.updateMainLayer(zoomLevel);
}

var galleryItemClick = function() {
    var possition = $(this).attr("class").split(' ')[0];
    var url = $(this).css('background-image');
    url = url.replace('url(','').replace(')','');
    if(!url) {
        return;
    }
    createLayer(url, possition);
}
