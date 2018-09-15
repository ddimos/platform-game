
class Platform extends Object{
	constructor(radius, color, mass, angle){
		super(radius, color, mass);
		
		if(typeof(angle)==='undefined') angle = 0;

		this._type = 'PLATFORM';

		this._length = 2*this._radius;
		this._angle = angle*3.14159/180;
		this._side = 1;

	}


 	// get p1() {
 	// 	return new Vector2D(this._x-this._length/2*Math.cos(this._angle), this._y+this._length/2*Math.sin(this._angle))
 	// }
 	// get p2() {
 	// 	return new Vector2D(this._x+this._length/2*Math.cos(this._angle), this._y-this._length/2*Math.sin(this._angle))
 	// }

 	get dir() {
		return this.p2.subtract(this.p1);
	}

	get normal() {
		return this.dir.perpendicular(1);
	}
	get side() {
		return this._side;
	}
	set side(l) {
		this._side = l;
	}
	get angle() {
		return this._angle;
	}

	get type() {
 		return this._type;
 	}

	get colliderBox() {			//	  a4.----.a3  
								//		|    |
								//	  	|    |
								//    a1.____.a2
		return {
			a1: new Vector2D(this._x - this._radius, this._y + 10),
			a2: new Vector2D(this._x + this._radius, this._y + 10),
			a3: new Vector2D(this._x + this._radius, this._y),
			a4: new Vector2D(this._x - this._radius, this._y)
		}
	}

	draw(context) {
		context.save();
		context.strokeStyle = '#000000';
		context.lineWidth = 1;
		context.beginPath();
		context.moveTo(this.colliderBox.a1.x,this.colliderBox.a1.y);
 		context.lineTo(this.colliderBox.a2.x,this.colliderBox.a2.y);
 		context.lineTo(this.colliderBox.a3.x,this.colliderBox.a3.y);
 		context.lineTo(this.colliderBox.a4.x,this.colliderBox.a4.y);
		context.closePath();
		//context.stroke();
		context.fill()
		context.restore();
	}
}