


class Object {
	constructor(radius,color,mass) {
		if(typeof(radius)==='undefined') radius = 20;
		if(typeof(color)==='undefined') color = '#0000ff';
		if(typeof(mass)==='undefined') mass = 1;	
		
		this._radius = radius;
		this._color = color;
		this._mass = mass;

		this._x = 0;
		this._y = 0;
		this._vx = 0;
		this._vy = 0;
	}


	get position () {
 		return new Vector2D(this._x, this._y);
 	}
 	set position(s) {
 		this._x = s.x;
 		this._y = s.y;
 	}

 	get velocity() {
 		return new Vector2D(this._vx, this._vy);
 	}
 	set velocity(v) {
 		this._vx = v.x;
 		this._vy = v.y;
 	}

 	get mass() {
 		return this._mass;
 	}
 	get radius() {
 		return this._radius;
 	}

 	get colliderBox() {			//	  a4.----.a3  
								//		|    |
								//	  	|    |
								//    a1.____.a2
								//		a4.---------.a3
								//		  |			|
								//		a1._________.a2 
								//
		return {
			a1: new Vector2D(this._x - this._radius, this._y+this._radius),
			a2: new Vector2D(this._x + this._radius, this._y+this._radius),
			a3: new Vector2D(this._x + this._radius, this._y-this._radius),
			a4: new Vector2D(this._x - this._radius, this._y-this._radius)
		}
	}
	drawColliderBox(context) {
 		context.strokeStyle = 'red';
 		context.beginPath();
 		context.moveTo(this.colliderBox.a1.x,this.colliderBox.a1.y);
 		context.lineTo(this.colliderBox.a2.x,this.colliderBox.a2.y);
 		context.lineTo(this.colliderBox.a3.x,this.colliderBox.a3.y);
 		context.lineTo(this.colliderBox.a4.x,this.colliderBox.a4.y);
 		context.closePath();
 		context.stroke();
 		context.beginPath();
 		context.arc(this._x, this._y, this.radius, 0,2*Math.PI,false);
 		context.closePath();
 		context.stroke();	
 	}
}