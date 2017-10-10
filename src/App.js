import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import img_hero from "./img/icons8-Shield-64.png"
import img_arrowUp from "./img/icons8-ArrowUp-96.png"
import img_arrowLeft from "./img/icons8-ArrowLeft-96.png"
import img_arrowDown from "./img/icons8-ArrowDown-96.png"
import img_arrowRight from "./img/icons8-ArrowRight-96.png"
import sound_backgroundMusic from  "./sound/Galileo_background_music.wav"
import sound_badGuyDied from  "./sound/Galileo_badGuyDied.wav"
import sound_bossDied from  "./sound/Galileo_bossDied.wav"
import sound_playerAttack from  "./sound/Galileo_playerAttack.wav"
import sound_playerDied from  "./sound/Galileo_playerDied.wav"
import sound_itemUp from  "./sound/Galileo_itemUp.wav"
import sound_weaponUp from  "./sound/Galileo_weaponUp.wav"

// Resources
/*
https://www.youtube.com/watch?v=XD4seEJD9Lo
https://www.w3schools.com/graphics/game_components.asp
https://www.youtube.com/watch?v=fGvvi5vR17s
http://www.roguebasin.com/index.php?title=How_to_Write_a_Roguelike_in_15_Steps#Step_4_-_The_map

*/

function roundDown(n, multiple) {
	return Math.floor(n/multiple) * multiple;
}

function limitText(text) {
	// console.log("    text test: ", text);
	const modText = 
				(text.length>12)?
					text.split("").slice(0,9).join("")+" ...":
					text;
	return modText;
}

function objClone(object) {
	const newObject = JSON.parse(JSON.stringify(object));
	return newObject;
}

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			interval: 500,
			intervalID: 0,
			showMenu: true,
			sound: false,
			game: {name: "", saveGame: false}
		}
	}	
	
	showMenu(display) {
		this.setState({showMenu: !display});
	}
	
	initialSet(obj) {
		this.setState({game: obj});		
	}

	backgroundMusic() {
		// sound_backgroundMusic
		const soundFile = "./sound/Galileo_background_music.wav";
		const sound = new Audio(sound_backgroundMusic);
		sound.play();
		sound.currentTime = 0;
		sound.loop = true;
	}
	
	componentWillMount() {
		// Called the first time the component is loaded right before the component is added to the page
		// document.addEventListener("onClick", this.arrowPosition);
		// document.addEventListener("keydown", this.arrowPosition);

		// play background music
		this.backgroundMusic();
	}
	
	componentDidMount() {
		// Called after the component has been rendered into the page
		// var interval = this.state.interval;
		// var dt = 1
		// setInterval( ()=>{
		// 	let x = this.state.x + (this.state.vx*dt);
		// 	let y = this.state.y + (this.state.vy*dt);
		// 	console.log("coords:", x+","+y);
		// 	this.changePosition(0, y);
		// }, interval);
		
		// document.getElementById("hero").focus();
	}
	
	componentWillReceiveProps() {
		// Called when the props provided to the component are changed
		
	}
	
	componentWillUpdate() {
		// Called when the props are/or state change
		
	}
	
	componentWillUnmount() {
		// Called when the component is removed
		
	}
	
	
	render() {
		return (
			<div className="container-fluid home">
			{(this.state.sound)?this.backgroundMusic():""}
				<Intro 
					homeState={this.state} 
					showMenu={(display)=>this.showMenu(display)}
					initialSet={(obj)=>this.initialSet(obj)}/>
				<Camera homeState={this.state}>
					<World homeState={this.state}/>
				</Camera>
			</div>
		);
	}
	
}

