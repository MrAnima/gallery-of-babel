module.exports = function() {
  return {
    restrict: 'E',
    template: '<canvas style="background: gray" width="256" height="256">Canvas not supported, please update your web browser !</canvas>',
    replace: true,
    scope: {
      bits: '=ngModel',
      editable: '='
    },
    link: link
  }
}

function link(scope, canvas) {
  var canvas = canvas[0];
  var ctx = canvas.getContext('2d');

  function drawBox(flat, black) {
    var x = flat % 16;
    var y = Math.floor(flat / 16);

    ctx.fillStyle = black ? 'black' : 'white';
    var cellWidth = Math.round(canvas.width / 16);
    var cellHeight = Math.round(canvas.height / 16);
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
  }

  // Draw everything
  function draw() {
    for (var i = 0; i < 256; i++) {
      drawBox(i, scope.bits[i]);
    }
  }

  // Will be called if the canvas can be edited
  function setupEditable() {
    var mouseDown = false;
    var clicked = []; // Keeps track of the modified squares during the current mouse click

    canvas.onselectstart = () => false; // prevent text selection
    canvas.onmousedown = () => { mouseDown = true; }
    canvas.onmouseup = (e) => { toggleRect(e); mouseDown = false; clicked = [] };
    canvas.onmouseleave = (e) => { mouseDown = false; clicked = [] }
    canvas.onmousemove = (e) => { if (mouseDown) toggleRect(e); };

    function toggleRect(e) {
      var x = Math.floor(e.offsetX / canvas.width * 16);
      var y = Math.floor(e.offsetY / canvas.height * 16);
      var flat = x + (y * 16);
      if (clicked.indexOf(flat) != -1) return;
      clicked.push(flat);

      var bit;
      scope.$apply(() => {
        bit = scope.bits[flat] = !scope.bits[flat];
      });

      drawBox(flat, bit);
    }
  }

  scope.$watch('bits', draw);

  if (scope.editable) setupEditable();
  else canvas.draggable = true;
}
