
paint_list=[]
document.getElementById("pencil").onclick=function() {
	var canvas = document.querySelector('#mycanvas');
	var ctx=canvas.getContext('2d');
	var sketch = document.querySelector('#canvasDiv');
	var sketch_style = getComputedStyle(sketch);
	
	var tmp_canvas = document.createElement('canvas');
	var tmp_ctx = tmp_canvas.getContext('2d');
	tmp_canvas.id = 'tmp_canvas';
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;
	
	sketch.appendChild(tmp_canvas);
	
	colors(tmp_ctx);
	linewidth(tmp_ctx)

	var drag=true;
	var mouse = {x: 0, y: 0};
	tmp_canvas.addEventListener('mousemove', function(e) {
		if (drag){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		a =mouse.x;
   		b =mouse.y;
		paint_list.push({'Type':'pencil','X0':x,'Y0':y,'XN':a,'YN':b,'color':tmp_ctx.strokeStyle,'linewidth':tmp_ctx.lineWidth});
		x=a;
		y=b;}
		
	}, false);
	
	 
	tmp_canvas.addEventListener('mousedown', function(e) {
			tmp_ctx.beginPath();
			tmp_ctx.moveTo(mouse.x, mouse.y);
			x=e.x
			y=e.y
	 		
			tmp_canvas.addEventListener('mousemove', onPaint, false);
	}, false);
	 
	tmp_canvas.addEventListener('mouseup', function() {
		drag=false
		
		tmp_canvas.removeEventListener('mousemove', onPaint, false);
		ctx.drawImage(tmp_canvas, 0, 0);
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		

	}, false);
	 
	var onPaint = function() {
			tmp_ctx.lineTo(mouse.x, mouse.y);
			tmp_ctx.stroke();
	};
	
	
}

document.getElementById("circle").onclick=function() {
	
	
	var canvas = document.querySelector('#mycanvas');
	var ctx = canvas.getContext('2d');
	
	var sketch = document.querySelector('#canvasDiv');
	var sketch_style = getComputedStyle(sketch);
	
	
	
	var tmp_canvas = document.createElement('canvas');
	var tmp_ctx = tmp_canvas.getContext('2d');
	tmp_canvas.id = 'tmp_canvas';
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;
	
	sketch.appendChild(tmp_canvas);
	
	colors(tmp_ctx);
	linewidth(tmp_ctx)
	
	var mouse = {x: 0, y: 0};
	var start_mouse = {x: 0, y: 0};
	
	
	
	
	tmp_canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	}, false);
	
	
	
	tmp_canvas.addEventListener('mousedown', function(e) {
		tmp_canvas.addEventListener('mousemove', onPaint, false);
		
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		start_mouse.x = mouse.x;
		start_mouse.y = mouse.y;
		
		circle_draw={}
		circle_draw['Type']='circle'
		circle_draw['X0']=start_mouse.x
		circle_draw['Y0']=start_mouse.y
		onPaint();
	}, false);
	
	tmp_canvas.addEventListener('mouseup', function() {
		tmp_canvas.removeEventListener('mousemove', onPaint, false);
		
		
		ctx.drawImage(tmp_canvas, 0, 0);
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		paint_list.push(circle_draw);
	}, false);
	
	var onPaint = function() {
		
		
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		
		var radius = Math.max(
			Math.abs(mouse.x - start_mouse.x),
			Math.abs(mouse.y - start_mouse.y)
		) / 2;
		circle_draw['radius']=radius
		tmp_ctx.beginPath();
		tmp_ctx.arc(start_mouse.x,start_mouse.y, radius, 0, Math.PI*2, false);
		circle_draw["color"]=tmp_ctx.strokeStyle
		circle_draw['linewidth']=tmp_ctx.lineWidth
		
		tmp_ctx.stroke();
		
		
	};
	
	
}