class Intro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			saveGame: false,
			required: false
		}
		this.showMenu = this.showMenu.bind(this);
		this.setName = this.setName.bind(this);
	}
	
	setName(event) {
    const target = event.target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;
		this.setState({
			[name]: value
		})
	}
	
	showMenu(event) {
		event.preventDefault();
		if (this.state.name.trim().length>1) {
			const test = this.props.homeState.showMenu;
			this.props.showMenu(test);
			this.props.initialSet(this.state);
			this.setState({required: false});
		} else {
			this.setState({required: true});
		}
	}
	
	render() {
		
		const cssIntroShow = {
			display: (this.props.homeState.showMenu)?"":"none"
		}

		const cssBackBtn = {
			display: (!this.props.homeState.showMenu)?"":"none"
		}

		return(
			<div className="row">
				<button 
					type="button"
					className="btn btn-link btn-lg btn-backBtn" 
					onClick={this.showMenu} 
					style={cssBackBtn}>
					Menu
				</button>
				{/* // FIXME: get bad guy/ boss images */}
				<div className="col-xs-12 intro" style={cssIntroShow}>
					<div className="container-fluid">
						
						<div className="row">
							<div className="col-xs-12">
								<h1 className="title">Galileo</h1>
							</div>
							<div className="col-xs-12">

								<form className="form-horizontal" onSubmit={this.showMenu}>
									
									<div className="form-group form-name" >
										<label htmlFor="heroName" className="col-xs-3 col-sm-4 control-label text-right">
											Player
											<sup className={this.state.required?"reqText":"hide"}>*</sup>
										</label>
										<div className="col-xs-8 col-sm-5 col-md-5 col-lg-5 text-left">
											<input 
												type="text" 
												className={"form-control " + ((this.state.required)?"nameFocus":"")} 
												id="heroName-input"
												name="name"
												placeholder="Enter Your Name" 
												// value={this.state.name}
												onChange={this.setName}/>
											<small className={this.state.required?"reqText":"hide"}>
												*requires more than 1 character
											</small>
										</div>
									</div>
									
									<div className="form-group text-left hide">										
										<div className="col-xs-offset-4 col-xs-8">
											<div className="checkbox">
												<label>
													<input 
														id="saveBox" 
														name="saveGame" 
														type="checkbox"
														onChange={this.setName}/> Remember me
												</label>
											</div>
										</div>
									</div>

									<div className="form-group text-center">
										<div className="col-xs-12">
											<button 
												type="submit" 
												className="btn btn-success btn-start">
												Start Adventure!
											</button>
										</div>
									</div>

								</form>

							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								{/* Credits [link to credits page] */}
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								{/* [add website info/footer/(c)/etc.] */}
							</div>
						</div>
						
					</div>
				</div>				
			</div>
		);
	}
}

