import React, { Component } from 'react';

class ControlButtons extends Component{
    render(){
        return(
            <div class="controlButtons">
                {/*<button  onClick={() => this.setState({valueOfList: 'listOfAbilities'})} id="Abilities">Abilities</button>*/}
                {/*<button  onClick={() => this.setState({valueOfList: 'listOfChampions'})} id="Champions">Champions</button>*/} 
                <button   onClick={() => this.setState({valueOfList: 'listOfSpells'},)} id="Spells">Spells</button>
                <button   onClick={() => this.setState({valueOfList: 'listOfRelics'},)} id="Relics">Relics</button>
                <button   onClick={() => this.setState({valueOfList: 'listOfEquips'},)} id="Equips">Equips</button>
                <button   onClick={() => this.setState({valueOfList: 'listOfConditions'},)} id="conditions">Conditions</button>
                <button   onClick={() => this.setState({valueOfList: 'listOfMechanics'},)} id="Mechanics">Mechanics</button>
            </div>
        )
    } 
}

export default ControlButtons;