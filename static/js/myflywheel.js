
var prizes = [
  "Climate Change", 
  "Extinction", 
  "Food Shortage", 
  "Forest Fires",
  "Lack Of Education", 
  "Planet B", 
  "Poverty",
  "Racism",
  "Water Bodies",
  "Ethnic Cleansing", 
  "Animal testing",
  "Child Abuse, Marriage",
  "Terrorism, Shooting", 
  "Resource Depletion", 
  "Humanitarian Aid",
  "Human Rights"];
var colors =["#DE6897",
   "#633CCD",
    "#A117A6",
    "#66A6F4",
    "#70D7BD",
    "#4AD388",
    "#3ABB8E",
    "#E7D473",
    "#DEC43F",
    "#FF9933",
    "#F46F3E",
    "#F3602B",
    "#C53041",
    "#ECOB43",
    "#F4154D",
    "#AF0832" ]

var startAngle = 0*Math.PI/180;
var arc = (2 * Math.PI) / colors.length;
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var textColor = '#fff';

var ctx;
var ans = document.getElementById('ans');

// function to load the contents of the file
function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function loadFile2(filePath){
  var client = new XMLHttpRequest();
  var fileText= "None";
  client.open('GET', filePath);
  client.onreadystatechange = function() {
      fileText = client.responseText;
      alert(fileText);
  }
  return fileText;
}

// third outermost circle

function loadFile3(filePath){
  var returnedData = null;

  $.get(filePath, function(data) {
    returnedData  = data;
    return returnedData;
  });
}

 // Bug Fix: Draw the arrow initially 

function drawArrow(ctx,outsideRadius){
  var arrowImage1 = document.getElementById('arrow');
  ctx.beginPath();
  ctx.drawImage(arrowImage1, 250 - 4 - 25, 250 - (outsideRadius + 5) - 25, 50, 50);
  ctx.restore();
}

   
function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 220;
    var textRadius = 120;
    var insideRadius = 40;
   
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);
    ctx.font = '16px Helvetica, Arial';

    drawArrow(ctx,outsideRadius);
   
    for(var i = 0; i < colors.length; i++) {
      var angle = startAngle + i * arc;
      ctx.beginPath();
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 16;
      ctx.arc(250, 250, 200, angle, angle + arc, false);
      ctx.stroke();
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 8;
      ctx.lineTo(250, 250);
      
      // Fix for the last arc outshape - Start
      
      /* if ( i === colors.length - 1) {
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.lineTo(250, 250);
        ctx.fill();
        ctx.stroke();
      } else {
         ctx.fill();
         ctx.stroke(); 
      }*/

      ctx.fill();
      ctx.stroke(); 
      
      // Fix for the last arc outshape -  End

      ctx.beginPath();
      ctx.strokeStyle = '#000000';
      ctx.arc(250, 250, insideRadius, angle, angle + arc, false);
      ctx.lineWidth = 5;
      ctx.stroke();
     
      ctx.save();
      ctx.fillStyle = textColor;
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2 + 80);
      var text = prizes[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }
    
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(250, 250, 38, 0, Math.PI*2, false);
    ctx.fill();
    ctx.restore();
    
    //Arrow
    ctx.save();
    const arrowImage = document.getElementById('arrow');
    ctx.beginPath();
    // ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.drawImage(arrowImage, 250 - 4 - 25, 250 - (outsideRadius + 5) - 25, 50, 50);
    // ctx.drawImage(arrowImage, 250 - (outsideRadius + 5) - 25, 250 - 25, 50, 50);
    ctx.restore();
    
    // center logo    
    const logoImage = document.getElementById('center-logo');
    ctx.beginPath();
    // ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.drawImage(logoImage, 250 - 25, 250 - 25, 50, 50);
   
  }
}
   
function spin() {
  spinAngleStart = 50;
  spinTime = 0;
  spinTimeTotal = 4000;
  console.log('spinAngleStart =>', spinAngleStart, 'spinTime start =>', spinTime, 'spinTimeTotal =>', spinTimeTotal);
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30 + Math.floor(Math.random() * 20);
  console.log(spinTime);
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0.3, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  console.log('spinAngleStart =>', spinAngleStart, 'spinTime =>', spinTime, 'spinTimeTotal =>', spinTimeTotal, 'spinAngle =>', spinAngle, 'startAngle =>',  startAngle);
  drawRouletteWheel();
  // spinTimeout = setTimeout('rotateWheel()', 30);
  requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
  ans.textContent = '';
  // clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  //ans.textContent = prizes[index];
  //articleContent  = loadFile3('./articles/article1.html');
  
  
  $.get('./articles/article'+index+'.html', function(data) {
    returnedData  = data;
    //console.log("index  contents are 2 = "+returnedData);
    $("#ans").html(returnedData);
  });
 
  

  
  // ctx.save();
  // ctx.font = 'bold 30px Helvetica, Arial';
  // var text = prizes[index]
  // ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  // ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  console.log('ts =>', ts, 'tc =>', tc, 'main =>', b+c*(tc + -3*ts + 3*t));
  return b+c*(tc + -3*ts + 3*t);
  b + c*((t/=d)*t*t + -3*(t/=d)*t + 3*t);
}

drawRouletteWheel();