class World extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			sizeWidth: 30,
			sizeHeight: 30,
			rows: 20,
			cols: 30,
			board:[
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],

			],
			level: 1,
			hero: {
				stats: {
					name: "Thor",
					img: "./_img/tree1.png",
					life: 3,
					hp: 50,
					xp: 100,
					class: 1,
					weapon: {name:"Fists", damage:5},
					alive: true,
					xpMin: 50
				},
				locs: {x:0, y:0},
				dt:5,
				width:10,
				height:15
			},
			hero_x: 100,
			hero_y: 100,
			hero_dt: 10,
			heroWidth: 10,
			heroHeight: 15,
			others: {number:2, width:15, height:15, locs:[], stats:[]},
			showShadow: true
		}
		this.showShadow = this.showShadow.bind(this);
		// this.othersCreateStats = this.othersCreateStats.bind(this);
		this.logState = this.logState.bind(this);
	}

	makeArray(rows=1, cols=1, value=0) {
		// creates a row x col matrix, each element = value
		const vector = new Array(cols).fill(value);
		var matrix = [];
		for (var i = 0; i < rows; i++) {
			const vec = vector.slice();
			matrix.push(vec);
		}
		return matrix;
	}
	
	createMap(x=this.state.hero_x, y=this.state.hero_y) {
		const width  = this.state.sizeWidth;
		const height = this.state.sizeHeight;
		const rows = this.state.rows;
		const cols = this.state.cols;
		let baseMatrix = this.makeArray(rows, cols);

		baseMatrix.forEach( (vector, r)=>{
			vector.forEach( (element, s)=>{

				if (r===0 || s===0 || r===rows-1 || s===cols-1) { // edges of map should be trees
					baseMatrix[r][s] = 1;
				} else {
					baseMatrix[r][s] = Math.round(Math.random()*0.6);
				}

			});
		});
		
		// set tile(s) where hero begins to 0 (empty)
		baseMatrix[roundDown(y, height)/height][roundDown(x,width)/width] = 0;
		this.setState({board: baseMatrix});
		
		//create locations of bad guys, items, and other objects
		this.othersLocation(baseMatrix, x, y);		
	}
	
	updateHeroLoc(x, y) {
		// console.log("hero: "+x,y);
		this.setState({
			hero_x: x,
			hero_y: y
		});
	}
	
	updateHeroStats(heroStats) {	
		const newHero = objClone(this.state.hero);

		if (heroStats.xp > 300) {
			heroStats.class = heroStats.class+1;
			heroStats.xp = this.state.hero.stats.xpMin;
		} 

		newHero.stats = heroStats;
		this.setState({hero: newHero});
	}
	
	updateOthersStats(othersStats,otherIndex) {	
		const newOthers = objClone(this.state.others)	;
		newOthers.stats[otherIndex] = othersStats;
		this.updateOthersObj(newOthers);
	}
	
	updateOthersObj(othersObj) {
		this.setState({
			others: othersObj
		});
	}	
	
	worldStyle() {
		const extraPix = 0;
		const width = this.state.sizeWidth*this.state.cols;
		const height = this.state.sizeHeight*this.state.rows;
		const widthD = 0// this.state.sizeWidth*this.state.cols;
		const heightD = 0// this.state.sizeHeight*this.state.rows;
		const display = (this.props.homeState.showMenu)?"none":"";
		const css = {
			left: -1*(this.state.hero_x)+(width/2)+extraPix, // MAKES BOARD FOLLOW HERO
			top: -1*(this.state.hero_y)+(height/2)+extraPix, // MAKES BOARD FOLLOW HERO
			minWidth: width,
			width: width,
			height: height,
			display: display
		}
		// console.log("world dims:",css.width, css.height);
		return css;
	}
	
	othersLocation(board=this.state.board,x,y) {
		// random location for badGuys, items, etc, within certain constraints

		const numberOfBadGuys = 2*this.state.level;
		const numberOfItems = 2*Math.round(Math.random()*this.state.level*1.5+1);
		const numberOfWeapons = 2*Math.round(Math.random()*this.state.level*1.5+1);

		const numberOfOtherGuys = numberOfBadGuys + numberOfItems + numberOfWeapons + 1;
		let otherLocs=[];
		let otherStats=[];
		for (var j=0; j<numberOfOtherGuys; j++) {
			const hero_x = (x)?x:this.state.hero_x;
			const hero_y = (y)?y:this.state.hero_y;
			const width  = this.state.sizeWidth;
			const height = this.state.sizeHeight;

			let otherGuy_x, otherGuy_y, test=true, type, i=0;

			if (j<numberOfBadGuys) {type="badGuy"}
			else if (j<numberOfBadGuys+numberOfItems) {type="item"}
			else if (j<numberOfBadGuys+numberOfItems+numberOfWeapons) {type="weapon"}
			else {type="boss"}

			while(test) {
				otherGuy_x = Math.floor(Math.random()*this.state.cols);
				otherGuy_y = Math.floor(Math.random()*this.state.rows);
				if (
					board[otherGuy_y][otherGuy_x]!==1 && 
					otherGuy_y!==roundDown(hero_y, height)/height && 
					otherGuy_x!==roundDown(hero_x,width)/width ) {
					test=false;
					otherLocs.push({type:type, x:otherGuy_x*width, y:otherGuy_y*height});
					otherStats.push(this.othersCreateStats(type));
				}

				i++;
				if (i>5) {
					test=false;
				}
			}

		}

		const newOthers = JSON.parse(JSON.stringify(this.state.others));
		newOthers.locs = otherLocs;
		newOthers.stats = otherStats;
		this.setState({others: newOthers});

	}

	othersCreateStats(type) {
		const others = this.state.others;
		var life=0, hp=0, xp=0, classLevel=0, weapon={name: "", damage: 0}, alive=true;
		if (type==="badGuy") {
			hp = this.state.level*Math.round(Math.random()*10+5);
			xp = this.state.level*Math.round(Math.random()*10+5);
			classLevel = this.state.level;
			weapon = this.chooseWeapon();
		} else if (type==="boss") {
			hp = this.state.level*Math.round(Math.random()*5+50);
			xp = this.state.level*Math.round(Math.random()*20+100);
			classLevel = this.state.level;
			weapon = this.chooseWeapon();
		} else if (type==="item") {
			hp = this.state.level*Math.round(Math.random()*3+1)*10;;
		} else if (type==="weapon") {
			weapon = this.chooseWeapon();
		}

		const stats = {
			life: life,
			hp: hp,
			xp: xp,
			class: classLevel,
			weapon: weapon,
			alive: alive
		}
		
		return stats;
	}
	
	chooseWeapon() {
		// always have 2x as many weapons as levels
		// order weapons to correspond well to level=>difficulty of enemies
		const weapons = [
			{name: "Fists",						damage: 5},
			{name: "Spade",						damage: 5},
			{name: "Shears",					damage: 10},
			{name: "Knife",						damage: 10},
			{name: "Hatchet",					damage: 15},
			{name: "Tomahawk",				damage: 15},
			{name: "Broadaxe",				damage: 18},
			{name: "Fire-Axe",				damage: 18},
			{name: "Saw",							damage: 20},
			{name: "Machete",					damage: 20},
			{name: "Buzz-Saw",				damage: 25},
			{name: "Chainsaw",				damage: 30}
		];
		const random = Math.floor(Math.random()*this.state.level*2);

		return weapons[random];
	}
	
	setName(name) {
		const newHeroState = objClone(this.state.hero);
		newHeroState.stats.name = name;
		this.setState({hero: newHeroState})
	}

	setLevel(reset) {
		if (reset!=="reset") {
			this.setState({level: this.state.level+1});
		}		
		this.createMap();
	}

	showShadow() {		
		const test = !this.state.showShadow;
		this.setState({showShadow: test});
	}

	logState() {
		// console.log(this.state);
	}
	
	componentWillMount() {
		
		// define hero initial state
		const x = Math.floor(this.state.cols*this.state.sizeWidth/2);
		const y = Math.floor(this.state.rows*this.state.sizeHeight/2);
		this.setState({hero_x:x, hero_y:y});

		// create map (and set up bad guys/items/etc initial location)
		this.createMap(x, y);
		
		// set hero name
		const name = this.props.homeState.game.name;
		const newHero = objClone(this.state.hero);
		this.setState({hero: newHero});
		
	}
	
	componentWillUpdate() {
		// Called when the props are/or state change
		// console.log("world update")
	}
	
	componentWillReceiveProps(nextProps) {
		// console.log("props update", nextProps)
		this.setName(nextProps.homeState.game.name);
		// this.setState({ data: nextProps.data });  
	}
	
	render() {
		var tileColor = ["green", "treeSprite", "blue"];
		
		const tiles = this.state.board.map( (vector, row)=>{
			const tileRow = vector.map( (value, col)=>{
				// let boxShadow="none";
				// if (row===0 || col===0 || row===this.state.rows-1 || col===this.state.cols-1) {
				// 	boxShadow = "inset " + ((row===0)?" 0 ":(col===0)?" 15px ":(row===this.state.rows-1)?" -15px ":" 0 ") + ((row===0)?" 15px ":(col===0)?" 0 ":(row===this.state.rows-1)?" 0 ":" -15px ")  +" 20px -17px #000";
				// 	console.log(boxShadow)
				// }
				var tileStyle = {
					left: col*this.state.sizeWidth, 
					top: row*this.state.sizeHeight,
					height: this.state.sizeHeight,
					width: this.state.sizeWidth,
					// boxShadow: boxShadow
				}
				return (
					<div
						key={row+","+col+tileColor[this.state.board[row][col]]}
						style={tileStyle} 
						className={"tile "+tileColor[this.state.board[row][col]] }
						data-row={row} 
						data-col={col}>
					</div>
				);
			});
			return <div key={"row-"+row}>{tileRow}</div>
		});
		
		return(
			
			<div className="world container-fluid" style={this.worldStyle()}>
				{ /*
					<button 
						className="btn btn-default logState" 
						onClick={this.showShadow} 
						style={{top: 500, left:0}}>
						Show shadow
					</button>
				<button 
					 className="btn btn-default logState" 
						onClick={this.logState} 
						style={{top: 500, right:0}}>
						Log State
					</button>
					*/}
				
				<div 
					className="level-indicator">
					<b>Level {this.state.level}</b>
				</div>
				<Hero
					boardState={this.state}
					updateHeroLoc = {(x,y)=>this.updateHeroLoc(x,y)}
					updateHeroStats = {(heroStats)=>this.updateHeroStats(heroStats)}
					updateOthersStats = {(othersObj,otherIndex)=>this.updateOthersStats(othersObj,otherIndex)}
					updateOthersObj = {(othersObj)=>this.updateOthersObj(othersObj)}
					setLevel = {(reset)=>this.setLevel(reset)}
					/>
				<Shadow boardState={this.state}/>
				{this.state.others.locs.map((otherGuy, index)=>{
					return (
						<Other 
							key={index + "-" + this.state.others.locs[index].type}
							boardState={this.state} 
							number={index}/>)
				})}
				{tiles}				
				<Stats boardState={this.state} />
			</div>
			
		);
	}
}

