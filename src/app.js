$(function(){
    var height = 480;
    var width = 640;

    var cGaze = new camgaze.Camgaze(
      width,
      height,
      "mainCanvasForReal"
    );
    var eyeTracker = new camgaze.EyeTracker(width, height);
    var eyeFilter = new camgaze.EyeFilter();
    var drawer = new camgaze.drawing.ImageDrawer();
    var movement_x = [];
    var movement_y = [];
    var previous_element = null;
    var current_element = null;

    var move = true;
    var previous_elements = [];

    var recur = setInterval(function(){
        move = true;
        if (movement_x.length > 1000) {
            movement_x = [];
        }

        if (movement_y.length > 1000) {
            movement_y = [];
        }

        prevous_elements = [];
    }, 10000);

    var getAverageX = function(){
        var sum = 0;
        var moves = movement_x.slice(Math.max(movement_x.length - 12, 1))
        moves.forEach(function(elmt){
            sum += elmt;
        });

        return sum/12;
    }

    var scroll = function(y){
      window_y = $(window).height();
      html_y = Math.abs($("html").offset().top);
      scroll_y = $(window).scrollTop();

      if (y > (window_y * 0.8)) {
        $(window).scrollTop(50 + scroll_y);
      } else if (y < (window_y * 0.4)) {
        $(window).scrollTop(scroll_y - 200);
      }
    }

    var getElementBelow = function(x,y) {
        return document.elementFromPoint(x,y);
    }

    var highlightElement = function(elmt){
        if ($(elmt).is("a")) {
            $("#the-eye").css("border", "3px solid violet");
        } else {
            $("#the-eye").css("border", "");
        }
    }

    var stare = function(elmt){
        var value = true;
        var counter = 0;
        var last_elements = previous_elements.slice(Math.max(previous_elements.length - 15, 1));

        if (last_elements.length >= 15) {
            last_elements.forEach(function(prev){
                if (prev != elmt){
                    counter = counter + 1;
                }
            });
        } else {
            value = false;
        }

        if (counter > 6) {
            value = false;
        }

        return value;
    }

    var followLink = function(elmt){
        previous_elements.push(elmt);

        if ($(elmt).is("a") && stare(elmt)) {
            $(elmt)[0].click();
        }
    }

    var moveGaze = function(gaze) {
      current_eye = gaze[0];
      eye_data = current_eye.centroid.unfiltered;

      eye_x = eye_data.x + 65;
      eye_y = eye_data.y;
      window_y = $(window).height();
      window_x = $(window).width();

      y_multiplier = window_y / 480;
      x_multiplier = window_x / 640

      current_y = eye_y * y_multiplier;
      current_x = window_x - (eye_x * x_multiplier);

      if (movement_x.length < 12) {
          movement_x.push(current_x);
      }

      if (movement_y.length < 12) {
          movement_y.push(current_y);
      }

      movement_x.push(current_x);
      aveX = getAverageX();

      $("#the-eye").css("left", aveX);
      $("#the-eye").css("top", current_y);

      scroll(current_y);
      current_element = getElementBelow(current_x, current_y);
      highlightElement(current_element);

      followLink(current_element);
    }

    var frameOp = function (image_data, video) {
      var trackingData = eyeTracker.track(image_data, video);

      var gazeList = eyeFilter.getFilteredGaze(trackingData);

      if (trackingData.eyeList.length > 0) {
        moveGaze(gazeList);

        //gazeList.forEach(
          //function (eye) {
            //image_data = drawer.drawRectangle(
                //image_data,
                //eye.eyeData.getHaarRectangle(),
                //eye.eyeData.getHaarRectangle().width,
                //eye.eyeData.getHaarRectangle().height,
                //5,
                //"blue"
            //);


            //// draws the gaze
            //image_data = drawer.drawLine(
              //image_data,
              //eye.centroid.unfiltered,
              //eye.centroid.unfiltered.add(eye.gazeVector),
              //5,
              //"green"
            //);

            //window.image_data = image_data;
            //// draws the pupil
            //image_data = drawer.drawCircle(
              //image_data,
              //eye.centroid.unfiltered,
              //5,  // radius
              //-1, // line width (filled)
              //"red"
            //);
          //}
        //);
      }
      return image_data;
    };
    cGaze.setFrameOperator(frameOp);
});
