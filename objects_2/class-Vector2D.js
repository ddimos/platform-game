
class Vector2D{
	constructor(x,y) {
		this._x = x;
		this._y = y;
	}

	get x() {
		return this._x;
	}
	get y() {
		return this._y;
	}
	set x(x) {
		this._x = x;
	}
	set y(y) {
		this._y = y;
	}

	lengthSquared() {
		return this._x*this._x + this._y*this._y;
	}
	length() {
		return Math.sqrt(this.lengthSquared());
	}
	clone() {
		return new Vector2D(this._x, this._y);
	}
	normalize() {
		let length = this.length();
		if (length > 0) {
			this._x /= length;
			this._y /= length;
		}
	}
	add(vec) {
		return new Vector2D(this._x + vec.x, this._y + vec.y);
	}
	incrementBy(vec) {
		this._x += vec.x;
		this._y += vec.y;
	}
	subtract(vec) {
		return new Vector2D(this._x - vec.x, this._y - vec.y);
	}
	decrementBy(vec) {
		this._x -= vec.x;
		this._y -= vec.y;
	}
	multiply(k) {
		return new Vector2D(k*this._x, k*this._y);
	}
	multiplySeparatly(k1,k2) {
		return new Vector2D(k1*this._x, k2*this._y);
	}
	addScaled(vec, k) {
		return new Vector2D(this._x + k*vec.x, this._y + k*vec.y);
	}
	scaleBy(k) {
		this._x *= k;
		this._y *= k;
	}
	dotProduct(vec) {
		return this._x*vec.x + this._y*vec.y;
	}
	crossProduct(vec) {
 		return this._x*vec.y-this._y*vec.x;
	}

	angle() {
		return Math.atan2(this._y, this._x)
	}
	parallel(u, positive) { //c=b.parallel(50)
							//rezult vector c parallel to b
							//with length 50
		if (typeof(positive) === 'undefined') positive = true;
		let length = this.length();
		let vec = new Vector2D(this._x, this._y);

		if (positive) {
			vec.scaleBy(u/length);
		} else {
			vec.scaleBy(-u/length);
		}

		return vec;

	}
	perpendicular(u, anticlockwise) {
		if (typeof(anticlockwise) === 'undefined') anticlockwise = true;
		let length = this.length();
		let vec = new Vector2D(this._y, -this._x);

		if (length > 0) {
			if (anticlockwise) {
				vec.scaleBy(u/length);
			} else {
				vec.scaleBy(-u/length);
			}
		} else {
			vec = new Vector2D(0, 0);
		}
		return vec;

	}

	unit() {
		let length = this.length();

		if (length > 0) {
			return new Vector2D(this._x/length, this._y/length);
		} else {
			return new Vector2D(0, 0);
		}
	}

	projection(vec) { 			//this is just number(length)
		let length = this.length();
		let lengthVec = vec.length();
		let proj;

		if ( (length == 0) || (lengthVec == 0) ) {
			proj = 0;
		} else {
			proj = (this._x*vec.x + this._y*vec.y)/lengthVec;
		}
		return proj;
	}

	project(vec) {			//this is vector with that length
		return vec.parallel(this.projection(vec));
	}

	rotate(angl) {
		return new Vector2D(this._x*Math.cos(angl)-this._y*Math.sin(angl), this._x*Math.sin(angl)+this._y*Math.cos(angl))
	}


	static distance(vec1, vec2) {
		return (vec1.subtract(vec2)).length();
	}
	static angleBetween(vec1, vec2) {
		return Math.acos(vec1.dotProduct(vec2)/(vec1.length()*vec2.length()));
	}
	static scale(vec, sc) {
		vec.x *= sc;
		vec.y *= sc;
	}
	static vector2D(mag, angle, clockwise) {
		if (typeof(clockwise) === 'undefined') clockwise = true;

		let vec = new Vector2D(0, 0);
		vec.x = mag*Math.cos(angle);
		vec.y = mag*Math.sin(angle);

		if (!clockwise) {
			vec.y *= -1;
		}
		return vec;
	}

}