class Hero extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x: 0,
			y: 0,
			dt: 5
		}		
		this.changePosition = this.changePosition.bind(this);
		this.arrowPosition = this.arrowPosition.bind(this);
		this.crashTest = this.crashTest.bind(this);
		this.updateOthersObj = this.updateOthersObj.bind(this);
		this.updateHeroLoc = this.updateHeroLoc.bind(this);
	}

	arrowPosition(event) {
		var vx, vy, arrowTest=false, keyCode=event.keyCode;
		if (event.type!=="keydown") {
			keyCode = Number(event.target.dataset.keycode);
		}
		
		// console.log(keyCode)
		switch(keyCode) {
			case 37: // left
				vx = -1; vy = 0;
				arrowTest=true;
				break;
			case 38: // up
				vx = 0; vy = -1;
				arrowTest=true;
				break;      
			case 39: // right
				vx = 1; vy = 0; 
				arrowTest=true;    
				break;    
			case 40: //down
				vx = 0; vy = 1;
				arrowTest=true;
				break;

			default:
				break;
		}
		
		if (arrowTest) {
			let dt = this.state.dt;
			let x = this.state.x + vx*dt;
			let y = this.state.y + vy*dt;
			this.changePosition(x,y);
		}
	}
	
	changePosition(x=false,y=false) {
		const boardState = this.props.boardState;
		const crash = this.crashTest(boardState.others, x, y);
		
		if ( // wall test
			x<0||y<0||
			x>boardState.cols*boardState.sizeWidth-boardState.heroWidth||
			y>boardState.rows*boardState.sizeHeight-boardState.heroHeight) { 
				// do nothing
		} else if (crash[0]) { // bad guy/items/etc test
			// console.log("         ~~ Fight! ~~ ");
			this.objectInteract(crash[1],x,y);
		} else if (!this.interactTest(x,y) ) { // tile test
			this.setState({x:x, y:y});
			this.updateHeroLoc(x,y);
		}
		
		
	}

	crashTest(otherObj, x, y) {
		const boardState = this.props.boardState;
		// otherObj = boardState.villians;
		let result = [false, -1];
		
		const myleft = x;
		const myright = x + (boardState.heroWidth);
		const mytop = y;
		const mybottom = y + (boardState.heroHeight);

		var crash = true;
		for (var i=0; i<otherObj.locs.length; i++) {
			const otherleft = otherObj.locs[i].x;
			const otherright = otherObj.locs[i].x + (otherObj.width);
			const othertop = otherObj.locs[i].y;
			const otherbottom = otherObj.locs[i].y + (otherObj.height);

			// test if hero will overlap with other object
			if ((mybottom < othertop+1) ||
					(mytop > otherbottom-1) ||
					(myright < otherleft+1) ||
					(myleft > otherright-1)) {
				crash = false;
			} else {
				// console.log("  -> crash!");	
				return result = [true, i];
			}			
		}
		
		return result;
	}
	
	interactTest(x, y) {
		// which board tile is hero on?
		const board					= this.props.boardState.board;
		const heroWidth			= this.props.boardState.heroWidth;
		const heroHeight		= this.props.boardState.heroHeight;
		const boardWidth		= this.props.boardState.sizeWidth;
		const boardHeight		= this.props.boardState.sizeHeight;
		
		//get coords to test
		const myleft = (x<0) ? 0: x;
		const myright = x + heroWidth-1;
		const mytop = (y<0) ? 0: y;
		const mybottom = y + heroHeight-1;		
		const coords = [
			{x:myleft, y:mytop}, {x:myright, y:mytop}, {x:myright, y:mybottom}, {x:myleft, y:mybottom}];
		
		// test all tiles
		for (var coord of coords) {
			//tile location
			const tile_x = roundDown(coord.x, boardWidth);
			const tile_y = roundDown(coord.y, boardHeight);
			
			// what type of tile is it?
			const tile_type = board[tile_y/boardHeight][tile_x/boardWidth];
			
			// can hero move there?
			if (tile_type===1) {
				return true; // true === CANNOT move there
			}
			
			
		}
		return false;
	}
	
	updateHeroLoc(x, y) {
		this.props.updateHeroLoc(x,y);
	}	
	
	updateOthersObj(othersObj) {
		this.props.updateOthersObj(othersObj);
	}

	deleteOther(otherIndex) {
		const boardState = this.props.boardState;
		const newOthers = JSON.parse(JSON.stringify(boardState.others));
		newOthers.locs.splice(otherIndex,1);
		newOthers.stats.splice(otherIndex,1);
		this.updateOthersObj(newOthers);
	}
	
	fightOther(otherIndex) {
		// console.log("    Enter the Dojo!");
		this.sounds(3);
		function hitDamage(stats) {
			const damage = Math.round(.1*(0.15*stats.xp + 0.25*stats.class)*stats.weapon.damage);
			return damage;
		}

		const itemStats = objClone(this.props.boardState.others.stats[otherIndex]);
		const heroStats = objClone(this.props.boardState.hero.stats);

		itemStats.hp -= hitDamage(heroStats);
		heroStats.hp -= hitDamage(itemStats);
		// console.log("      badG hp: ", itemStats.hp);
		// console.log("      hero hp: ", heroStats.hp);

		// update badGuy stats
		this.props.updateOthersStats(itemStats, otherIndex);
		this.props.updateHeroStats(heroStats);

		if (heroStats.hp<=0) { // If HERO dies...
			heroStats.life -= 1;
			heroStats.hp = this.props.boardState.hero.stats.xpMin;
			
			// add modal or image to show player restart
			heroStats.alive = false;
			this.sounds(4);
			// console.log("##  PLAYER DIED  ##");
			
			if (heroStats.life<=0) {
				//game over
				// console.log("##  GAME OVER  ##");
				
				// game over modal -> return to start menu

			}
			
			// restart, create new board
			setTimeout(()=>{
				this.props.setLevel("reset");
				heroStats.alive = true;
				this.props.updateHeroStats(heroStats);
			}, 600);

		}
		else if (itemStats.hp<=0) { // If BAD GUY dies...
			itemStats.alive = false;			

			if (this.props.boardState.others.locs[otherIndex].type==="boss") {
				this.sounds(2);
			} else {
				this.sounds(1);
			}
			// console.log("##  BAD GUY DIED  ##");

			// Hero gains xp from fight
			heroStats.xp += Math.round(Math.random()*itemStats.xp+5);

			setTimeout(()=>{
				// go to next level
				if (this.props.boardState.others.locs[otherIndex].type==="boss") {
					this.props.setLevel();
				} else {
					// delete other
					this.deleteOther(otherIndex);
				}
			}, 600);
							
		}
		

		// update badGuy stats
		this.props.updateOthersStats(itemStats, otherIndex);
		this.props.updateHeroStats(heroStats);


	}

	updateHeroStats(otherIndex) {
		const type = this.props.boardState.others.locs[otherIndex].type;
		const itemStats = objClone(this.props.boardState.others.stats[otherIndex]);
		const heroStats = objClone(this.props.boardState.hero.stats);
		
		heroStats.life += (itemStats.life)?itemStats.life:0;		
		heroStats.xp += itemStats.xp;
		heroStats.class += (itemStats.class)?itemStats.class:0;
		if (type === "badGuy" || type === "boss") {
			// dont add hp or weapon
		} 
		else {
			heroStats.hp += itemStats.hp;
			heroStats.weapon.name = (itemStats.weapon.name.length>1)?itemStats.weapon.name:heroStats.weapon.name;
		}
		
		this.props.updateHeroStats(heroStats);
	}
	
	objectInteract(objNumber,x,y) {
		// Decide what to do when meeting another object
		const boardState = this.props.boardState;
		const type = boardState.others.locs[objNumber].type;
		// console.log("this is a ", type);
		if (type==="badGuy" || type==="boss") {
			//fight bad guy			
			this.fightOther(objNumber);
		}
		else if (type==="item" || type==="weapon") {
			// get item power-up
			this.updateHeroStats(objNumber);
			if (type==="item") {
				this.sounds(5);
			} else {
				this.sounds(6);
			}
			// item disappears, hero moves
			this.deleteOther(objNumber);
			this.setState({x:x, y:y});
			this.updateHeroLoc(x,y);
		}
		else if (type==="") {
			// 
			
		} 
		else {
			//do nothing
		}
	}
	
	sounds(index) {
		// console.log("*****  SOUNDS  *****");
		const sounds = [
			sound_backgroundMusic,
			sound_badGuyDied,
			sound_bossDied,
			sound_playerAttack,
			sound_playerDied,
			sound_itemUp,
			sound_weaponUp];
		
		// console.log(sounds[index]);
		const sound = new Audio(sounds[index]);
		// console.log(sound);
		sound.play();
		sound.currentTime = 0;
	}
	
	componentWillMount() {
		
		// set up keyboard listener
		document.addEventListener("keydown", this.arrowPosition);
		
		// set initial state from boardState
		this.setState({
			x: this.props.boardState.hero_x, 
			y: this.props.boardState.hero_y,
			dt: this.props.boardState.hero_dt,
			stats: {
				xp: 100,
				class: 1,
				weapon: "fists"}
		})
	}
	
	render() {
		var x = this.state.x;
		var y = this.state.y;
		var style = {
			top:  y,
			left: x			
		}

		const stats = this.props.boardState.hero.stats;
		
		return(
			<div>
				<div 
					style={style}
					id="hero"
					className={"hero " + (stats.alive?"":"dead")}
					data-row={this.state.y}
					data-col={this.state.x}
					data-name={"("+this.state.x+","+this.state.y+")"}>
				</div>
				<div className="arrowBtns">
					<div className="arrows">
						<button className="btn btn-info btn-arrows" id="upArr" data-keyCode={38} onClick={this.arrowPosition}>
							<img src={img_arrowUp} data-keyCode={38} alt="" />
						</button>
					</div>
					<div className="arrows">
						<button className="btn btn-info btn-arrows" id="leftArr" data-keyCode={37} onClick={this.arrowPosition}>
							<img src={img_arrowLeft} data-keyCode={37} alt="" />
						</button>
						<button className="btn btn-info btn-arrows" id="downArr" data-keyCode={40} onClick={this.arrowPosition}>
							<img src={img_arrowDown} data-keyCode={40} alt="" />
						</button>
						<button className="btn btn-info btn-arrows" id="rightArr" data-keyCode={39} onClick={this.arrowPosition}>
							<img src={img_arrowRight} data-keyCode={39} alt="" />
						</button>
					</div>
				</div>
			</div>
		);
	}
}

