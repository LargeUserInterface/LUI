import React from 'react';


class Wall extends React.Component{
	constructor(args){
		super();
		this.radius = 1;
		this.size = args.size;
		this.position = args.position;
		
	}
	render(state){
		const {context} = state;
		context.save();
		context.strokeStyle = '#fff';
	    context.fillStyle = '#3f51b5';
	    context.beginPath();
	    context.fillRect(this.position.x,this.position.y,this.size.width,this.size.height);
		context.fill();
	    context.stroke();
	    context.restore();
	}
}
export default Wall;