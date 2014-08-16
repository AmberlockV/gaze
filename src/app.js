$(function(){
    var height = 480;
    var width = 640;

    var cGaze = new camgaze.Camgaze(
      width,
      height,
      "mainCanvas"
    );
    var eyeTracker = new camgaze.EyeTracker(width, height);
    var eyeFilter = new camgaze.EyeFilter();
    var drawer = new camgaze.drawing.ImageDrawer();

    var previous_y = null;
    var previous_x = null;

    var moveGaze = function(gaze) {
      current_eye = gaze[0];
      eye_data = current_eye.centroid.unfiltered;

      eye_x = eye_data.x;
      eye_y = eye_data.y;
      window_y = $(window).height();
      window_x = $(window).width();

      y_multiplier = window_y / 480;
      x_multiplier = window_x / 640

      current_y = eye_y * y_multiplier;
      current_x = window_x - (eye_x * x_multiplier);

      if ( previous_x == null || (previous_x - 150) <= current_x && (previous_x + 150) >= current_x) {
        $("#the-eye").css("left", current_x);
        previous_x = current_x;
      }

      if ( previous_y == null || (previous_y - 150) <= current_y && (previous_y + 150) >= current_y) {
        $("#the-eye").css("top", current_y);
        previous_y = current_y;
      }
    }

    var frameOp = function (image_data, video) {
      var trackingData = eyeTracker.track(image_data, video);

      var gazeList = eyeFilter.getFilteredGaze(trackingData);

                // new HAAR.Detector(haarcascade_frontalface_alt, Parallel)
                //                     .image(image_data) // use the image
                //                     .interval(30) // set detection interval for asynchronous detection (if not parallel)
                //                     .complete(function(){  // onComplete callback
                //                         console.log(this.Selection, this.objects);
                //                         alert(l+" Objects found");
                //                     })
                //                     .detect(1, 1.25, 0.1, 1, true); // go

      if (trackingData.eyeList.length > 0) {
        moveGaze(gazeList);

        gazeList.forEach(
          function (eye) {
            image_data = drawer.drawRectangle(
                image_data,
                eye.eyeData.getHaarRectangle(),
                eye.eyeData.getHaarRectangle().width,
                eye.eyeData.getHaarRectangle().height,
                5,
                "blue"
            );


            // draws the gaze
            image_data = drawer.drawLine(
              image_data,
              eye.centroid.unfiltered,
              eye.centroid.unfiltered.add(eye.gazeVector),
              5,
              "green"
            );

            window.image_data = image_data;
            // draws the pupil
            image_data = drawer.drawCircle(
              image_data,
              eye.centroid.unfiltered,
              5,  // radius
              -1, // line width (filled)
              "red"
            );
          }
        );
      }
      return image_data;
    };
    cGaze.setFrameOperator(frameOp);
});
