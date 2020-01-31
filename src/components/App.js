import React, { Component } from 'react';
import { any } from 'prop-types';
import './App.css';
import {conditions, mechanics, spells, relics, equips, champs} from './Runes/Api files/main.js';

function updateState(valueOfList){
	this.setState({valueOfList})
}

class App extends Component {

	updateChild(valueOfList){
		updateState(valueOfList)
	}

	render() {
		return (
		<div className="App">
			<header className="App-header">
			<h1 className="App-title">PoxRaze</h1>
			</header>    

			<div id='placement'>
				<ControlButtons />
			
				<Runes/>
			</div>
			
		
		</div>
		);
	}
}

class ControlButtons extends Component{
    render(){
        return(
            <div className="controlButtons">
                {/*<button  onClick={() => updateState('listOfAbilities')} id="Abilities">Abilities</button>*/}
                {/* <button   onClick={() => updateState('listValue')} id="Previous">Previous</button> */}
                <button   onClick={() => updateState('listOfChampions')} id="Champions">Champions</button>
                <button   onClick={() => updateState('listOfSpells')} id="Spells">Spells</button>
                <button   onClick={() => updateState('listOfRelics')} id="Relics">Relics</button>
                <button   onClick={() => updateState('listOfEquips')} id="Equips">Equips</button>
                <button   onClick={() => updateState('listOfConditions')} id="conditions">Conditions</button>
                <button   onClick={() => updateState('listOfMechanics')} id="Mechanics">Mechanics</button>
            </div>
        )
    } 
}
class Runes extends Component {
    constructor(props) {
        super(props);
        this.displayRunes = this.displayRunes.bind(this);
        this.displayNumber = React.createRef();
        
        // initialize the lists that will be holding all of the  sites data
        this.state = {
            listOfChampions: [],
            //listOfAbilities: [],
            listOfSpells: [],
            listOfEquips: [],
            listOfRelics: [],
            listOfConditions: [],
            listOfMechanics: [],
            //Determine what the current clicked list is
            //i.e if Relics button is clicked valueOfList: listOfRelics; and will display the list of relics
            valueOfList: undefined
        };
        updateState = updateState.bind(this)
    }

    componentDidMount(){
        // set all of the data imported from the APIs to their respective lists
        this.setState({
            listOfConditions: conditions,
            listOfChampions: champs,
            //listOfAbilities: abilities,
            listOfSpells: spells,
            listOfEquips: equips,
            listOfRelics: relics,
            listOfMechanics: mechanics,
        })

    }
    

    //for each item in a rune generate an li with a gridArea and style name for each property of a rune
    //and populate that rune with the items contents
    //i.e: the name property of a rune will have a gridArea of name, a class of name, and the name of the rune
    //e.g the flavorText property for "altar of bones" will have gridArea: flavorText, class="flavorText, and flavorText: "We give this offering..." "
    makeRunes(eachRune, listKeys){
        let gridArea = '', hash = [], handleHtml = [], handleArrays = [];

        return listKeys.map((item) => {
            //Assign a grid area to each item for css grid formatting
            gridArea = {gridArea: item};
            
            if(item === "abilitySets" || item === "startingAbilities"){
                return ''
            }
            if(Array.isArray(eachRune[item])){   
                return <li key={item} className={item} style={gridArea}>
                    {item}: <span>{eachRune[item].map(value => {return " " + value})}</span>
                </li>; 
            }
            // generate the IMG for runes based on its hash value from the API, you can determine the size from "/images/runes/ (whatever size you want) /"
            // sizes include: lg, med, sm (not all runes have a sm size), hash also determines the sprite of the rune
            if(item === "hash"){
                hash = <li key={item} className={item} style={gridArea}>
                            <div className="img-full">
                                <img className="image" src={"https://d2aao99y1mip6n.cloudfront.net/images/runes/lg/" + eachRune[item] + ".jpg"} alt="Runes" />
                            </div>
                        </li>;
                return hash
            }
            // convert the Html code in certain sections of runes into readable text
            // TODO link this html code to its respective ability/condition/mechanic
            // TODO allow the user to tell when a word is a "keyword" wrapped in html
            if(item === "description" || item === 'tradeable' || item === 'allowRanked' || item === 'forSale'){
                handleHtml = <li key={item} className={item} style={gridArea}>
                            {item}: <a dangerouslySetInnerHTML={{ __html: eachRune[item]}}></a>
                        </li>;
                return handleHtml
            }
            // generate abilities  of champions, relics, and spells
            // currently disabled for optimization and usefulness changes
            else if(item === 1 || item === 0){
                return <li key={item} className={item} style={gridArea}>
                            <a dangerouslySetInnerHTML={{ __html: eachRune[item]}}></a>
                        </li>;
            }else{
                // generate the rest of the items in the rune
                return <li key={item} className={item} style={gridArea}>
                            {item}: <span>{eachRune[item]}</span>
                        </li>;
            }
        })
    }

    // generate divs that contain all runes from the specified list
    displayRunes(listOf){
        let listOfRunes = [], eachRune = [], runeBox = [];
        const displayNumber = this.displayNumber.current;

        if(listOf === undefined || listOf === any || listOf === null){
            return ''
        }else {
            let theList = this.state[listOf];
            //map the keys of the first item to this.keysOfTheList to give each rune within the list that lists unique headers
            //i.e: the equips list has 14 keys in the first item (Name, NoraCost, etc...) so ALL items in the equips list
            //will have no more than 14 keys, this is different per list e.g: Relics has 17, and conditions has 3
            this.keysOfTheList = Object.keys(theList[0]);
            
            // for each rune in the given list map them to the eachRune variable
            // return this.state[listOf].map((eachRune) => {
            
            // for each rune within a certain range and not over the given lists length populate a runeBox
             for (let index = 0; index < displayNumber.value && index < theList.length; index++) {
                eachRune = theList[index];
                runeBox = (
                    // create a div for each rune
                    <div className={`RuneBox ${listOf}`}>{
                        this.makeRunes(eachRune, this.keysOfTheList)
                    }
                    </div>
                )        
                listOfRunes.push(runeBox);
            }
            return listOfRunes;
        }
    }

    render(){
        return <div ref='placement' id="runesPlacement">
            
            <input ref={this.displayNumber} type="number" id="Next" defaultValue="10" min="1" max="1500"></input>

            {this.displayRunes(this.state.valueOfList)}
        </div>
    }
}

export default App;
