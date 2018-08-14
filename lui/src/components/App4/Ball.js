import React from 'react';
import {randomNumBetween, WALL_WIDTH} from './helpers';

class Ball extends React.Component{
	constructor(args){
		super();
		this.onDie = args.onDie;
		this.onBarCollision = args.onBarCollision;
		this.position = args.position;
		this.velocity = {
			x : randomNumBetween(-5,5),
			y : randomNumBetween(2,5)
		};
		this.radius = args.radius;
	}
	collide(args){
		if(args.direction ==='x'){
			this.velocity.x = -this.velocity.x;
		}else if(args.direction ==='y'){
			this.velocity.y = -this.velocity.y;
			this.onBarCollision();
		}else{
			this.velocity.x = -this.velocity.x;
			this.velocity.y = -this.velocity.y;
			this.onBarCollision();
		}
	}
	accelerateX(direction){
		if(direction === 'LEFT'){
			this.velocity.x -=3;
		}else{
			this.velocity.x +=3;
		}
	}
	setPosition(x,y){
		this.position.x = x;
		this.position.y = y;
	}
	destroy(){
		this.delete = true;
		this.onDie();
	}
	render(state){
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

	    if((this.position.y - this.radius )<0 || (this.position.y + this.radius )> state.screen.height){
	    	return this.destroy();
	    }
	    
	    //edges
	    if((this.position.x - this.radius) < WALL_WIDTH){
	    	this.position.x = WALL_WIDTH + this.radius;
	    	this.collide({direction : 'x'});
	    }
	    if((this.position.x + this.radius + WALL_WIDTH) > state.screen.width){
	    	this.position.x = state.screen.width - WALL_WIDTH - this.radius;
	    	this.collide({direction : 'x'});
	    }
	    
		const {context} = state;
		context.save();
		context.translate(this.position.x, this.position.y);
	    context.strokeStyle = 'black';
	    context.fillStyle = '#e91e63';
	    context.lineWidth = 0;
	    context.beginPath();
		context.arc(0, 0, this.radius, 0, Math.PI*2);
		context.fill();
	    context.stroke();
	    context.restore();
	}
}
export default Ball;