class Shadow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render() {
		const boardState = this.props.boardState;
		const shadowDims = boardState.heroHeight*boardState.sizeHeight;
		const x = Math.round(boardState.hero_x-shadowDims/2);
		const y = Math.round(boardState.hero_y-shadowDims/2);
		const blurRadius		= Math.floor(2*shadowDims/5)+"px";
		const spreadRadius	= Math.floor(2*shadowDims/7)+"px";
		const boxStyle = "inset 0 0 " + blurRadius +" "+ spreadRadius + " #000, 0 0 0 " + 99999+"px" + " #000";
		const hideVar = (boardState.showShadow)?"":"none";
		const style = {
			height: shadowDims,
			width: shadowDims,
			boxShadow: boxStyle,
			top:  y,
			left: x,
			display: hideVar
		}
		return(
			<div 
				style={style}
				id="shadow"
				className="shadow">
			</div>
		);
	}
}

class Other extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			left: 0,
			top: 0
		}
		this.otherAutopilot = this.otherAutopilot.bind(this);
	}

	otherAutopilot() {
		//make bad guys move automatically
		const x = 0;
	}

	otherCSS() {
		const number = this.props.number;
		const boardState = this.props.boardState;
		const others = boardState.others;
		const css = {
			left: others.locs[number].x,
			top: others.locs[number].y,
			width: others.width,
			height: others.height
		}

		return css;
	}

	dataProperty(index) {
		const locs =  this.props.boardState.others.locs;
		const stats =  this.props.boardState.others.stats;
		const type = locs[index].type;
		let dataType;

		if (type==="badGuy") {
			dataType = stats[index].hp;
		} else if (type==="boss") {
			dataType = stats[index].hp;
		} else if (type==="item") {
			dataType = "+" + stats[index].hp;
		} else if (type==="weapon") {
			dataType = stats[index].weapon.name;		
		}


		return dataType;
	}
	
	componentWillMount() {
		const others = this.props.boardState.others;
		const number = this.props.number;
		this.setState({
			left: others.locs[number].x,
			top: others.locs[number].y,
		});
	}
	
	render() {
		const style = this.otherCSS();
		const locs =  this.props.boardState.others.locs;
		const stats =  this.props.boardState.others.stats;
		
		return(
			<div 
				style={style}
				className={"other "+locs[this.props.number].type + " " + (stats[this.props.number].alive?"":"dead")}
				// className={"other "+locs[this.props.number].type}
				data-property={this.dataProperty(this.props.number)}/>
		);
	}
}

