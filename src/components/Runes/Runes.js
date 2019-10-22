import React, { Component} from 'react';
import { any } from 'prop-types';
import {conditions, mechanics, spells, relics, equips, champs} from './Api files/main.js';

// TODO implement champs ad abilities.
// TODO display conditions and mechanics on hover
// TODO style and format the site
// TODO optimize 

class Runes extends Component {
    constructor(props) {
        super(props);
        this.makeRunes = this.makeRunes.bind(this);
        
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

    // generate divs that contain all runes from the specified list
    makeRunes(listOf){
        let gridArea = '';
        let faction = 0 ;
        if(listOf === undefined || listOf === any || listOf === null){
            return ''
        }else {
            // for each rune in the given list map them to the eachRune variable
            // listOf[eachRune] is the same as listOf[i]
            return this.state[listOf].map((eachRune) => {
                return (
                    //map the keys of the first rune to this.properties to give each list unique headers
                    this.properties = Object.keys(this.state[listOf][0]),

                    // create a div for each rune
                    <div className={`RuneBox ${listOf}`}>{
                        //for each item generate an li with a gridarea and style name for each property of a rune
                        //i.e: the name property will have a gridarea for name and a class of name
                        //e.g the flavorText for altar of bones will have gridarea: flavorText and class="flavorText"
                        
                            this.properties.map(function(item) {
                                gridArea = {gridArea: item};
                                // for listOfAbilities Because the abilities API has them stored as numbers inside an object 
                                // since only 0 and 1 are the only relevant  items break the loop once you get past 1
                                if(item > 1){
                                    return ''
                                }
                                // generate the IMG for runes based on its hash value from the API, you can determine the size from "/images/runes/ (whatever size you want) /"
                                // hash also determines the sprite of the rune
                                if(item === "hash"){
                                    return <li key={item} className={item} style={gridArea}>
                                                <div className="img-full">
                                                    <img className="image" src={"https://d2aao99y1mip6n.cloudfront.net/images/runes/lg/" + eachRune[item] + ".jpg"} alt="Runes Image" />
                                                </div>
                                            </li>;
                                }
                                // convert the Html code in the description section of runes into neat readable text
                                // TODO link this html code to its respective ability/condition/mechanic
                                // TODO allow the user to tell when a word is a "keyword" wrapped in html
                                if(item === "description" || item === 'tradeable' || item === 'allowRanked' || item === 'forSale'){
                                    return <li key={item} className={item} style={gridArea}>
                                                {/*convert the first letter of the item to capital: then return the value of the item*/}
                                                {item.charAt(0).toUpperCase() + item.slice(1)}: <a dangerouslySetInnerHTML={{ __html: eachRune[item]}}></a>
                                            </li>;
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
                                                {/*convert the first letter of the item to capital: then return the value of the item*/}
                                                {item.charAt(0).toUpperCase() + item.slice(1)}: <span>{eachRune[item]}</span>
                                            </li>;
                                }
                            })
                        }
                    </div>
                )
            })
        }
    }

    render(){
        return <div id="runesPlacement">{ this.makeRunes(this.state.valueOfList)}</div>
    }
    
}

export default Runes;
