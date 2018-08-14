import React from 'react';
import {WALL_WIDTH} from './helpers';

class Bar extends React.Component{


	constructor(args){
		super();
		let x = args.position.x, y = args.position.y;
		this.position= {x,y};
		this.size = args.size;
		this.acceleration = 0.5;
		this.inertia = 1;
		this.velocity = {
			x : 0,
			y : 0
		}
		this.updateVertices();
	}

	updateVertices(){
		this.vertices = {
			top : {
				x: this.position.x,
				y :this. position.y
			},
			right : {
				x: this.position.x + this.size.width,
				y :this. position.y
			},
			bottom : {
				x: this.position.x + this.size.width,
				y :this. position.y + this.size.height
			},
			left: {
				x: this.position.x,
				y :this. position.y + this.size.height
			}
		};
	}

	accelerate(direction,state){
		if(direction === 'LEFT'){
			//accelerating left
			if(this.velocity.x>0){
		    		this.velocity.x -= this.inertia;
		    	}else{
		    		this.velocity.x -= this.acceleration;	
		    	}
		}
		else{
			//accelerating right
			
		    if(this.velocity.x<0){
		    		this.velocity.x += this.inertia;
		    	}else{
		    		this.velocity.x += this.acceleration;	
		    	}
		}
		
	}

	collide(direction){
		if(direction ==='X'){
			this.velocity.x = this.velocity.x * (-0.25);
		}
	}


	render(state){
		const position = this.position;
		const {context,keys} = state;
		if(keys.left && !keys.right){
			this.accelerate('LEFT',state);				
		}
		if(keys.right && !keys.left){
			this.accelerate('RIGHT',state);
		}
		if((this.vertices.left.x ) <= WALL_WIDTH){
			this.collide('X');
			this.position.x = WALL_WIDTH;
		}
		else if((this.vertices.right.x + WALL_WIDTH) >= state.screen.width){
			this.collide('X');
			this.position.x = state.screen.width - WALL_WIDTH - this.size.width;
		}
	    this.position.x+=this.velocity.x;
		this.updateVertices();
		context.save();
		context.strokeStyle = '#fff';
	    context.fillStyle = '#000';
	    context.beginPath();
	    context.fillRect(this.position.x,this.position.y,this.size.width,this.size.height);
		context.fill();
	    context.stroke();
	    context.restore();
	}
}
export default Bar;