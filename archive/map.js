/**
 * Created by autoc on 29/10/2017.
 */
var AltazonMap = function(){
	var _this = this;
	this.shared = new Shared(this);
	this.setupCanvas();
	this.setupSocket()
		.then(function(){
			_this.socket.emit('get-layout',{layout:'altspaceMarket'});

			_this.socket.on('get-position',function(position) {
				if(_this.layout){
					var ctx = _this.reloadLayout();
					ctx.save();
					ctx.fillStyle='#ff0000';
					ctx.translate(position.x+800, position.z+800);
					// Move registration point back to the top left corner of canvas
					ctx.rotate(position.roty);
					ctx.beginPath();
					ctx.moveTo(-5,4);
					ctx.lineTo(0, -8);
					ctx.lineTo(5, 4);
					ctx.fill();
					ctx.restore();
				}
			});
			_this.socket.on('get-layout',function(layout){
				_this.layout = layout;
				_this.socket.emit('get-position');
				//_this.reloadLayout();
			});
		});
};

AltazonMap.prototype = {

    setueilapCanvas: function () {
        this.canvas_eila = document.createElement('canvas');
        this.canvas_eila.width = 2000;
        this.canvas_eila.height = 750;
        this.canvas_eila.style.width = "2000px";
        this.canvas_eila.style.height = "750px";
        document.querySelector('#map-container').appendChild(this.canvas_eila);
        this.getUVs(15,10);
        var ctx = this.canvas_eila.getContext('2d');
        this.cells.forEach(function(cell,ci){
            ctx.fillStyle=randomColor({
				seed:ci
            });
            ctx.fillRect(cell.x*2000, cell.y*750, cell.width*2000, cell.height*750);
            var rgb = randomColor({
                seed:ci,
                format: 'rgb'
            });
            rgb = rgb.replace('rgb(','');
            rgb = rgb.replace(')','');
            var colors = rgb.split(', ');

            //console.log(colors.map(c=>Math.round((parseInt(c)/255)*1000000)/1000000).join(' '));

            ctx.font="10px Georgia";

            ctx.fillStyle=randomColor({
                seed:300-ci
            });
            ctx.fillText(ci.toString(),(cell.x*2000)+(cell.width*1000),(cell.y*750)+(cell.height*375));
        })
    },
    getUVs: function (rows, cols) {
        this.cells = [];
        var width = 1 / cols;
        var height = 1 / rows;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                var bounds = {
                    tl: {x: width * c, y: height * r},
                    bl: {x: width * c, y: height * r + height},
                    br: {x: width * c + width, y: height * r + height},
                    tr: {x: width * c + width, y: height * r}
                };
                this.cells.push({
                    x:bounds.tl.x,y:bounds.tl.y,
                    width:bounds.tr.x-bounds.tl.x,
                    height:bounds.bl.y-bounds.tl.y
                });
            }
        }
    },
	setupCanvas:function(){
		this.canvas = document.createElement('canvas');
		this.canvas.width = 1600;
		this.canvas.height = 1600;
		this.canvas.style.width = "1024px";
		this.canvas.style.height = "1024px";
		document.querySelector('#map-container').appendChild(this.canvas);
		//this.setueilapCanvas();
	},
	reloadLayout:function(){
		var _this = this;
		var ctx = this.canvas.getContext('2d');
		ctx.fillStyle='#b1f0ae';
		ctx.fillRect(0, 0, 1600, 1600);

		_this.loadImage('/assets/images/pavementmap.jpg')
			.then(function(image){
				var ptrn = ctx.createPattern(image, 'repeat'); // Create a pattern with this image, and set it to "repeat".
				ctx.fillStyle = ptrn;
				ctx.beginPath();
				ctx.moveTo(560, 255);
				ctx.lineTo(980, 255);
				ctx.arc(980, 455, 200, -Math.PI/2, 0);
				ctx.lineTo(1180, 600);
				ctx.ellipse(1180, 650, 115, 50, 0, -Math.PI/2, 0);
				// ctx.lineTo(1295, 900);
				// ctx.lineTo(1385, 900);
				// ctx.lineTo(1385, 650);
				ctx.lineTo(1285, 650);
				ctx.lineTo(1285, 630);
				ctx.lineTo(1395, 630);
				ctx.lineTo(1395, 1050);
				ctx.lineTo(1295, 1050);
				ctx.ellipse(1180, 1050, 115, 50, 0, 0, Math.PI/2);
				ctx.lineTo(1180, 1240);
				ctx.arc(980, 1240, 200, 0, Math.PI/2);

				ctx.lineTo(560, 1440);
				ctx.arc(560, 1240, 200, Math.PI*0.5, Math.PI);

				ctx.lineTo(360, 1080);

				ctx.lineTo(435, 1080);
				ctx.lineTo(435, 1240);
				ctx.arc(560, 1240, 125, Math.PI, Math.PI*0.5, true);

				ctx.lineTo(980, 1365);

				ctx.arc(980, 1240, 125, Math.PI*0.5, 0, true);

				ctx.lineTo(1105, 1240);
				ctx.lineTo(1105, 1165);
				ctx.ellipse(1105, 1050, 115, 50, 0, Math.PI/2, Math.PI);
				ctx.lineTo(1030, 1080);
				ctx.lineTo(915, 1080);
				ctx.lineTo(915, 1365);
				ctx.lineTo(885, 1365);
				ctx.lineTo(885, 1100);
				ctx.lineTo(795, 1100);
				ctx.lineTo(795, 1200);
				ctx.lineTo(765, 1200);
				ctx.lineTo(765, 940);
				ctx.lineTo(650, 940);
				ctx.lineTo(650, 840);
				ctx.lineTo(360, 840);
				ctx.arc(360, 817.5, 22.5, Math.PI*0.5, Math.PI*1.5);
				ctx.lineTo(360, 795);
				ctx.lineTo(680, 795);
				ctx.lineTo(680, 910);
				ctx.lineTo(765, 910);
				ctx.lineTo(765, 500);
				ctx.lineTo(795, 500);
				ctx.lineTo(795, 600);
				ctx.lineTo(885, 600);
				ctx.lineTo(885, 330);
				ctx.lineTo(915, 330);
				ctx.lineTo(915, 630);
				ctx.lineTo(1015, 630);
				ctx.ellipse(1105, 650, 115, 50, 0, -Math.PI, -Math.PI/2);
				ctx.lineTo(1105, 455);
				ctx.arc(980, 455, 125, 0, -Math.PI/2, true);
				ctx.lineTo(560, 330);
				ctx.arc(560, 455, 125, -Math.PI/2, -Math.PI, true);
				ctx.lineTo(435, 550);
				ctx.lineTo(360, 550);
				ctx.lineTo(360, 455);
				ctx.arc(560, 455, 200, -Math.PI/2, -Math.PI, true);
				ctx.closePath();
				ctx.fill();

				ctx.moveTo(620, 765);
				ctx.arc(360, 815, 265, 0, Math.PI*2);
				ctx.arc(360, 815, 285, Math.PI*2, 0, true);
				ctx.closePath();
				ctx.fill();

				ctx.moveTo(505, 765);
				ctx.arc(360, 815, 135, 0, Math.PI*2);
				ctx.arc(360, 815, 160, Math.PI*2, 0, true);
				ctx.closePath();
				ctx.fill();


				ctx.beginPath();
				ctx.fillStyle='#b1f0ae';
				ctx.fillRect(795, 660, 90, 100);
				ctx.fillRect(795, 780, 90, 100);
				ctx.fillRect(795, 940, 90, 100);

				ctx.fillRect(915, 660, 90, 100);
				ctx.fillRect(915, 780, 90, 100);
				ctx.fillRect(915, 940, 90, 100);

				ctx.fillRect(1015, 660, 95, 100);
				ctx.fillRect(1015, 780, 95, 100);
				ctx.fillRect(1015, 940, 95, 100);

				ctx.fillRect(1182, 660, 103, 100);
				ctx.fillRect(1182, 780, 103, 100);
				ctx.fillRect(1182, 940, 103, 100);

				ctx.fillRect(1295, 660, 90, 100);
				ctx.fillRect(1295, 780, 90, 100);
				ctx.fillRect(1295, 940, 90, 100);
				ctx.closePath();

				ctx.beginPath();
				ctx.fillStyle='#b1f0ae';
				ctx.moveTo(1180, 635);
				ctx.lineTo(1180, 634);
				ctx.ellipse(1180, 634, 80, 20, 0, -Math.PI/2, 0);
				ctx.fill();
				ctx.closePath();


				ctx.beginPath();
				ctx.fillStyle='#b1f0ae';
				ctx.moveTo(1107.5, 635);
				ctx.lineTo(1107.5, 634);
				ctx.ellipse(1107.5, 634, 80, 20, 0, -Math.PI, -Math.PI/2);
				ctx.fill();
				ctx.closePath();


				ctx.beginPath();
				ctx.fillStyle='#b1f0ae';
				ctx.moveTo(1180, 1055);
				ctx.lineTo(1180, 1054);
				ctx.ellipse(1180, 1054, 80, 20, 0, 0, Math.PI/2);
				ctx.fill();
				ctx.closePath();


				ctx.beginPath();
				ctx.fillStyle='#b1f0ae';
				ctx.moveTo(1107.5, 1055);
				ctx.lineTo(1107.5, 1054);
				ctx.ellipse(1107.5, 1054, 80, 20, 0, Math.PI/2, Math.PI);
				ctx.fill();
				ctx.closePath();


				// ctx.beginPath();
				// ctx.fillStyle='#b1f0ae';
				// ctx.moveTo(1180, 635);
				// ctx.lineTo(1180, 634);
				// ctx.ellipse(1180, 634, 80, 20, 0, -Math.PI/2, 0);
				// ctx.fill();
				// ctx.closePath();
			});
		this.layout.outlets.forEach(function (outlet, i) {
			_this.loadImage('/assets/images/stores.png')//9289ba
				.then(function(image){
					ctx.save();
					ctx.fillStyle='#ffffff';
					ctx.translate((outlet.position.x*4)+900, (outlet.position.y*4)+910);
					// Move registration point back to the top left corner of canvas
					ctx.rotate(outlet.rotation.y * Math.PI/180);
					ctx.drawImage(image,-41.5, -50);
					ctx.restore();
				});
		});



		this.layout.extras.forEach(function (extra, i) {
			ctx.save();
			switch(extra.type){
				case "tree-trunk":
				case "tree":
					//ctx.fillRect((extra.settings.x*4)+797+380, (extra.settings.y*2)+797, 6, 6);
					_this.loadImage('/assets/images/tree.png')
						.then(function(image){
							console.log()
							ctx.drawImage(image,(extra.settings.x*4)+890+(extra.type==="tree-trunk"?760:0), (extra.settings.y*4)+897.5);
						});
					break;
				case "street-sign":
					_this.loadImage('/assets/images/signmap.png')
						.then(function(image){
							console.log()
							ctx.drawImage(image,(extra.settings.x*4)+889, (extra.settings.y*4)+898);
						});
					break;
			}
		});
		return ctx;
	},
	images:{},
	loadImage:function(url){
		var _this = this;
		return new Promise(function(resolve){
			if(_this.images[url]){
				resolve(_this.images[url]);
			}else{
				var imageObj = new Image();

				imageObj.onload = function() {
					_this.images[url] = imageObj;
					resolve(_this.images[url]);
				};
				imageObj.src = url;
			}
		});
	},
	setupSocket:function(){
		var _this = this;
		return this.shared
			.setupSocket()
			.then(function(result){
				_this.socket = result.socket;
				_this.user = result.user;
				_this.socket.on('connect',function(){
					_this.socket.emit('guid',{guid:result.user.user.userId,client:"map"});
				});
			});
	}
};
new AltazonMap();
