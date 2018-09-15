
let a ;

let player,walls; 


let force, acc;
let g = 200;



let num = 0;


window.onload = init;

function init() {

	let gameChel = new Game('Chelovechek', 'canvas');

	gameChel.createPlayer(15,'#2d4766',1,new Vector2D(400,150), new Vector2D(0,0));
//	player.drawStand(gameChel.context)
//	player.drawColliderBox(gameChel.context)

//console.log()

	let b = new Platform(50, '#000', 0);
	b.position = new Vector2D(200,300)
	b.draw(gameChel.context)
	b.drawColliderBox(gameChel.context)

	//APLLYGRAVITY()

	let platforms = [
		{position: new Vector2D(300,400), radius: 0.5*80},
		{position: new Vector2D(371,383), radius: 0.5*70},
		{position: new Vector2D(450,330), radius: 0.5*70},
		{position: new Vector2D(515,320), radius: 0.5*70},
		{position: new Vector2D(610,320), radius: 0.5*10},
		{position: new Vector2D(700,300), radius: 0.5*100},
		{position: new Vector2D(800,520), radius: 0.5*70},
		{position: new Vector2D(300,220), radius: 0.5*300},
		{position: new Vector2D(900,500), radius: 0.5*50},
		{position: new Vector2D(1000,450), radius: 0.5*50},
		{position: new Vector2D(1100,400), radius: 0.5*50},
		{position: new Vector2D(1300,400), radius: 0.5*150},
//		{position: new Vector2D(1400,350), radius: 0.5*50},
//		{position: new Vector2D(1500,300), radius: 0.5*70},
//		{position: new Vector2D(1600,270), radius: 0.5*15},
//		{position: new Vector2D(1300,250), radius: 0.5*150},

	]

	for (let i=0;i<platforms.length; i++) {
		gameChel.createPlatform(platforms[i])
	}

	window.addEventListener('keydown', function(e) {
		gameChel.keydown(e.keyCode);
	}, false);		
	window.addEventListener('keyup', function(e) {
		gameChel.keyup(e.keyCode)
	}, false);

	gameChel.start();
}

function createPlatforms(obj) {
	let plane = new Platform(obj.length);
	plane.position = obj.position;
	plane.draw(context);
	walls.push(plane);
}

				function animFrame() {
					animId = requestAnimationFrame(animFrame,canvas);
					onTimer(); 
				}
				function onTimer() {
					let t1 = new Date().getTime(); 
					dt = 0.001*(t1-t0); 
					t0 = t1;

					if (dt>0.2) {dt=0;};	
					move();
				}

function move() {
	
	checkCollision(player);
	calcForce();
	updateAccel();
	updateVelo();
	moveObject();
}

function checkCollision(obj) {
	let hadFirstHit ;

	let hasCollis = false;

	for (let i=0; i<walls.length &&!hasCollis ; i++){
		let wall = walls[i];
		
		if (outsideCanvas(walls[i].p2.x, walls[i].p1.x)) { 
			continue;
		}

								//    a1.____.a2 colliderBox
								//		p1.---------.p2 platform
		
		if (obj.position.y >= wall.p1.y-1.5*obj.radius && obj.position.y -5 <= wall.p1.y-1.5*obj.radius&& (obj.colliderBox.a2.x>wall.p1.x)&&(obj.colliderBox.a1.x<wall.p2.x)) {
			obj.onPlane = true;
			hasCollis = true;
		} else{
			obj.onPlane = false;
		}
	
		if (obj.position.y < wall.p1.y-1.5*obj.radius && obj.position.y -5 > wall.p1.y-1.5*obj.radius&& (obj.colliderBox.a2.x<wall.p1.x)&&(obj.colliderBox.a1.x>wall.p2.x)) {
			hadFirstHit = false
		}

		if (obj.onPlane&&!hadFirstHit) {
			let b = obj.velocity.x
			obj.velocity = new Vector2D(b,0);
			let a = obj.position.x; 
			obj.position = new Vector2D(a,wall.p1.y-1.5*obj.radius);
			hadFirstHit = true;
		}
	}

	if (obj.position.y>canvas.height){
		player.position = new Vector2D(300,150);
		player.velocity = new Vector2D(0, 0);
	}
}

function moveObject() {
	player.position = player.position.addScaled(new Vector2D(0,player.velocity.y), dt);
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	for (let i=0; i<walls.length; i++) {
		walls[i].position = walls[i].position.addScaled(new Vector2D(player.velocity.x,0), -dt);
		
		if (!outsideCanvas(walls[i].p1.x, walls[i].p2.x)) {
			walls[i].draw(context)
		}
	}
	
}
function calcForce() {

//	let drag = Forces.drag(0.2, player.velocity);
	let drag = Forces.vAndH_Drag(0.2,0.01,player.velocity,(rightPressed||leftPressed)) //kh,kv
	let sideForse;
	let jumpForce;
	let gravity = Forces.constantGravity(player.mass, g);
	let normal;


	if (player.onPlane) {
	 	normal = new Vector2D(0, -player.mass*g);
	} else {
	 	normal = new Vector2D(0, 0);
	 }

	if (rightPressed) {
		sideForce = new Vector2D(1000, 0);
	} else if (leftPressed) {
		sideForce = new Vector2D(-1000, 0);
	} else {
		sideForce = new Vector2D(0, 0);
	}

	if (player.timeJump(dt)||(player.jump&&player.onPlane)) {
	 //	jumpForce =  Forces.spring(10, extension);
	 	jumpForce = new Vector2D(0, -2000);
	 } else {
	 	jumpForce = new Vector2D(0, 0);
	 }


	force = Forces.add([drag, sideForce, gravity,normal,jumpForce]);
//	console.log(force.x+' f ' +player.velocity.x)
	
}
function updateAccel() {
	acc = force.multiply(1/player.mass);
}

function updateVelo() {

	player.velocity = player.velocity.addScaled(acc, dt);
	if (Math.abs(force.x)<1&&(!leftPressed&&!rightPressed)) {
		player.velocity=new Vector2D(0,player.velocity.y)
	}
}






function outsideCanvas(obj1, obj2) {
	if (obj2 < 0 || obj1 > canvas.width) {
		return true;
	} else {
		return false;
	}
 
}