/* Flot plugin for showing crosshairs when the mouse hovers over the plot.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

The plugin supports these options:

	crosshair: {
		mode: null or "x" or "y" or "xy"
		color: color
		lineWidth: number
	}

Set the mode to one of "x", "y" or "xy". The "x" mode enables a vertical
crosshair that lets you trace the values on the x axis, "y" enables a
horizontal crosshair and "xy" enables them both. "color" is the color of the
crosshair (default is "rgba(170, 0, 0, 0.80)"), "lineWidth" is the width of
the drawn lines (default is 1).

The plugin also adds four public methods:

  - setCrosshair( pos )

    Set the position of the crosshair. Note that this is cleared if the user
    moves the mouse. "pos" is in coordinates of the plot and should be on the
    form { x: xpos, y: ypos } (you can use x2/x3/... if you're using multiple
    axes), which is coincidentally the same format as what you get from a
    "plothover" event. If "pos" is null, the crosshair is cleared.

  - clearCrosshair()

    Clear the crosshair.

  - lockCrosshair(pos)

    Cause the crosshair to lock to the current location, no longer updating if
    the user moves the mouse. Optionally supply a position (passed on to
    setCrosshair()) to move it to.

    Example usage:

	var myFlot = $.plot( $("#graph"), ..., { crosshair: { mode: "x" } } };
	$("#graph").bind( "plothover", function ( evt, position, item ) {
		if ( item ) {
			// Lock the crosshair to the data point being hovered
			myFlot.lockCrosshair({
				x: item.datapoint[ 0 ],
				y: item.datapoint[ 1 ]
			});
		} else {
			// Return normal crosshair operation
			myFlot.unlockCrosshair();
		}
	});

  - unlockCrosshair()

    Free the crosshair to move again after locking it.
*/

(function ($) {
  var options = {
    crosshair: {
      mode: null, // one of null, "x", "y" or "xy",
      color: "rgba(59, 175, 41, 0.80)",
      lineWidth: 2,
      snap: true
    }
  };

  function init(plot) {
    // position of crosshair in pixels
    var crosshair = {x: -1, y: -1, locked: false};
    var xPoints = [];

    plot.setCrosshair = function setCrosshair(pos) {
      if (!pos)
        crosshair.x = -1;
      else {
        var o = plot.p2c(pos);
        crosshair.x = Math.max(0, Math.min(o.left, plot.width()));
        crosshair.y = Math.max(0, Math.min(o.top, plot.height()));
      }

      plot.triggerRedrawOverlay();
    };

    plot.clearCrosshair = function clearCrosshair() {
      if (crosshair.x != -1) {
        crosshair.x = -1;
        plot.triggerRedrawOverlay();
      }
    }

    plot.lockCrosshair = function lockCrosshair(pos) {
      if (pos)
        plot.setCrosshair(pos);
      crosshair.locked = true;
    };

    plot.unlockCrosshair = function unlockCrosshair() {
      crosshair.locked = false;
    };

    function onMouseOut(e) {
      if (crosshair.locked)
        return;

      if (crosshair.x != -1) {
        crosshair.x = -1;
        plot.triggerRedrawOverlay();
      }
    }

    function onResize() {
      xPoints = [];
    }

    function onMouseMove(e) {
      if (crosshair.locked)
        return;

      if (plot.getSelection && plot.getSelection()) {
        crosshair.x = -1; // hide the crosshair while selecting
        return;
      }

      var offset = plot.offset();
      var x = Math.max(0, Math.min(e.pageX - offset.left, plot.width()));
      var y = Math.max(0, Math.min(e.pageY - offset.top, plot.height()));

      var pts = getClosestPoints({x: x, y: y});
      crosshair.x = pts[0].x;
      crosshair.y = pts[0].y;
      var series = plot.getData();
      plot.unhighlight();

      for (var i = 0; i < pts.length; i++) {
        var pt = pts[i];
        plot.highlight(pt.series, pt.idx);
        var offset = plot.offset();
        var position = {
          pageX: offset.left + pt.x,
          pageY: offset.top + pt.y
        }

        var item = {
          datapoint: pt.datapoint,
          dataIndex: pt.idx,
          series: series[pt.series],
          seriesIndex: pt.series
        };
      }
      plot.triggerRedrawOverlay();
      e.preventDefault();
    }

    function getClosestPoints(e) {
      if (xPoints.length == 0) {
        var points = plot.getData();
        for (var i = 0; i < points.length; i++) {
          for (var j = 0; j < points[i].data.length; j++) {
            if (_.isArray(points[i].data[j])) {
              xPoints.push({
                x: points[i].xaxis.p2c(points[i].data[j][0]),
                y: points[i].yaxis.p2c(points[i].data[j][1]),
                datapoint: points[i].data[j],
                series: i,
                idx: j
              });
            } else {
              xPoints.push({
                x: points[i].xaxis.p2c(points[i].data[j]),
                y: points[i].yaxis.p2c(points[i].data[j]),
                datapoint: points[i].data[j],
                series: i,
                idx: j
              });
            }
          }
        }
      }

      var minX = undefined;
      var minY = undefined;
      var minPt = undefined;
      var minPts = [];
      for (var i = 0; i < xPoints.length; i++) {
        var pt = xPoints[i];
        var dx = Math.abs(xPoints[i].x - e.x);
        var dy = Math.abs(xPoints[i].y - e.y);
        if (minX === undefined || minX > dx) {//} || minX == dx && minY > dy) {
          minX = dx;
          minY = dy;
          minPt = pt;
          minPts = [minPt];
        } else if (minX == dx) {
          minPts.push(pt);
        }
      }

      return minPts;
    }

    plot.hooks.bindEvents.push(function (plot, eventHolder) {
      if (!plot.getOptions().crosshair.mode)
        return;

      eventHolder.mouseout(onMouseOut);
      eventHolder.mousemove(onMouseMove);
    });

    plot.hooks.drawOverlay.push(function (plot, ctx) {
      var c = plot.getOptions().crosshair;
      if (!c.mode)
        return;

      var plotOffset = plot.getPlotOffset();

      ctx.save();
      ctx.translate(plotOffset.left, plotOffset.top);

      if (crosshair.x != -1) {
        var adj = plot.getOptions().crosshair.lineWidth % 2 ? 0.5 : 0;

        ctx.strokeStyle = c.color;
        ctx.lineWidth = c.lineWidth;
        ctx.lineJoin = "round";

        ctx.beginPath();
        if (c.mode.indexOf("x") != -1) {
          var drawX = Math.floor(crosshair.x) + adj;
          ctx.moveTo(drawX, 0);
          ctx.lineTo(drawX, plot.height());
        }
        if (c.mode.indexOf("y") != -1) {
          var drawY = Math.floor(crosshair.y) + adj;
          ctx.moveTo(0, drawY);
          ctx.lineTo(plot.width(), drawY);
        }
        ctx.stroke();
      }
      ctx.restore();
    });

    plot.hooks.shutdown.push(function (plot, eventHolder) {
      eventHolder.unbind("mouseout", onMouseOut);
      eventHolder.unbind("mousemove", onMouseMove);
    });
  }

  $.plot.plugins.push({
    init: init,
    options: options,
    name: 'crosshair',
    version: '1.0'
  });
})(jQuery);
