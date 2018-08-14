import React from 'react';
import Ball from './Ball';
import Wall from './Wall';
import Bar from './Bar';

import {BAR_HEIGHT, BAR_WIDTH, BAR_POSITION, WALL_WIDTH, POINTS_PER_COLLISION, BALL_RADIUS} from './helpers';


const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32
};

class Pong extends React.Component{
	constructor(){
		super();
		this.state = {
			screen : {
				width : window.innerWidth,
				height : window.innerHeight
			},
			keys : {
		        left  : 0,
		        right : 0,
		        up    : 0,
		        down  : 0,
		        space : 0,
		    },
			context : null,
			currentScore : 0,
			topScore: localStorage['topscore'] || 0
		};
		this.ball = [];
		this.bars = [];
		this.walls = [];
		
	}
	handleResize(value, e){
		this.setState({
		  screen : {
		    width: window.innerWidth,
		    height: window.innerHeight,
		  }
		});
	}
	updateScore(){
		this.setState({currentScore : this.state.currentScore + POINTS_PER_COLLISION});
		console.log(this.state.currentScore);
	}

	componentDidMount() {
	    window.addEventListener('keyup',   this.handleKeys.bind(this, false));
	    window.addEventListener('keydown', this.handleKeys.bind(this, true));
	    window.addEventListener('resize',  this.handleResize.bind(this, false));

	    const context = this.refs.canvas.getContext('2d');
	    this.setState({ context: context });
	    this.initializeCanvas();
	    this.startGame();
	    requestAnimationFrame(() => {this.update()});
	}
	initializeCanvas(){
		let leftWall = new Wall({
			size :{
				height : this.state.screen.height,
				width : WALL_WIDTH
			},
			position : {
				x: 0,
				y:0
			}
		});
		let rightWall = new Wall({
			size :{
				height : this.state.screen.height,
				width : WALL_WIDTH
			},
			position : {
				x: this.state.screen.width-WALL_WIDTH,
				y: 0
			}
		});

		let bottomBar = new Bar({
			size :{
				height : BAR_HEIGHT,
				width : BAR_WIDTH
			},
			position : {
				x: (this.state.screen.width)/2 - BAR_WIDTH/2,
				y: (this.state.screen.height) - (BAR_POSITION+BAR_HEIGHT)
			}
		});
		let topBar = new Bar({
			size :{
				height : BAR_HEIGHT,
				width : BAR_WIDTH
			},
			position : {
				x: (this.state.screen.width)/2 - BAR_WIDTH/2,
				y:  BAR_POSITION 
			}
		});
		this.createObject(leftWall, 'walls');
    	this.createObject(rightWall, 'walls');
    	this.createObject(bottomBar, 'bars');
    	this.createObject(topBar, 'bars');
	}
	updateObjects(items, group){
	    let index = 0;
	    for (let item of items) {
	      if (item.delete) {
	        this[group].splice(index, 1);
	      }else{
	        items[index].render(this.state);
	      }
	      index++;
	    }
	  }


	startGame(){
		this.setState({
	      inGame: true,
	      currentScore: 0,
	    });

		let ball = new Ball({
			position: {
				x: this.state.screen.width/2,
				y: this.state.screen.height/2
			},
			radius : BALL_RADIUS,
			create: this.createObject.bind(this),
			onDie: this.gameOver.bind(this),
			onBarCollision : this.updateScore.bind(this)
			});
		
		this.createObject(ball, 'ball');
    	
	}

