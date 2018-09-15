
class Chelovechek extends Object{
	constructor(radius, color, mass) {
		super(radius, color, mass);

		this._type = 'HERO';
		
		this._onPlane = false;
		this._jump = false;
		this._tJump = 0.2;
		this._tj = 0;

		this._num = 0;
	} 

	get radius() {
		return 1.5*this._radius;
	}

 	get onPlane() {
 		return this._onPlane;
 	}
 	set onPlane(s) {
 		this._onPlane = s;
 	}
 	get jump() {
 		return this._jump;
 	}
 	set jump(s) {
 		this._jump = s;
 	}

 	get type() {
 		return this._type;
 	}

 	timeJump(dt) {
		if (this._jump&&this._onPlane) {
			this._tj = this._tJump;
		}

		if (this._tj>0) {
			this._tj-=dt;
			return true
		} else {
			return false
		}
	}

	get colliderBox() {			//	  a4.----.a3  
								//		|    |
								//	  	|    |
								//    a1.____.a2
								//		p1.---------.p2
		return {
			a1: new Vector2D(this._x - 0.5*this._radius, this._y+1.5*this._radius),
			a2: new Vector2D(this._x + 0.5*this._radius, this._y+1.5*this._radius),
			a3: new Vector2D(this._x + 0.5*this._radius, this._y-1.5*this._radius),
			a4: new Vector2D(this._x - 0.5*this._radius, this._y-1.5*this._radius)
		}
	}

	draw(context) {
	if (!this._onPlane) {			
		
		if (this.velocity.x>0) {
			this.drawJumpRight(context);
		} else if (this.velocity.x<0) {
			this.drawJumpLeft(context);
		} else {
			this.drawFalling(context);
		}
		
	
	}else {
		if (this.velocity.x>0){
			if (this._num < 10 ) {
				this.drawGoRight(context);
				this._num++ ;
			} else if (this._num < 20) {
				this.drawGo(context);
				this._num ++;
			}
			if (this._num == 20) {
				this._num = 0
			}
		} else if (this.velocity.x<0){
			if (this._num < 10 ) {
				this.drawGoLeft(context);
				this._num++ ;
			} else if (this._num < 20) {
				this.drawGo(context);
				this._num ++;
			}
			if (this._num == 20) {
				this._num = 0
			}
		} else {

			this.drawStand(context);
		}
	}

	}


 	drawStand (context) {  
		let r = this._radius; // radius of body
		let rh = 0.5*r; // radius of head
		context.save();
		context.fillStyle = this._color;
		context.strokeStyle = this._color;	
		
		context.beginPath();
		context.arc(this._x, this._y-r-rh-5, rh, 0, 2*Math.PI, true); // head
		context.closePath();
		context.fill();
		
		context.lineWidth = 5;
		context.lineJoin = 'round';
		
		context.beginPath();										//body
		context.moveTo(this._x- 0.3*r,this._y-r);
		context.lineTo(this._x,this._y);
		context.lineTo(this._x+ 0.3*r,this._y-r);
		context.closePath();
		context.fill();
		context.stroke();
		
		context.lineWidth = 5;
		
		context.beginPath();										//legs
		context.moveTo(this._x,this._y);	
		context.lineTo(this._x - 0.5*r, this._y+1.5*r);
		context.lineTo(this._x,this._y);
		context.lineTo(this._x + 0.5*r, this._y+1.5*r);
		context.closePath();
		context.stroke();
		
		context.beginPath();										//left arm
		context.moveTo(this._x - r, this._y-0.2*r);	//from hand to shoulder
		context.lineTo(this._x - 0.3*r, this._y-r);
		context.closePath();
		context.stroke();
		
		context.beginPath();										//right arm
		context.moveTo(this._x + r, this._y-0.2*r);
		context.lineTo(this._x + 0.3*r, this._y-r);
		context.closePath();
		context.stroke();

		context.restore();								//STAND
	}

