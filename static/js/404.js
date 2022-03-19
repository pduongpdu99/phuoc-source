var _repeatDelay = 3;

var leftLensTimeline = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('LeftLens')
    leftLensTimeline
    .to(target, 3, { xPercent: -25})
    .to(target, 3, { xPercent: 25})
    .to(target, 3, { xPercent: 0})

var leftHand = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('HandLeft')
    leftHand
    .to(target, 3, { xPercent: -25})
    .to(target, 3, { xPercent: 25})
    .to(target, 3, { xPercent: 0})

var leftArmPortion = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('ArmLeftPortion')
    leftArmPortion
    .to(target, 3, {attr:{x2:113}})
    .to(target, 3, {attr:{x2:153}})
    .to(target, 3, {attr:{x2:133}})

var rightArmPortion = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('ArmRightPortion')
    rightArmPortion
    .to(target, 3, {attr:{x2:310}})
    .to(target, 3, {attr:{x2:350}})
    .to(target, 3, {attr:{x2:330}})

var rightHand = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('HandRight')
    rightHand
    .to(target, 3, { xPercent: -25})
    .to(target, 3, { xPercent: 25})
    .to(target, 3, { xPercent: 0})

var rightLensTimeline = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('RightLens')
    rightLensTimeline
    .to(target, 3, { xPercent: -25})
    .to(target, 3, { xPercent: 25})
    .to(target, 3, { xPercent: 0})

var leftLensLower = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('BinoBackLeft')
    leftLensLower
    .to(target, 3, { xPercent: 15})
    .to(target, 3, { xPercent: -15})
    .to(target, 3, { xPercent: 0})

var rightLensLower = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('BinoBackRight')
    rightLensLower
    .to(target, 3, { xPercent: 15})
    .to(target, 3, { xPercent: -15})
    .to(target, 3, { xPercent: 0})

var binoBase = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('Center')
    binoBase
    .to(target, 3, { xPercent: -18})
    .to(target, 3, { xPercent: 18})
    .to(target, 3, { xPercent: 0})

var mouth = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('Mouth')
    mouth
    .to(target, 3, { xPercent: -20})
    .to(target, 3, { xPercent: 20})
    .to(target, 3, { xPercent: 0})

var headGroup = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay * 2}).timeScale(6);
var target = document.getElementById('HeadGroup')
    headGroup
    .to(target, 3, { rotate: 1, yPercent: 3, transformOrigin: "top right"})
    .to(target, 3, { rotate: 0, yPercent: 0})
    .to(target, 3, { rotate: -1, yPercent: 3, transformOrigin: "top left"})
    .to(target, 3, { rotate: 0, yPercent: 0})
    .to(target, 3, { rotate: 1, yPercent: 3, transformOrigin: "top right"})
    .to(target, 3, { rotate: 0, yPercent: 0})

var binoGroup = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay * 2}).timeScale(6);
var target = document.getElementById('Binoculars')
    binoGroup
    .to(target, 3, { rotate: 1, yPercent: 3, transformOrigin: "top right"})
    .to(target, 3, { rotate: 0, yPercent: 0})
    .to(target, 3, { rotate: -1, yPercent: 3, transformOrigin: "top left"})
    .to(target, 3, { rotate: 0, yPercent: 0})
    .to(target, 3, { rotate: 1, yPercent: 3, transformOrigin: "top right"})
    .to(target, 3, { rotate: 0, yPercent: 0})


var bodyBase = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay * 2}).timeScale(6);
var target = document.getElementById('Body')
    bodyBase
    .to(target, 3, { rotate: 1, yPercent: 3, transformOrigin: "top right"})
    .to(target, 3, { rotate: 0, yPercent: 0})
    .to(target, 3, { rotate: 0, yPercent: 3, transformOrigin: "top left"})
    .to(target, 3, { rotate: 0, yPercent: 0})
    .to(target, 3, { rotate: 1, yPercent: 3, transformOrigin: "top right"})
    .to(target, 3, { rotate: 0, yPercent: 0})

var fin = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay}).timeScale(3);
var target = document.getElementById('Hair')
    fin
    .to(target, 3, { xPercent: 28})
    .to(target, 3, { xPercent: -22})
    .to(target, 3, { xPercent: 0})

var leftLeg = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay * 2}).timeScale(6);
var target = document.getElementById('LeftLegPortion')
    leftLeg
    .to(target, 3, {attr:{points:"210.67,413.11 205.67,392.78 210.67,366.56"}})
    .to(target, 3, {attr:{points:"210.67,413.11 210.67,392.78 210.67,366.56"}})
    .to(target, 3, {attr:{points:"210.67,413.11 205.67,392.78 210.67,366.56"}})
    .to(target, 3, {attr:{points:"210.67,413.11 210.67,392.78 210.67,366.56"}})
    .to(target, 3, {attr:{points:"210.67,413.11 205.67,392.78 210.67,366.56"}})
    .to(target, 3, {attr:{points:"210.67,413.11 210.67,392.78 210.67,366.56"}})

var rightLeg = new TimelineMax({repeat: -1, repeatDelay: _repeatDelay * 2}).timeScale(6);
var target = document.getElementById('RightLegPortion')
    rightLeg
    .to(target, 3, {attr:{points:"254.75,413.11 259.75,392.78 254.75,366.56"}})
    .to(target, 3, {attr:{points:"254.75,413.11 254.75,392.78 254.75,366.56"}})
    .to(target, 3, {attr:{points:"254.75,413.11 259.75,392.78 254.75,366.56"}})
    .to(target, 3, {attr:{points:"254.75,413.11 254.75,392.78 254.75,366.56"}})
    .to(target, 3, {attr:{points:"254.75,413.11 259.75,392.78 254.75,366.56"}})
    .to(target, 3, {attr:{points:"254.75,413.11 254.75,392.78 254.75,366.56"}})

var leftFoot= new TimelineMax({repeat: -1, repeatDelay: _repeatDelay * 20}).timeScale(24);
var target = document.getElementById('LeftFoot')
    leftFoot
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 20})
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 20})
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 0})
    .to(target, 3, { rotate: 0})

var element = document.getElementById("FlareLargeLeft");
TweenMax.to(element, 0.1, {x:"+=2", y:"+=2", yoyo:true, repeat:-1});

var element = document.getElementById("FlareSmallLeft");
TweenMax.to(element, 0.1, {x:"+=2", y:"-=2", yoyo:true, repeat:-1});

var element = document.getElementById("FlareLargeRight");
TweenMax.to(element, 0.1, {x:"-=2", y:"-=2", yoyo:true, repeat:-1});

var element = document.getElementById("FlareSmallRight");
TweenMax.to(element, 0.1, {x:"-=2", y:"+=2", yoyo:true, repeat:-1});