document.getElementById("rectangle").onclick=function(){
	var rect_draw={};
	drag1=true;
	var canvas = document.querySelector('#mycanvas');
	var ctx = canvas.getContext('2d');
	
	var sketch = document.querySelector('#canvasDiv');
	var sketch_style = getComputedStyle(sketch);
	
	
	
	var tmp_canvas = document.createElement('canvas');
	var tmp_ctx = tmp_canvas.getContext('2d');
	tmp_canvas.id = 'tmp_canvas';
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;
	
	sketch.appendChild(tmp_canvas);
	
	colors(tmp_ctx);
	
	linewidth(tmp_ctx)
	var mouse = {x: 0, y: 0};
	var start_mouse = {x: 0, y: 0};
	
	
	tmp_canvas.addEventListener('mousemove', function(e) {
		if(drag1){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		rect_draw['XN']=mouse.x;
		rect_draw['YN']=mouse.y;
		rect_draw['color']=tmp_ctx.strokeStyle;
		rect_draw['linewidth']=tmp_ctx.lineWidth;
		
	}}, false);
	

	
	tmp_canvas.addEventListener('mousedown', function(e) {
		tmp_canvas.addEventListener('mousemove', onPaint, false);
		
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		start_mouse.x = mouse.x;
		start_mouse.y = mouse.y;
		rect_draw['Type']='rectangle';
		rect_draw['X0']=start_mouse.x;
		rect_draw['Y0']=start_mouse.y;
		onPaint();
	}, false);
	
	tmp_canvas.addEventListener('mouseup', function() {
		drag1=false
		tmp_canvas.removeEventListener('mousemove', onPaint, false);
		
		
				
		paint_list.push(rect_draw);
		
		ctx.drawImage(tmp_canvas, 0, 0);
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		
	}, false);
	
	var onPaint = function() {
		
		
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		
		var x = Math.min(mouse.x, start_mouse.x);
		var y = Math.min(mouse.y, start_mouse.y);
		
		var width = Math.abs(mouse.x - start_mouse.x);
		var height = Math.abs(mouse.y - start_mouse.y);
		
		tmp_ctx.strokeRect(x, y, width, height);
		
		
	};
	
	
}

document.getElementById("line").onclick=function() {
	
	var canvas = document.querySelector('#mycanvas');
	var ctx = canvas.getContext('2d');
	
	var sketch = document.querySelector('#canvasDiv');
	var sketch_style = getComputedStyle(sketch);
	
	
	var tmp_canvas = document.createElement('canvas');
	var tmp_ctx = tmp_canvas.getContext('2d');
	tmp_canvas.id = 'tmp_canvas';
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;
	
	sketch.appendChild(tmp_canvas);
	
	var mouse = {x: 0, y: 0};
	var start_mouse = {x: 0, y: 0};
	
	
	tmp_canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		
	}, false);
	
	colors(tmp_ctx);	
	linewidth(tmp_ctx);
	

	
	tmp_canvas.addEventListener('mousedown', function(e) {
		tmp_canvas.addEventListener('mousemove', onPaint, false);
		
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
		start_mouse.x = mouse.x;
		start_mouse.y = mouse.y;
		draw_line={}
		draw_line['X0']=start_mouse.x;
		draw_line['Y0']=start_mouse.y;	
		draw_line['linewidth']=tmp_ctx.lineWidth
		draw_line['color']=tmp_ctx.strokeStyle
		onPaint();
	}, false);
	
	tmp_canvas.addEventListener('mouseup', function() {
		tmp_canvas.removeEventListener('mousemove', onPaint, false);
		ctx.drawImage(tmp_canvas, 0, 0);
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		paint_list.push(draw_line);
	}, false);
	
	var onPaint = function() {

		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		
		tmp_ctx.beginPath();
		tmp_ctx.moveTo(start_mouse.x, start_mouse.y);
		tmp_ctx.lineTo(mouse.x, mouse.y);
		draw_line['XN']=mouse.x;
		draw_line['YN']=mouse.y;	
		draw_line['Type']='line'
		tmp_ctx.stroke();
		tmp_ctx.closePath();
		
	};
	
}



document.getElementById("clear").onclick=function(){
		 paint_list=''
		 ctx=document.getElementById("mycanvas").getContext("2d");
 		 ctx.fillStyle="white";
		 ctx.fillRect(0, 0, 650, 400);  }

document.getElementById("save").onclick=function(){
		 if (imagename.value=="")
			alert("image name cannot be empty")
		 else{ 
			
			$.post("/"+imagename.value,{'data':JSON.stringify(paint_list),'name':imagename.value},function(data,status){alert("saved");});
			}
	}

function colors(x){

	document.getElementById("blue").onclick=function(){
	x.strokeStyle='blue'; return 'blue';  }
	
	document.getElementById("red").onclick=function(){
	x.strokeStyle='red'; return 'red';  }

	document.getElementById("green").onclick=function(){
	x.strokeStyle='green'; return 'green'; }

	document.getElementById("eraser").onclick=function(){
	x.strokeStyle='white'; return 'white'; }
	}

function linewidth(x){
	document.getElementById("1px").onclick=function(){
	x.lineWidth = 1; return 1; }
	
	document.getElementById("3px").onclick=function(){
	x.lineWidth = 3; return 3; }

	document.getElementById("5px").onclick=function(){
	x.lineWidth = 5; return 5; }	

	document.getElementById("7px").onclick=function(){
	x.lineWidth = 7; return 7; }
	}
function loadimage(){
	document.location.href="/gallery"}