	drawGoRight (context) {  							//RIGHT
		let r = this._radius; // radius of body
		let rh = 0.5*r; // radius of head
//		let yMinusR
		context.save();
		context.fillStyle = this._color;
		context.strokeStyle = this._color;	
	
		context.beginPath();
		context.arc(this._x, this._y-r-rh-5, rh, 0, 2*Math.PI, true); // head
		context.closePath();
		context.fill();
		
		context.lineWidth = 5;
		context.lineJoin = 'round';
		context.beginPath();										//body
		context.moveTo(this._x,this._y-r);
		context.lineTo(this._x,this._y);
		context.closePath();
		context.fill();
		context.stroke();
		
		context.lineWidth = 5;
	
		context.beginPath();										//left legs
	//	context.moveTo(this._x,this._y);	
		context.moveTo(this._x - 0.6*r, this._y+1.4*r);
		context.lineTo(this._x - 0.3*r, this._y+r);
		context.lineTo(this._x,this._y);
		context.lineTo(this._x - 0.3*r, this._y+r);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//right legs
		context.moveTo(this._x,this._y);	
		context.lineTo(this._x + 0.7*r, this._y+1.4*r);
	//	context.lineTo(this._x,this._y);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//left arm
		context.moveTo(this._x - 0.5*r, this._y+0.2*r);
		context.lineTo(this._x - 0.5*r, this._y-0.4*r);
		context.lineTo(this._x , this._y-r);
		context.lineTo(this._x - 0.5*r, this._y-0.4*r);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//right arm
		context.moveTo(this._x + r, this._y-r);
		context.lineTo(this._x + 0.5*r, this._y-0.4*r);
		context.lineTo(this._x, this._y-r);
		context.lineTo(this._x + 0.5*r, this._y-0.4*r);
		context.closePath();
		context.stroke();

		context.restore();	
	}

	drawGo (context) {  
		let r = this._radius; // radius of body
		let rh = 0.5*r; // radius of head
//		let yMinusR
		context.save();
		context.fillStyle = this._color;
		context.strokeStyle = this._color;	
		context.beginPath();
		context.arc(this._x, this._y-r-rh-5, rh, 0, 2*Math.PI, true); // head
		context.closePath();
		context.fill();
		context.lineWidth = 5;
		context.lineJoin = 'round';

		context.beginPath();										//body
		context.moveTo(this._x,this._y-r);
		context.lineTo(this._x,this._y);
		context.closePath();
		context.fill();
		context.stroke();
		context.lineWidth = 5;

		context.beginPath();										//left legs
	//	context.moveTo(this._x,this._y);	
		context.moveTo(this._x - 0.2*r, this._y+1.5*r);
		context.lineTo(this._x,this._y);
		context.closePath();
		context.stroke();

		context.beginPath();										//right legs
		context.moveTo(this._x,this._y);	
		context.lineTo(this._x + 0.2*r, this._y+1.5*r);
	//	context.lineTo(this._x,this._y);
		context.closePath();
		context.stroke();

		context.beginPath();										//left arm
		context.moveTo(this._x - 0.2*r, this._y+0.4*r);
		context.lineTo(this._x , this._y-r);
		context.closePath();
		context.stroke();

		context.beginPath();										//right arm
		context.moveTo(this._x + 0.2*r, this._y+0.4*r);
		context.lineTo(this._x, this._y-r);	
		context.closePath();
		context.stroke();
		context.restore();	
	}

