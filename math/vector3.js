class Vector3
{

    static get SIDE_DOWN(){
        return 0;
    }

    static get SIDE_UP(){
        return 1;
    }

    static get SIDE_NORTH(){
        return 2;
    }

    static get SIDE_SOUTH(){
        return 3;
    }

    static get SIDE_WEST(){
        return 4;
    }
    
    static get SIDE_EAST(){
        return 5;
    }

    constructor(x = 0, y = 0, z = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getZ(){
        return this.z;
    }

    getFloorX(){
        return Math.floor(this.x);
    }

    getFloorY(){
        return Math.floor(this.y);
    }

    getFloorZ(){
        return Math.floor(this.z);
    }

    getRight(){
        return this.getX();
    }

    getUp(){
        return this.getY();
    }

    getForward(){
        return this.getZ();
    }

    getSouth(){
        return this.getX();
    }

    getWest(){
        return this.getZ();
    }

    add(x, y = 0, z = 0){
        if(x instanceof Vector3) {
            return new Vector3(this.x + x.x, this.y + x.y, this.z + x.z);
        }
        else {
            return new Vector3(this.x + x, this.y + y, this.z + z);
        }
    }

    subtract(x = 0, y = 0, z = 0){
        if(x instanceof Vector3) {
            return this.add(-x.x, -x.y, -x.z);
        }
        else {
            return this.add(-x, -y, -z);
        }
    }

    multiply(number){
        return new Vector3(this.x * number, this.y * number, this.z * number);
    }

    divide(number)
    {
        return new Vector3(this.x / number, this.y / number, this.z / number);
    }

    ceil(){
        return new Vector3(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
    }

    floor(){
        return new Vector3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    }

    round(precision = 0, mode = "ROUND_HALF_UP"){
        return new Vector3(Math.round_php(this.x, precision, mode), Math.round_php(this.y, precision, mode), Math.round_php(this.z, precision, mode));
    }

    abs(){
        return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }

    getSide(side, step = 1){
        switch(side){
            case Vector3.SIDE_DOWN:
                return new Vector3(this.x, this.y - step, this.z);
            case Vector3.SIDE_UP:
                return new Vector3(this.x, this.y + step, this.z);
            case Vector3.SIDE_NORTH:
                return new Vector3(this.x, this.y, this.z - step);
            case Vector3.SIDE_SOUTH:
                return new Vector3(this.x, this.y, this.z + step);
            case Vector3.SIDE_WEST:
                return new Vector3(this.x - step, this.y, this.z);
            case Vector3.SIDE_EAST:
                return new Vector3(this.x + step, this.y, this.z);
            default:
                return this;
        }
    }

    asVector3(){
        return new Vector3(this.x, this.y, this.z);
    }

    getOppositeSide(side){
        if(side >= 0 && side <= 5) {
            return side ^ 0x01;
        }
    }

    distance(pos){
        return Math.sqrt(this.distanceSquared(pos));
    }

    distanceSquared(pos){
        return ((this.x - pos.x) ** 2) + ((this.y - pos.y) ** 2) + ((this.z - pos.z) ** 2);
    }

    maxPlainDistance(x = 0, z = 0){
        if(x instanceof Vector3){
            return this.maxPlainDistance(x.x, x.z);
        }
        else {
            return Math.max(Math.abs(this.x - x), Math.abs(this.z - z));
        }
    }

    length(){
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared(){
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    normalize(){
        let len = this.lengthSquared();

        if(len > 0) {
            return this.divide(Math.sqrt(len));
        }

        return new Vector3(0, 0, 0);
    }

    dot(v){
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v){
        return new Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    equals(v){
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    getIntermediateWithXValue(v, x){
        let xDiff = v.x - this.x;
        let yDiff = v.y - this.y;
        let zDiff = v.z - this.z;

        if((xDiff * xDiff) < 0.0000001){
            return null;
        }

        let f = (x - this.x) / xDiff;

        if(f < 0 || f > 1){
            return null;
        }
        else {
            return new Vector3(x, this.y + yDiff * f, this.z + zDiff * f);
        }
    }

    getIntermediateWithYValue(v, y){
        let xDiff = v.x - this.x;
        let yDiff = v.y - this.y;
        let zDiff = v.z - this.z;

        if((yDiff * yDiff) < 0.0000001){
            return null;
        }

        let f = (y - this.y) / yDiff;

        if(f < 0 || f > 1){
            return null;
        }
        else {
            return new Vector3(this.x + xDiff * f, y, this.z + zDiff * f);
        }
    }

    getIntermediateWithZValue(v, z){
        let xDiff = v.x - this.x;
        let yDiff = v.y - this.y;
        let zDiff = v.z - this.z;

        if((zDiff * zDiff) < 0.0000001){
            return null;
        }

        let f = (z - this.z) / zDiff;

        if(f < 0 || f > 1){
            return null;
        }
        else {
            return new Vector3(this.x + xDiff * f, this.y + yDiff * f, z);
        }
    }

    setComponents(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    toString(){
        return "Vector3(x=" + this.x + ",y=" + this.y + ",z=" + this.z + ")";
    }

}

module.exports = Vector3;