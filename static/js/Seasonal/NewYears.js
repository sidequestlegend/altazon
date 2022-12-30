var NewYears = function(context){
    this.fall_time = 1514764800;
    this.context = context;
    this.context.scene.mode = 'snow';
    this.context.scene.day_mode = 'night';
    this.outter_container = new THREE.Group();
    this.outter_container.rotation.set(0,Math.PI*0.75,0);
    this.outter_container.position.set(-70,5.5,90);
    this.outter_container.scale.set(2,2,2);
    this.context.simulation.scene.add(this.outter_container);
    this.new_year_offset = this.context.getParameterByName('new-year-offset')||0;
    this.fall_time-= this.new_year_offset*60*60;
    this.clock();
    this.tower();
    this.ball();
    this.stage();
};
NewYears.prototype = {
    stage:function(){
        var texture = new THREE.TextureLoader().load('/assets/models/weave.png')
        texture.repeat.set(2,0.5);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        var stage = new THREE.Mesh(new THREE.BoxGeometry(20,1,10),new THREE.MeshBasicMaterial({map:texture,color:'#001315'}));
        stage.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
        stage.position.y = -2.5;
        stage.position.z = 4;
        this.outter_container.add(stage);

        var stage_bak_left = new THREE.Mesh(new THREE.PlaneGeometry(8,6),new THREE.MeshBasicMaterial({map:texture,color:'#001315'}));
        stage_bak_left.position.set(8,0.5,0);
        stage_bak_left.rotation.y = -Math.PI*0.25;
        this.outter_container.add(stage_bak_left)

        var stage_bak_right = new THREE.Mesh(new THREE.PlaneGeometry(8,6),new THREE.MeshBasicMaterial({map:texture,color:'#001315'}));
        stage_bak_right.position.set(-8,0.5,0);
        stage_bak_right.rotation.y = Math.PI*0.25;
        this.outter_container.add(stage_bak_right)
    },
    moveDown:function(){
        var _this = this;
        if(this.current_time_seconds){
            var fall_second = this.current_time_seconds+(-this.new_year_offset*60*60)-(this.fall_time-11);
            if(fall_second===-1){
                _this.sound_mp3 = new altspaceutil.behaviors.NativeComponent('n-sound',{src: '/assets/countdown.mp3',autoplay:true, oneshot: true,minDistance:10,maxDistance:15});
                _this.sound_ogg = new altspaceutil.behaviors.NativeComponent('n-sound',{src: '/assets/countdown.ogg',autoplay:true, oneshot: true,minDistance:10,maxDistance:15});
                _this.outter_container.addBehaviors(this.sound_mp3);
                _this.outter_container.addBehaviors(this.sound_ogg);
            }
            if(fall_second>0&&fall_second<11){
                if(fall_second===1){
                    _this.ball.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-object',{res: 'effects/explosion'}));
                }
                new TWEEN.Tween(this.ball.position).to({x:0,y:50-(2.5*fall_second),z:0}, 850)
                    .easing(TWEEN.Easing.Back.InOut)
                    .onComplete(function(){
                        if(fall_second===6){
                            setTimeout(function(){
                                _this.ball.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-object',{res: 'effects/fireworks'}));
                            },300);
                            _this.outter_container.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-object',{res: 'effects/fireworks'}));
                            _this.outter_container.children.forEach(function(child,i){
                                if(i%3===0){
                                    setTimeout(function(){
                                        child.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-object',{res: 'effects/fireworks'}));
                                    },1000*Math.random());
                                }
                            });
                        }
                        if(fall_second===10){
                            _this.ball.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-object',{res: 'effects/explosion'}));
                        }
                    })
                    .start();
            }
            var count_down_date = new Date((-fall_second+10)*1000);
            //console.log(count_down_date);
            _this.time_number.getBehaviorByType('n-text').data.text = fall_second>10?'Happy New Year':count_down_date.getUTCDate()===1?('00'+count_down_date.getUTCHours()).slice(-2)+":"+('00'+count_down_date.getUTCMinutes()).slice(-2)+":"+('00'+count_down_date.getUTCSeconds()).slice(-2):'';
            if(fall_second>10){
                _this.time_number.position.z = 2;
                _this.time_number.position.y = 17;
                _this.time_number.scale.set(1.5,1.5,1.5)
            }
        }
    },
    tower:function(){
        var pole = new THREE.Mesh(new THREE.CylinderGeometry(0, 3, 60, 2 ),new THREE.MeshBasicMaterial({color:'#000000'}));
        pole.position.y = 45;
        for(var i = 0; i<10; i++){
            var y = i * 2.55;
            var number = this.load_text(i+1);
            number.scale.set(2,2,2);
            number.position.set(0,y+21,0.3);
            this.outter_container.add(number);
        }
        var logo = new THREE.Mesh( new THREE.PlaneGeometry(6.5,4.5), new THREE.MeshBasicMaterial({alphaTest: 0.5,transparent:true,map:new THREE.TextureLoader().load('/assets/images/logo-snow.png'),side:THREE.DoubleSide}) );
        logo.position.z = 1;
        logo.position.y = 17.5;
        this.outter_container.add( logo );

        this.time_number = this.load_text('00:00:00');
        this.time_number.position.set(0,8,0);
        this.outter_container.add(this.time_number);
        pole.position.z = -0.3;
        pole.rotation.y = Math.PI/2;
        this.outter_container.add(pole);
    },
    clock:function(){
        var _this = this;
        var container = new THREE.Group();
        container.position.y= 10;
        var back = new THREE.Mesh(new THREE.RingGeometry( 6, 4, 30, 1),new THREE.MeshBasicMaterial({side:THREE.DoubleSide,color:'#444444',map:new THREE.TextureLoader().load('/assets/images/rainbow.jpg')}));
        container.add(back);
        var middle = new THREE.Mesh(new THREE.RingGeometry( 0.5, 0.0001, 30, 1),new THREE.MeshBasicMaterial({color:'#000000'}));
        middle.rotation.y = Math.PI;
        middle.position.z = 0.3;
        middle.addEventListener('cursorup',function(){
            if(_this.context.setup.user_info&&(_this.context.setup.user_info.userId === "707158522659340439"||_this.context.setup.user_info.isModerator)){
                _this.context.socket.emit('test-countdown');
            }
        });
        container.add(middle);
        for(var i = 0; i<12; i++){
            var a = (Math.PI*2/12*i)+Math.PI/2;
            var x = Math.cos(a) * 4.9;
            var y = Math.sin(a) * 4.9;
            var number = this.load_text(12-i);
            number.position.set(x,y-0.1,0.2);
            container.add(number);
        }
        var second_hand = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.1, 5, 2 ),new THREE.MeshBasicMaterial( {color: 0x000000} ));
        second_hand.rotation.y = Math.PI/2;
        second_hand.position.y = 2.5;
        second_hand.position.z = 0.3;

        this.second_hand = new THREE.Group();
        this.second_hand.add(second_hand);
        container.add(this.second_hand);



        var minute_hand = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.2, 5, 2 ),new THREE.MeshBasicMaterial( {color: 0x000000} ));
        minute_hand.rotation.y = Math.PI/2;
        minute_hand.position.y = 2.5;
        minute_hand.position.z = 0.3;

        this.minute_hand = new THREE.Group();

        this.minute_hand.add(minute_hand);
        container.add(this.minute_hand);

        var hour_hand = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.3, 5, 2 ),new THREE.MeshBasicMaterial( {color: 0x000000} ));
        hour_hand.rotation.y = Math.PI/2;
        hour_hand.position.y = 2.5;
        hour_hand.position.z = 0.3;

        this.hour_hand = new THREE.Group();

        this.hour_hand.rotation.z = Math.PI;
        this.hour_hand.add(hour_hand);
        container.add(this.hour_hand);

        this.outter_container.add(container);
    },
    ball:function(){
        this.ball = new THREE.Mesh(new THREE.IcosahedronGeometry(4,2),new THREE.MeshBasicMaterial( {map:new THREE.TextureLoader().load('/assets/images/new-years-ball.jpg')} ));
        this.ball.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-mesh-collider',{type: 'environment', convex: false}));
        this.ball.material.map.wrapS = THREE.RepeatWrapping;
        this.ball.material.map.wrapT = THREE.RepeatWrapping;
        this.ball.geometry.faceVertexUvs[0].forEach(function(uv,i){
            if(i%2===0){
                uv[0].set(0,0);
                uv[1].set(0,1);
                uv[2].set(1,1);
            }else{
                uv[0].set(0,0);
                uv[1].set(1,0);
                uv[2].set(1,1);
            }
        });
        this.ball.material.map.repeat.set(0.25,0.25);
        var time = new Date();
        if(this.new_year_offset)time.setUTCHours(time.getUTCHours()+Math.floor(this.new_year_offset));
        this.ball.position.y = Math.floor(time.getTime()/1000)-(this.new_year_offset*60*60)>this.fall_time?25:50;
        this.ball_animation_position = 0;
        this.outter_container.add(this.ball);
    },
    load_text:function(string){
        var mesh = new THREE.Object3D();
        mesh.addBehaviors(new altspaceutil.behaviors.NativeComponent('n-text',{text: string}));
        return mesh;
    },
    update:function(){
        var time = this.context.current_time_offset?new Date(new Date().getTime()+this.context.current_time_offset):new Date();
        var _this = this;
        if(this.new_year_offset)time.setUTCHours(time.getUTCHours()+Math.floor(this.new_year_offset));
        if(!this.current_time_seconds||this.current_time_seconds!==Math.floor(time.getTime()/1000)){
            var interval = {i:0};
            var current_seconds = this.second_hand.rotation.z,
                current_minutes = this.minute_hand.rotation.z,
                current_hours = this.hour_hand.rotation.z;
            new TWEEN.Tween(interval).to({i:1}, 250)
                .onUpdate(function(){
                    var second_amount = ((-time.getUTCSeconds() / 60 * 2 * Math.PI)-current_seconds)*interval.i;
                    _this.second_hand.rotation.z = current_seconds+second_amount;
                    var minutes_amount = ((-time.getUTCMinutes() / 60 * 2 * Math.PI)-current_minutes)*interval.i;
                    _this.minute_hand.rotation.z = current_minutes+minutes_amount;
                    var hour_amount = ((-(time.getUTCHours()+(time.getUTCMinutes() / 60)) / 12 * 2 * Math.PI)-current_hours)*interval.i;
                    _this.hour_hand.rotation.z = current_hours+hour_amount;
                })
                .easing(TWEEN.Easing.Elastic.Out)
                .start();
            this.moveDown();
            if(this.current_time_seconds%2===0){
                var current_offset = {x:_this.ball.material.map.offset.x,y:_this.ball.material.map.offset.y};
                new TWEEN.Tween(current_offset).to({x:_this.ball_animation_position%4*0.25,y:Math.floor(_this.ball_animation_position/4)*0.25}, 1750)
                    .onUpdate(function(){
                        _this.ball.material.map.offset.x = current_offset.x;
                        _this.ball.material.map.offset.y = current_offset.y;
                    })
                    .onComplete(function(){
                        _this.ball_animation_position++;
                        if(_this.ball_animation_position>15){
                            _this.ball_animation_position=0;
                        }
                    })
                    .easing(TWEEN.Easing.Back.InOut)
                    .start();
            }
            this.current_time_seconds = Math.floor(time.getTime()/1000);
        }
    }
};