	drawGoLeft (context) {  							//LEFT
		let r = this._radius; // radius of body
		let rh = 0.5*r; // radius of head
//		let yMinusR
		context.save();
		context.fillStyle = this._color;
		context.strokeStyle = this._color;	
	
		context.beginPath();
		context.arc(this._x, this._y-r-rh-5, rh, 0, 2*Math.PI, true); // head
		context.closePath();
		context.fill();
		
		context.lineWidth = 5;
		context.lineJoin = 'round';
		context.beginPath();										//body
		context.moveTo(this._x,this._y-r);
		context.lineTo(this._x,this._y);
		context.closePath();
		context.fill();
		context.stroke();
		
		context.lineWidth = 5;
	
		context.beginPath();										//left legs
	//	context.moveTo(this._x,this._y);	
		context.moveTo(this._x + 0.6*r, this._y+1.4*r);
		context.lineTo(this._x + 0.3*r, this._y+r);
		context.lineTo(this._x,this._y);
		context.lineTo(this._x + 0.3*r, this._y+r);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//right legs
		context.moveTo(this._x,this._y);	
		context.lineTo(this._x - 0.7*r, this._y+1.4*r);
	//	context.lineTo(this._x,this._y);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//left arm
		context.moveTo(this._x + 0.5*r, this._y+0.2*r);
		context.lineTo(this._x + 0.5*r, this._y-0.4*r);
		context.lineTo(this._x , this._y-r);
		context.lineTo(this._x + 0.5*r, this._y-0.4*r);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//right arm
		context.moveTo(this._x - r, this._y-r);
		context.lineTo(this._x - 0.5*r, this._y-0.4*r);
		context.lineTo(this._x, this._y-r);
		context.lineTo(this._x - 0.5*r, this._y-0.4*r);
		context.closePath();
		context.stroke();

		context.restore();	
	}
	drawFalling (context) {  								//FALLING
		let r = this._radius; // radius of body
		let rh = 0.5*r; // radius of head
		context.save();
		context.fillStyle = this._color;
		context.strokeStyle = this._color;	
		
		context.beginPath();
		context.arc(this._x, this._y-r-rh-5, rh, 0, 2*Math.PI, true); // head
		context.closePath();
		context.fill();
		
		context.lineWidth = 5;
		context.lineJoin = 'round';
		
		context.beginPath();										//body
		context.moveTo(this._x- 0.3*r,this._y-r);
		context.lineTo(this._x,this._y);
		context.lineTo(this._x+ 0.3*r,this._y-r);
		context.closePath();
		context.fill();
		context.stroke();
		
		context.lineWidth = 5;
		
		context.beginPath();										//legs
		context.moveTo(this._x,this._y);	
		context.lineTo(this._x - 0.4*r, this._y+1.5*r);
		context.lineTo(this._x,this._y);
		context.lineTo(this._x + 0.4*r, this._y+1.5*r);
		context.closePath();
		context.stroke();
		
		context.beginPath();										//left arm
		context.moveTo(this._x - r, this._y-2*r);	//from hand to shoulder
		context.lineTo(this._x - 0.3*r, this._y-r);
		context.closePath();
		context.stroke();
		
		context.beginPath();										//right arm
		context.moveTo(this._x + r, this._y-2*r);
		context.lineTo(this._x + 0.3*r, this._y-r);
		context.closePath();
		context.stroke();

		context.restore();	
	}

