import React, { Component } from 'react';
import { any } from 'prop-types';
import {conditions, abilities, relics, champions} from './Pox.js';

class Runes extends Component {
    constructor(props) {
        super(props);
        this.makeRunes = this.makeRunes.bind(this);
        this.state = {
            listOfChampions: [],
            listOfAbilities: [],
            listOfSpells: [],
            listOfEquips: [],
            listOfRelics: [],
            listOfConditions: [],
            listOfMechanics: [],
            valueOfList: undefined,
        };
    }
    
    componentWillMount(){
        // poxnora api
        const url = 'https://www.poxnora.com/api/feed.do?t=json';
        const conditions = "https://www.poxnora.com/api/feed.do?t=json&r=conditions";

        // retrieve 
        this.setState({
            listOfChampions: champions,
            listOfAbilities: abilities,
        })

        //fetch the api url
        fetch(url)
            // then return the response in json
            .then((response) => {
                return response.json();
            })

            // then load all of the data into lists
            .then((data) => {
                this.setState({
                    listOfSpells: data.spells,
                    listOfEquips: data.equips,
                    listOfRelics: data.relics,
                })
            })
            .catch((error) => console.log(error));
            
        fetch(conditions)
            // then return the response in json
            .then((response) => {
                return response.json();
            })

            // then load all of the data into lists
            .then((data) => {
                this.setState({
                    listOfConditions: data.conditions,
                })
            })
            .catch((error) => console.log(error));

        /* fetch(conditions)
            // then return the response in json
            .then((response) => {
                return response.json();
            })

            // then load all of the data into lists
            .then((data) => {
                this.setState({
                    listOfConditions: data.conditions,
                })
            })
            
            fetch(mechanics)
       // then return the response in json
       .then((response) => {
           return response.json();
       })

       // then load all of the data into lists
       .then((data) => {
           this.setState({
               listOfMechanics: data.mechanics,
           })
       })
        */
       
    }

    // generate divs that contain all runes from the given list
    makeRunes(listOf){
        var gridArea = '';
        var strong = document.createElement("strong");

        if(listOf === undefined || listOf === any || listOf === null){
            return ''
        }else {
            // for each rune in the given list
            return this.state[listOf].map((eachRune) => {
                return (
                //map the keys of the first rune to this.properties to give each list unique headers
                    this.properties = Object.keys(this.state[listOf][0]),
                // create a div for each rune
                    <div className={`RuneBox ${listOf}`}>{
                        //for each item generate a li with a gridarea and style name
                            this.properties.map(function(item) {
                                gridArea = {gridArea: item};
                                if(item === 'description'){
                                    var condition = eachRune[item].replace(/condition/g, strong)
                                    return <li key={item} className={item} style={gridArea}>
                                        {item.charAt(0).toUpperCase() + item.slice(1)}: {condition}
                                        </li>
                                }else{
                                    return <li key={item} className={item} style={gridArea}>
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
            <div id="runes">
                {/*<button  onClick={() => this.setState({valueOfList: 'listOfAbilities'})} id="Abilities">Abilities</button> */}
                <button  onClick={() => this.setState({valueOfList: 'listOfConditions'})} id="Conditions">Conditions</button>
                {/* <button  onClick={() => this.setState({valueOfList: 'listOfChampions'})} id="Champions">Champions</button> */} 
                <button  onClick={() => this.setState({valueOfList: 'listOfSpells'})} id="Spells">Spells</button>
                <button  onClick={() => this.setState({valueOfList: 'listOfRelics'})} id="Relics">Relics</button>
                <button  onClick={() => this.setState({valueOfList: 'listOfEquips'})} id="Equips">Equips</button> 

                <div ref='placement'>{this.makeRunes(this.state.valueOfList)}</div>
            </div>
        )
    } 
}

export default Runes;
