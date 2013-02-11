// @/codekit-prepend "vendor/jquery-1.9.0.min.js"
// @/codekit-prepend "plugins.js"

(function () {

  function init () {
    var h2Elems,
          i;

    // Very simple way to remove the no-js class on html element (will not work if html element had more than one class)
    document.getElementsByTagName("html")[0].removeAttribute("class");

    // Flush the event cache
    addEvent(window, 'unload', EventCache.flush);
    
    // Listen the resize event on the window
    addEvent(window, 'resize', resizeHandler);

    // If the device is a touch device, we have to display nav titles by default as there is no rollover
    if (is_touch_device()) {
      h2Elems = document.getElementsByTagName("h2");
      
      for (i = h2Elems.length - 1; i >= 0; i = i - 1) {
        h2Elems[i].style.visibility = "visible";
      }
    }

    // First call on the resizeHandler in order to create the layout
    resizeHandler();
  }

  // Check wether or not the device is a touch device
  function is_touch_device () {
    return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
  };

  // Rock solid add event method by Dustin Diaz (http://dustindiaz.com/rock-solid-addevent)
  function addEvent (obj, type, fn) {
    if (obj.addEventListener) {
      obj.addEventListener( type, fn, false );
      EventCache.add(obj, type, fn);
    }
    else if (obj.attachEvent) {
      obj["e"+type+fn] = fn;
      obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
      obj.attachEvent( "on"+type, obj[type+fn] );
      EventCache.add(obj, type, fn);
    }
    else {
      obj["on"+type] = obj["e"+type+fn];
    }
  }

  // Store the event cache
  var EventCache = function () {
    var listEvents = [];
    return {
      listEvents : listEvents,
      add : function(node, sEventName, fHandler){
        listEvents.push(arguments);
      },
      flush : function(){
        var i, item;
        for(i = listEvents.length - 1; i >= 0; i = i - 1){
          item = listEvents[i];
          if(item[0].removeEventListener){
            item[0].removeEventListener(item[1], item[2], item[3]);
          };
          if(item[1].substring(0, 2) != "on"){
            item[1] = "on" + item[1];
          };
          if(item[0].detachEvent){
            item[0].detachEvent(item[1], item[2]);
          };
          item[0][item[1]] = null;
        };
      }
    };
  }();

  // Handle window resize
  function resizeHandler () {
    var navElem,
        blocks,
        navWidth,
        blockBaseWidth,
        newBlockWidth,
        i;

    navElem = document.getElementsByTagName("nav")[0];
    blocks = navElem.getElementsByTagName("a");

    navWidth = navElem.offsetWidth;
    // The minimum width of nav blocks
    blockBaseWidth = 330;
    // Compute the blocks width based on the available window width
    newBlockWidth = Math.floor(blockBaseWidth + (navWidth % blockBaseWidth) / Math.floor(navWidth / blockBaseWidth)) - 1;
   
    // Set the width of each block element
    for (i = blocks.length - 1; i >= 0; i = i - 1) {
      blocks[i].style.width = newBlockWidth + "px";
    }

  }

  // Check wether or not the document is ready until it is ready
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      init();
      clearInterval(readyStateCheckInterval);
    }
  }, 10);
})();


// Jquery and Modernizr version
// $(document).ready(function () {

//   function resizeHandler () {

//     var navWidth = $("#container nav").width();
//     var blocBaseWidth = 330;
//     var newBlocWidth = Math.floor(blocBaseWidth + (navWidth % blocBaseWidth) / Math.floor(navWidth / blocBaseWidth)) - 1;

//     $("#container a").width(newBlocWidth);

//   }

//   function init () {

//     $(window).bind("resize", resizeHandler);
    
//     if (Modernizr.touch){
//       $("#container a h2").css("visibility", "visible");
//     }

//     resizeHandler();

//   }

//   init();
  
// });