	drawJumpRight (context) {  							//RIGHT_JUMP
		let r = this._radius; // radius of body
		let rh = 0.5*r; // radius of head
//		let yMinusR
		context.save();
		context.fillStyle = this._color;
		context.strokeStyle = this._color;	
	
		context.beginPath();
		context.arc(this._x, this._y-r-rh-5, rh, 0, 2*Math.PI, true); // head
		context.closePath();
		context.fill();
		
		context.lineWidth = 5;
		context.lineJoin = 'round';
		context.beginPath();										//body
		context.moveTo(this._x,this._y-r);
		context.lineTo(this._x,this._y);
		context.closePath();
		context.fill();
		context.stroke();
		
		context.lineWidth = 5;
	
		context.beginPath();										//left legs
	//	context.moveTo(this._x,this._y);	
		context.moveTo(this._x - 0.6*r, this._y+1.4*r);
		context.lineTo(this._x - 0.3*r, this._y+r);
		context.lineTo(this._x,this._y);
		context.lineTo(this._x - 0.3*r, this._y+r);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//right legs
		context.moveTo(this._x,this._y);	
		context.lineTo(this._x + 0.7*r, this._y+1.4*r);
	//	context.lineTo(this._x,this._y);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//left arm
		context.moveTo(this._x - 0.5*r, this._y+0.2*r);
		context.lineTo(this._x - 0.5*r, this._y-0.4*r);
		context.lineTo(this._x , this._y-r);
		context.lineTo(this._x - 0.5*r, this._y-0.4*r);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//right arm
		context.moveTo(this._x + r, this._y-2*r);
		context.lineTo(this._x + 0.5*r, this._y-1.1*r);
		context.lineTo(this._x, this._y-r);
		context.lineTo(this._x + 0.5*r, this._y-1.1*r);
		context.closePath();
		context.stroke();

		context.restore();	
	}
	drawJumpLeft (context) {  							//LEFT_JUMP
		let r = this._radius; // radius of body
		let rh = 0.5*r; // radius of head
//		let yMinusR
		context.save();
		context.fillStyle = this._color;
		context.strokeStyle = this._color;	
	
		context.beginPath();
		context.arc(this._x, this._y-r-rh-5, rh, 0, 2*Math.PI, true); // head
		context.closePath();
		context.fill();
		
		context.lineWidth = 5;
		context.lineJoin = 'round';
		context.beginPath();										//body
		context.moveTo(this._x,this._y-r);
		context.lineTo(this._x,this._y);
		context.closePath();
		context.fill();
		context.stroke();
		
		context.lineWidth = 5;
	
		context.beginPath();										//left legs
	//	context.moveTo(this._x,this._y);	
		context.moveTo(this._x + 0.6*r, this._y+1.4*r);
		context.lineTo(this._x + 0.3*r, this._y+r);
		context.lineTo(this._x,this._y);
		context.lineTo(this._x + 0.3*r, this._y+r);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//right legs
		context.moveTo(this._x,this._y);	
		context.lineTo(this._x - 0.7*r, this._y+1.4*r);
	//	context.lineTo(this._x,this._y);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//right arm
		context.moveTo(this._x + 0.5*r, this._y+0.2*r);
		context.lineTo(this._x + 0.5*r, this._y-0.4*r);
		context.lineTo(this._x , this._y-r);
		context.lineTo(this._x + 0.5*r, this._y-0.4*r);
		context.closePath();
		context.stroke();
	
		context.beginPath();										//left arm
		context.moveTo(this._x - r, this._y-2*r);
		context.lineTo(this._x - 0.5*r, this._y-1.1*r);
		context.lineTo(this._x, this._y-r);
		context.lineTo(this._x - 0.5*r, this._y-1.1*r);
		context.closePath();
		context.stroke();

		context.restore();	

}




}
	// draw2(context) {
	// 	let r = this._radius; // radius of body
	// 	let rh = 0.5*r; // radius of head
	// 	context.save();
	// 	context.fillStyle = this._color;
	// 	context.strokeStyle = this._color;	
	// 	context.beginPath();
	// 	context.arc(this._x, this._y-r-rh-25, rh, 0, 2*Math.PI, true); // head
	// 	context.closePath();
	// 	context.fill();
	// 	context.lineWidth = 5;
	// 	context.lineJoin = 'round';
	// 	context.beginPath();										//body
	// 	context.moveTo(this._x- r,this._y-3*r);
	// 	context.lineTo(this._x,this._y);
	// 	context.lineTo(this._x+ r,this._y-3*r);
	// 	context.closePath();
	// 	context.fill();
	// 	context.stroke();
	// 	context.lineWidth = 5;
	// 	context.beginPath();										//legs
	// 	context.moveTo(this._x,this._y);	
	// 	context.lineTo(this._x - 0.5*r, this._y+3.5*r);
	// 	context.lineTo(this._x,this._y);
	// 	context.lineTo(this._x + 0.5*r, this._y+3.5*r);
	// 	context.closePath();
	// 	context.stroke();
	// 	context.beginPath();										//left arm
	// 	context.moveTo(this._x - r, this._y-3*r+3.25*r);
	// 	context.lineTo(this._x- r,this._y-3*r);
	// 	context.closePath();
	// 	context.stroke();
	// 	context.beginPath();										//right arm
	// 	context.moveTo(this._x + r, this._y-3*r+3.25*r);
	// 	context.lineTo(this._x + r, this._y-3*r);
	// 	context.closePath();
	// 	context.stroke();

	// 	context.restore();	
	// }
