import React, { Component} from 'react';
import { any } from 'prop-types';
import {conditions, mechanics, spells, relics, equips, champs, abilities} from './Api files/main.js';

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
            listOfAbilities: [],
            listOfSpells: [],
            listOfEquips: [],
            listOfRelics: [],
            listOfConditions: [],
            listOfMechanics: [],

            //Determine what the current clicked list is
            //i.e if Relics button is clicked valueOfList: listOfRelics; and will display the list of relics
            valueOfList: undefined,
        };
    }
    
    componentDidMount(){
        // set all of the data imported from the APIs to their respective lists
        this.setState({
            listOfConditions: conditions,
            listOfChampions: champs,
            listOfAbilities: abilities,
            listOfSpells: spells,
            listOfEquips: equips,
            listOfRelics: relics,
            listOfMechanics: mechanics,
        })

    }

    // generate divs that contain all runes from the specified list
    makeRunes(listOf){
        var gridArea = '';

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
                        //e.g altar of bones flavor text will have gridarea: flavorText and class="flavorText"
                        
                            this.properties.map(function(item) {
                                gridArea = {gridArea: item};
                                if(item === "hash"){
                                    return <li key={item} className={item} style={gridArea}>
                                                <img className="img-full" src={"https://d2aao99y1mip6n.cloudfront.net/images/runes/med/" + eachRune[item] + ".jpg"} />
                                            </li>;
                                }if(item === "description"){
                                    return <li key={item} className={item} style={gridArea}>
                                                {/*convert the first letter of the item to capital: then return the value of the item*/}
                                                {item.charAt(0).toUpperCase() + item.slice(1)}: <p dangerouslySetInnerHTML={{ __html: eachRune[item]}}></p>
                                            </li>;
                                }else{
                                    return <li key={item} className={item} style={gridArea}>
                                                {/*convert the first letter of the item to capital: then return the value of the item*/}
                                                {item.charAt(0).toUpperCase() + item.slice(1)}: {eachRune[item]}
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
        return(
            <div>
                {/*<button  onClick={() => this.setState({valueOfList: 'listOfAbilities'})} id="Abilities">Abilities</button>*/}
                {/*<button  onClick={() => this.setState({valueOfList: 'listOfChampions'})} id="Champions">Champions</button>*/} 
                <button  onClick={() => this.setState({valueOfList: 'listOfSpells'})} id="Spells">Spells</button>
                <button  onClick={() => this.setState({valueOfList: 'listOfRelics'})} id="Relics">Relics</button>
                <button  onClick={() => this.setState({valueOfList: 'listOfEquips'})} id="Equips">Equips</button>
                <button  onClick={() => this.setState({valueOfList: 'listOfConditions'})} id="conditions">Conditions</button>
                <button  onClick={() => this.setState({valueOfList: 'listOfMechanics'})} id="Mechanics">Mechanics</button>

                <div ref='placement'>{this.makeRunes(this.state.valueOfList)}</div>
            </div>
        )
    } 
}

export default Runes;
