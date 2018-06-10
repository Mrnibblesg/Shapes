function XYPair(x=0,y=0){
    this.x = x;
    this.y = y;
    
    this.add = function(obj){
        this.x += obj.x;
        this.y += obj.y;
    }
}

//x and y as a position
function Position(x=0,y=0){
    XYPair.call(this,x,y);
}

//x and y as a vector with x and y components.
//velocities and accelerations should be vectors.
function Vector(x=0,y=0){
    XYPair.call(this,x,y);
    
    this.getAngle = function(){
        return Math.atan2(this.y,this.x);
    }
    this.getMagnitude = function(){
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    
    this.getXComponent = function(){
        return this.x;
    }
    this.setXComponent = function(x){
        this.x = x;
    }
    this.changeXComponent = function(dx){
        this.x += dx;
    }
    
    this.getYComponent = function(){
        return this.y;
    }
    this.setYComponent = function(y){
        this.y = y;
    }
    this.changeYComponent = function(dy){
        this.y += dy;
    }
    
    //ang is in radians
    this.setAngle = function(ang){
        const mag = this.getMagnitude();
        this.x = mag * Math.cos(ang);
        this.y = mag * Math.sin(ang);
    }
    this.changeAngle = function(da){
        this.setAngle(this.getAngle() + da);
    }
    
    this.setMagnitude = function(mag){
        const ratio = mag / this.getMagnitude();
        this.x *= ratio;
        this.y *= ratio;
    }
    this.changeMagnitude = function(dm){
        this.setMagnitude(this.getMagnitude() + dm);
    }
}

function Shape(x=0,y=0){
    this.pos = new Position(x,y);
    
    this.getPos = function(){return this.pos;}
    this.getX = function(){return this.pos.x;}
    this.getY = function(){return this.pos.y;}
    
    this.setPos = function(pos){this.pos = pos;}
    this.setX = function(x){this.pos.x = x;}
    this.setY = function(y){this.pos.y = y;}
    
    this.changeX = function(dx){this.pos.x += dx;}
    this.changeY = function(dy){this.pos.y += dy;}
}

function Movable(xVel=0,yVel=0){
    if (this.pos == undefined){
        console.error("Attempted to make an object with no location movable.");
        console.log(this);
        return;
    }
    
    this.vel = new Vector(xVel,yVel);
    
    this.setVelocity = function(vector){
        this.vel.setMagnitude(vector.getMagnitude());
        this.vel.setAngle(vector.getAngle());
    }
    this.move = function(){
        this.changeX(this.vel.getXComponent());
        this.changeY(this.vel.getYComponent());
    }
}

function Rect(x=0,y=0,w=10,h=10,col="black",xVel=0,yVel=0){
    Shape.call(this,x,y);
    Movable.call(this,xVel,yVel);
    this.w = w;
    this.h = h;
    this.col = col;
    
    this.draw = function(context){
        context.fillStyle = this.col;
        context.fillRect(this.getX(),this.getY(),this.w,this.h);
    }
}
function Circle(x=0,y=0,r=10,col="black",xVel=0,yVel=0){
    Shape.call(this,x,y);
    Movable.call(this,xVel,yVel);
    this.r = r;
    this.col = col;
    
    this.draw = function(context){
        context.beginPath();
        context.fillStyle = this.col;
        context.arc(this.getX(),this.getY(),this.r,0,2*Math.PI);
        context.fill();
        context.closePath();
    }
}