	createObject(item,group){
		this[group].push(item);
	}
	gameOver(){
		var newTopScore = this.state.topScore < this.state.currentScore ? this.state.currentScore : this.state.topScore;
		this.setState({
	      inGame: false,
	      topScore : newTopScore
	    });
	    localStorage['topscore'] = newTopScore;
	    console.log('gameOver');
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleKeys);
		window.removeEventListener('resize', this.handleKeys);
		window.removeEventListener('resize', this.handleResize);
	}

	handleKeys(value, e){
		let keys = this.state.keys;
		if(e.keyCode === KEY.LEFT   || e.keyCode === KEY.A) keys.left  = value;
		if(e.keyCode === KEY.RIGHT  || e.keyCode === KEY.D) keys.right = value;
		if(e.keyCode === KEY.UP     || e.keyCode === KEY.W) keys.up    = value;
		if(e.keyCode === KEY.SPACE) keys.space = value;
		this.setState({
			keys : keys
		});
	}

	update(){
		const context = this.state.context;
		const keys = this.state.keys;
		
		// Motion trail
		context.fillStyle = '#fff';
		context.globalAlpha = 1;
		context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
		context.globalAlpha = 1;

		this.handleBallBarsCollision();

		this.updateObjects(this.ball, 'ball');
		this.updateObjects(this.walls, 'walls');
		this.updateObjects(this.bars, 'bars');

		requestAnimationFrame(() => {this.update()});
	}
	handleBallBarsCollision(){
		this.ball.forEach(ball=>{
			let r = ball.radius, x = ball.position.x, y= ball.position.y;
			this.bars.forEach(bar=>{
				//hitting from top-left or top-right or bottom-left or bottom-right at a corner
				//collide xy
				//x1-x2 = r && y1-y2 = r

				//top left
				if(bar.vertices.top.x - x <= r && 
					bar.vertices.top.x - x >=0 && 
					bar.vertices.top.y - y <= r && 
					bar.vertices.top.y - y >=0 &&
					ball.velocity.x >0 && 
					ball.velocity.y > 0){

					ball.setPosition(bar.vertices.top.x-r, bar.vertices.top.y-r);
					console.log('topleft');
					ball.collide({direction:'xy', type:'bar' , bar:bar});
				}
				//top right
				else if(x - bar.vertices.right.x <= r &&  
					x - bar.vertices.right.x  >=0 && 
					bar.vertices.right.y -  y <= r &&
					bar.vertices.right.y -  y >=0 &&
					ball.velocity.x >0 && 
					ball.velocity.y < 0){

					ball.setPosition(bar.vertices.right.x+r, bar.vertices.right.y-r);
					console.log('top right');
					ball.collide({direction:'xy', type:'bar' , bar:bar});
				}


				//bottom left
				else if(bar.vertices.left.x - x <= r &&   
					bar.vertices.left.x - x >=0 && 
					(  y - bar.vertices.left.y <= r) &&
					 y - bar.vertices.left.y >=0 &&
					 ball.velocity.x < 0 && 
					ball.velocity.y > 0){
					
					ball.setPosition(bar.vertices.left.x-r, bar.vertices.left.y+r);
					console.log('bottom left');
					
					ball.collide({direction:'xy', type:'bar' , bar:bar});
				}

				//bottom right
				else if(x - bar.vertices.bottom.x <= r && 
					x - bar.vertices.bottom.x >=0 && 
					(y - bar.vertices.bottom.y  <= r) &&
					y - bar.vertices.bottom.y >=0 &&
					ball.velocity.x < 0 && 
					ball.velocity.y < 0){
					ball.setPosition(bar.vertices.right.x+r, bar.vertices.right.y+r);
					console.log('bottom right')
					ball.collide({direction:'xy',type:'bar' , bar:bar});
				}

				//hitting left edge
				//collide x
				else if(bar.vertices.left.x - x <=r &&
					bar.vertices.left.x - x >=0 &&
					( y > (bar.vertices.top.y - r) && y < (bar.vertices.bottom.y + r ))){
					
					ball.setPosition(bar.vertices.left.x-r, y);
					console.log('left edge');
					ball.collide({direction:'x',type:'bar' , bar:bar});
					ball.accelerateX('LEFT');
				}
				//hitting right edge
				//collide x
				else if(x - bar.vertices.right.x <=r &&
					x - bar.vertices.right.x >=0 &&
					( y > (bar.vertices.top.y - r) && y < (bar.vertices.bottom.y + r ))){
					
					ball.setPosition(bar.vertices.right.x+r, y);
					console.log('right edge');
					ball.collide({direction:'x',  type:'bar' , bar:bar});
					ball.accelerateX('RIGHT');
				}

				//hitting top edge
				//collide x
				else if(bar.vertices.top.y - y  <=r && 
					bar.vertices.top.y - y >=0 &&
					( x > (bar.vertices.top.x - r) && x < (bar.vertices.right.x + r ))){
					console.log('top edge');
					ball.setPosition(x, bar.vertices.top.y-r);
					ball.collide({direction:'y', type:'bar' , bar:bar});
				}
				//hitting bottom edge
				//collide x
				else if(y  - bar.vertices.bottom.y  <= r && 
					y  - bar.vertices.bottom.y >=0 && 
					( x > (bar.vertices.left.x - r) && x < (bar.vertices.bottom.x + r ))){
					console.log('bottom edge');
					ball.setPosition(x, bar.vertices.bottom.y+r);
					ball.collide({direction:'y', type:'bar', bar:bar});
				}
				
			})
		});
	}
	render(){
		let endGame = <div/>;
		if(!this.state.inGame){
			endGame = <div style={{position:"fixed",top : 0, left: 0 , right:0,bottom:0, zIndex : 5, background:"#000"}}>
					<div style={{position:"fixed",top:"50%",left:"50%",transform : "translate(-50%,-50%)", color : "white", textAlign:"center"}}>
					<h2>Game Over</h2>
					<p> Score : {this.state.currentScore}</p>
					<p> TopScore : {this.state.topScore}</p>
					<button onClick={this.startGame.bind(this)}> Restart </button>
					</div>
			</div>;
		}
		
		let scores = <div style={{position:"fixed",top:"0",left:"0",right:"0",height:"15px",padding:"5px 25px"}}>
			<div style={{float:"right", marginLeft:"10px"}}> Score : {this.state.currentScore} </div>
			<div style={{float:"right", marginLeft:"10px"}}> TopScore : {this.state.topScore} </div>
		</div>

		return <div>{endGame}
		{scores}<canvas ref="canvas" width={this.state.screen.width} height={this.state.screen.height} /></div>;
	}
};

export default Pong;