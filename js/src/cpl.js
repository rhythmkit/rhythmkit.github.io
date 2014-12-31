/*jslint browser:true */
var cpl = function (className, min, target, max) {
  'use strict';

  var targetElement = document.querySelector(className),

    text = targetElement.innerHTML,

    pos1 = min,
    pos2 = target,
    pos3 = max,

    front = text.slice(0, (pos1 - 1)),
    mid = text.slice(pos1 - 1, pos3),
    end = text.slice(pos3, text.length),

    cplMin = mid[0],
    cplTarget = mid[(pos2 - pos1)],
    cplMax = mid[mid.length - 1],

    midLeft = mid.slice(1, (pos2 - pos1)),
    midRight = mid.slice(((pos2 - pos1) + 1), (mid.length - 1)),
    frankenLine;

  frankenLine = front + "<span class='cpl'><span class='cpl__tooltip' data-tooltip=" + pos1 + ">" + cplMin + "</span>" +
  midLeft + "<span class='cpl__tooltip' data-tooltip=" + pos2 + ">" +  cplTarget + "</span>" +
  midRight + "<span class='cpl__tooltip' data-tooltip=" + pos3 + ">" + cplMax + "</span></span>" + end;

  targetElement.innerHTML = frankenLine;
};
