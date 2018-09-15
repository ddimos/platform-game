
class Game{
	constructor(name, canvasId) {
		
		this._name = name;
		this._canvas = document.getElementById(canvasId);
		this._context = this._canvas.getContext('2d');

		//game loop
		this._animId;
		this._dt;
		this._t0;

		this._onPause = false;

		this._rightPressed = false;
		this._leftPressed = false;		//in another file
		this._upperPressed = false;

		this._player;

		this._platforms=[];

		this._drawColliderBox = true;

		this._allObject = [];

	}
	get context() {
		return this._context;
	}

	createPlayer(radius, color,mass, position, velocity) {
		let a = new Chelovechek(radius, color ,mass);
		a.position = position;
		a.velocity = velocity;
		this._player = a;
		this._allObject.push(a)
	}

	createPlatform(obj) {
		let plane = new Platform(obj.radius, '#111');
		plane.position = obj.position;
		this._allObject.push(plane);
		this._platforms.push(plane);
	}

	start() {
		this.initT0();
		this.animFrame();
		//requestAnimationFrame(this.animFrame, this._canvas)
	}
	stop() {
		cancelAnimationFrame(this._animId);
	}

	initT0() {			//together for t0 and t1
		this._t0 = Date.now();
	}
	animFrame() {																		//example of game loop 
		this._animId = requestAnimationFrame(this.animFrame.bind(this), this._canvas); //https://codereview.stackexchange.com/questions/60216/gameloop-with-requestanimationframe

		this.onTimer();
	}

	onTimer() {
		let t1 = new Date().getTime(); 
		this._dt = 0.001*(t1-this._t0); 
		this._t0 = t1;
		if (this._dt>0.2) {this._dt=0;};
		
		
		this.checkCollision();
		this.move();
		this.clearCanvas();
		//this.draw(this._context,this._player);
		 for (let i=0; i<this._allObject.length; i++) {
		 	this.draw(this._context,this._allObject[i]);
		 }
		 console.log(this._player.onPlane)
		

	}


	checkCollision() { 			//problem with define onPlane (radius)
	


		
		for (let i=0; i<this._allObject.length; i++) {
			let firstObject = this._allObject[i];
			for (let j=i+1; j<this._allObject.length; j++) {
				let secondObject = this._allObject[j];

				if (firstObject.type === 'PLATFORM' && secondObject.type === 'PLATFORM') {
					continue;
				}

			//	console.log(firstObject.type +' . ' +secondObject.type);

				let from2to1 = secondObject.position.subtract(firstObject.position).length();
				let radiusSum = firstObject.radius + secondObject.radius;
				if (from2to1 < radiusSum) {
					if (firstObject.colliderBox.a2.y>=secondObject.colliderBox.a4.y &&
						firstObject.colliderBox.a2.x>secondObject.colliderBox.a4.x &&
						firstObject.colliderBox.a1.x<secondObject.colliderBox.a3.x &&
						firstObject.colliderBox.a3.y<secondObject.colliderBox.a1.y
						) {
						
						if (firstObject.type === 'HERO' && secondObject.type === 'PLATFORM') {
							firstObject.onPlane = true;
							firstObject.velocity = new Vector2D(firstObject.velocity.x, 0);
							firstObject.position = new Vector2D(firstObject.position.x, 
																secondObject.colliderBox.a4.y-firstObject.radius);
						}
					} else {
							if (firstObject.type === 'HERO' && secondObject.type === 'PLATFORM') {
							firstObject.onPlane = false;
						}
					}
				}
			}
		}	
	}



	move() {						//DICH	/rewrite
		if (this._rightPressed) {
			this._player.velocity = new Vector2D(30,this._player.velocity.y);
		} else if (this._leftPressed) {
			this._player.velocity = new Vector2D(-30,this._player.velocity.y);
		} else {
			this._player.velocity = new Vector2D(0,this._player.velocity.y);
		}
		
		if (this._upperPressed) {
			this._player.jump = true;
		}else {
			this._player.jump = false;
		}

		if (this._player.timeJump(this._dt)||(this._player.jump&&this._player.onPlane)) {
			this._player.velocity = new Vector2D(this._player.velocity.x, -50);
		} else {
			
			if (this._player.onPlane) {
				this._player.velocity = new Vector2D(this._player.velocity.x, 0);
			}else {
				this._player.velocity = this._player.velocity.addScaled(new Vector2D(0,50), this._dt); //apply gravity
			}
		}

		this._player.position = this._player.position.addScaled(this._player.velocity, this._dt);
	
	}


	draw(ctx, obj) {
	
		obj.draw(ctx);

		if (this._drawColliderBox) {
			obj.drawColliderBox(ctx);
		}
	}

	clearCanvas() {
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	}

	keyup(e) {	
	
		if (e == 39){
			this._rightPressed = false;
		} else if (e == 37) {
			this._leftPressed = false;
		}
		if (e == 38) {
			this._upperPressed = false;
		}
	}
	keydown(e) {

		if (e == 38) {
			this._upperPressed  = true;
		}
		if (e == 39) {
			this._rightPressed = true;
		}
		if (e == 37) {
			this._leftPressed = true;
		}
	
		if (e == 80) {
			this.pause();
			
		}
		

	}

	pause() {
		if (!this._onPause) {
			this.stop();
			this._onPause = true;
			console.log('ONPAUSE!!!!!!!!!!!!!!!!!!')
			this.textOnPause();
		} else {
			this.start()
			this._onPause = false;
		}	
	}
	textOnPause() {
	this._context.font = "50px Arial";
	this._context.strokeStyle = '#000';
	this._context.strokeText("PAUSE",0.5*this._canvas.width -75,0.5*this._canvas.height);
	}
}