class Stats extends React.Component {
	constructor(props) {
		super(props);
	
	}	
	
	render() {
		const stats = this.props.boardState.hero.stats;
		return(
			<div className="stats-container">
				<div className="life">
					<img className="img" src={img_hero}/>
					<div className="hearts "><span className="heart">&#9829;</span> &times; {stats.life}</div>
				</div>
				<div className="name" title={stats.name} >
					<div className="stats-title">Name:</div> {limitText(stats.name)}
				</div>
				<div className="hp">
					<div className="stats-title">Health:</div> {stats.hp}
				</div>
				<div className="xp">
					<div className="stats-title">XP:</div> {stats.xp}
				</div>
				<div className="weapons" title={stats.weapon.name} >
					<div className="stats-title">Weapon:</div> {limitText(stats.weapon.name)}
				</div>
				<div className="class">
					<div className="stats-title">Class:</div> {stats.class}
				</div>
			</div>
		);
	}
}

class Camera extends React.Component {
	constructor(props) {
		super(props);
	
	}	
	
	render() {
		const displayVar = (this.props.homeState.showMenu)?"none":"";
		const css = {
			display: displayVar
		}
		return(
			<div className="row text-center">
				<div className="col-xs-12 camera" style={css}>
					{this.props.children}
				</div>
			</div>
		);
	}
}



// ReactDOM.render(<Home />, document.getElementById("app"));

export default App;
