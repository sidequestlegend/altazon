/**
 * Created by autoc on 04/10/2017.
 */
var Shared = function(context){
	this.context = context;
};
Shared.prototype = {
	guid:function() {
		var nav = window.navigator;
		var screen = window.screen;
		var guid = nav.mimeTypes.length;
		guid += nav.userAgent.replace(/\D+/g, '');
		guid += nav.plugins.length;
		guid += screen.height || '';
		guid += screen.width || '';
		guid += screen.pixelDepth || '';

		return guid;
	},
	getUserId:function(){
		return new Promise(function(resolve){
			function attemptContinue() {
				if (document.readyState === "complete"){
					if(altspace && altspace.inClient) {
						altspace.getThreeJSTrackingSkeleton().then(function (skeleton) {
							altspace.getUser().then(function (user) {
								resolve({user: user, skeleton: skeleton})
							});
						});
					}else{
						resolve({user: {userId:"null"}})
					}
				}
			}
			document.onreadystatechange = attemptContinue;
			attemptContinue();
		});
	},
	setupSocket: function(){
		return this.getUserId()
			.then(function(user){
				var ws;
				// if(easyrtc){
				// 	ws = easyrtc.webSocket;
				// }else{
                    ws = io.connect('http://marchecity.com:8443');
				// }
				return {user:user,socket:ws};
			});
		//socket.on('connect',function(){});
		//return socket;
	}
};