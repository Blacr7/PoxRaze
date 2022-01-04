import React, { Component } from 'react';
import update from 'react-addons-update';
import { any } from 'prop-types';
import FlatList from 'flatlist-react';
import './App.css';
import {conditions, mechanics, spells, relics, equips, champs, abilities} from './Runes/Api files/main.js';
//import {COMMON, UNCOMMON, RARE, EXOTIC, LEGENDARY, LIMITED, rune_stats} from './Runes/Images'

function updateState(valueOfList){
	this.setState({valueOfList})
}

const convertAbilityTags = (string, list) => {
    //convert ability, condition, and mechanic markup into searchable text,
    //then rune that text through the Ability class to find the relevant abilities

    let id = 0, reg = new RegExp(/(<.*?>*<.*?>)/), splitString = string.split(reg), lookFor = 'value';
    
    return(<span className="markupText">
        {
            splitString.reduce((prev, current, i) => {
                if(!i){
                    return [current];
				}
                //id is the value found between e= and > 
                id = current.split(/e=(.*?)>/)[1];
                return prev.concat(current.includes(lookFor) ? (
                    <Ability 
                        key={`${id}  ${i}`} 
                        value={id.match(/\d+/g) === null ? id : Number(id)} 
                        dataList={list}
                        failedToFind={splitString.filter(value => value.includes(id))}
                    />
                    ) : current);
            }, [])
        }
	</span>)
}

const findAbilityIcon = (data, size) => {
    if(data.icon_name !== '' && data.icon_name !== undefined && data.icon_name !== null){
        return <img 
            className='abilityIcon' 
            src={`https://d2aao99y1mip6n.cloudfront.net/images/ability_icons/${size}/icon_${data.icon_name}.gif`} 
            onError={(q)=>{q.target.onerror = null; q.target.src = `https://d2aao99y1mip6n.cloudfront.net/images/ability_icons/small/icon_${data.icon_name}.gif`}} 
            alt={`${data.icon_name} icon`}
        /> 
    }else{
        return ''
    }
    
}

const HoverAbility = (data, dataList) => {
    //create a hover box for the abilities in the game, working on creating something similar for conditions and mechanics, as well as making this recursive for abilities within abilities
    let name = data.level !== undefined && data.level > 0 ? 
        <b className='name' >{data.name} ({data.level})</b> 
        : 
        <b className='name' >{data.name}</b>;

    let description = (data) => {
        // some abilities infinitely reference each other so they need their own special interactions
        if(data.ability_id === 2075){
            return <span className='description'>
                "When this champion is within 5 spaces of a friendly champion with <b className='name'>Soul of Ailur</b>
                <div className="abilityHover">
                    <b className='name'>Soul of Ailur</b>
                    <span className="noraCost">Nora Cost: 3</span>
                    <span className="description">When this champion is within 5 spaces of a friendly champion with <b className='name'>Pride of Ailur</b> , it gains +2 DEF. This effect does not stack.</span>
                </div>, it gains +4 DMG. This does not stack."
            </span>
        }if(data.ability_id === 2299){
            return <span className='description'>
                "When this champion is within 5 spaces of a friendly champion with <b className='name'>Pride of Ailur</b>
                <div className="abilityHover">
                    <b className='name'>Pride of Ailur</b>
                    <span className="noraCost">Nora Cost: 5</span>
                    <span className="description">When this champion is within 5 spaces of a friendly champion with <b className='name'>Soul of Ailur</b> , it gains +4 DMG. This effect does not stack.</span>
                </div>, it gains +2 DEF. This does not stack."
            </span> 
            
        }if(data.ability_id === 4){
            return <span className="description">This Champion cannot be <b>Charmed</b>, <b>Possessed</b> or <b>Distracted</b></span>
        }if(data.ability_id === 679){
            return <span className="description">
                "This Unit Has -3 DMG, -1 SPD Unless It Is Within Range Of A Unit With <b className='name'>Overseer: Moga</b>
                <div className="abilityHover">
                    <b className='name'>Overseer: Moga</b>
                    <span className="noraCost">Nora Cost: 1</span>
                    <span className="description">"Friendly Units Within 4 Spaces Are Not Penalized By <b className='name'>G'hernbound</b>."</span>
                </div>

            </span>
        }if(data.ability_id === 1364){
            return <span className="description">
                "Target champion within 3 spaces that has the <b className='name'>Unleash</b>
                <div className="abilityHover">
                    <b className='name'>Unleash</b>
                    <span className="noraCost">Nora Cost: 4</span>
                    <span className="description">"Friendly champions within 3 spaces gain <b className='name'>Fuel Rage</b>."</span>
                </div>ability gains 1 AP and +1 DMG for 1 turn."

            </span>
        }if(data.ability_id === 2465){
            return <span className="description">
                "When this unit is deployed from the runedock, the closest opposing champion becomes
                <div className="abilityHover">
                    <b className='name'>Tagged</b>
                    <span className="description">"Enemies within 5 spaces gain <b className='name'>Beset</b>
                        <div className="abilityHover">
                            <b className='name'>Beset</b>
                            <span>"This champion relocates to adjacent to target enemy champion with the <b className='name'>Tagged</b> condition."</span>
                        </div>
                    </span>
                </div>
                and permanently gains <b className='name'>Hunted</b>
                <div className="abilityHover">
                    <b className='name'>Hunted</b>
                    <span className="description">""This champion receives 4 more damage from champions with <b className='name'>Declare Hunted</b>."</span>
                </div>
            </span>
        }if(data.ability_id === 2304){
            return <span className="description">
                "At the start of turn and end of each turn, if there are no friendly champions with <b className='name'>Spirit Projection</b>
                <div className="abilityHover">
                    <b className='name'>Spirit Projection</b>
                    <span className="description">
                        "When this champion is deployed and at the start of its turns, if there is no Manifestation of this unit in play, a 
                        <b className='name'>Manifestation</b> of this unit without upgrades is summoned within 3 spaces of this champion. This ability triggers only if the champion is a Garu Medium or Spirit of the Mountain."
                    </span>
                </div>
                 within 5 spaces this unit, it is destroyed."
            </span>
        }else{ // if a ability does not need special interactions pass the 
            return <span className='description' > 
                {
                    data.description === undefined 
                    ? 
                    convertAbilityTags(data.short_description, dataList) 
                    : 
                    convertAbilityTags(data.description, dataList)
                }
            </span>
        } 
    }

	return <span key={data.asset_id ? data.asset_id : data.key} className="markupAbility">
        {findAbilityIcon(data, 'small')}
		{name}
		
		<div className='abilityHover'>
			<div className='nameHidden'>{name}</div>
            {data.cooldown !== undefined ? 
                [
                    <span key={'cooldown' + data.cooldown} className='cooldown' >{data.cooldown !== 0 ? 'Cooldown: ' + data.cooldown : ''}</span>, 
                    <span key={'apCost' + data.ap_cost} className='apCost' >{data.ap_cost !== 0 ? 'AP cost: ' + data.ap_cost : ' '}</span>,
                    <span key={'noraCost' + data.cost} className='noraCost'>Nora cost: {data.cost}</span>
                ] : ''
            }
            
            {description(data)}
		</div>
	</span>
}
class App extends Component {
    constructor(props){
        super(props);

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
            valueOfList: undefined
        };

        updateState = updateState.bind(this)
        
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
    
	render() {
        // store the data of the clicked list in populatedData
        let populatedData = this.state[this.state.valueOfList];

		return (
		<div className="App">
			<header className="App-header">
                <h1 className="App-title">PoxRaze</h1>
                <span>A PoxNora Database</span>
			</header>    

			<div id='placement'>
                {/* the various buttons that will prompt what list of runes to search through */}
				<ControlButtons />

                {/* the displayed information will be organized into lists of runes that share similarities. */}
                {/* currently lists can only be organized by "Name" of rune and the value of the list*/}
                <RunesList displayListName={this.state.valueOfList} displayData={populatedData || []} abilities={[this.state.listOfAbilities, this.state.listOfMechanics, this.state.listOfConditions]}></RunesList>
            </div>

            <div className='appFooter'> 
                <span>© Art and data related to PoxNora are property of <a href="http://www.desertowlgames.com/" target="blank">Desert Owl Games</a> </span>
                <span><a href="https://blacr7.github.io/Portfolio/" target="blank">© Robert Black JR, 2018 </a></span>
            </div>
		</div>
		);
	}
}

class ControlButtons extends Component{
    render(){
        return(
            <div className="controlButtons">
                
                <button   onClick={() => updateState('listOfSpells')} id="Spells">Spells</button>
                <button   onClick={() => updateState('listOfRelics')} id="Relics">Relics</button>
                <button   onClick={() => updateState('listOfEquips')} id="Equips">Equips</button>
               	<button   onClick={() => updateState('listOfAbilities')} id="Abilities">Abilities</button>
			    <button   onClick={() => updateState('listOfChampions')} id="Champions">Champions</button>
                <button   onClick={() => updateState('listOfConditions')} id="conditions">Conditions</button>
                <button   onClick={() => updateState('listOfMechanics')} id="Mechanics">Mechanics</button>
            </div>
        )
    } 
}
class Rune extends Component{
    constructor(props) {
        super(props);

        if(props.eachRune.abilitySets){
            this.abilitySets = this.props.eachRune.abilitySets.map(value => value.abilities.map(rune => rune));
            this.findDefault = this.abilitySets.map(value => value.find(innerValue => innerValue.default));

            this.state = {
                active: [Array.of(false,false,false), Array.of(false,false,false)],
                noraCost: props.eachRune.noraCost,
                updatedNoraCost: props.eachRune.noraCost -this.findDefault[0].noraCost - this.findDefault[1].noraCost,
                selectedAbilities: [this.findDefault[0].noraCost, this.findDefault[1].noraCost],
            };
    
            this.upgradeAbilities = this.upgradeAbilities.bind(this);
        }else{
            this.state ={
                noraCost: props.eachRune.noraCost,
            }
        }
    }

    upgradeAbilities(e) {
        let value =  e.target.value;
        let findAbility = this.abilitySets[value[0]].find(innerValue => innerValue.id === +value.slice(4));

        this.state.active[value[0]].fill(false);
        this.setState(update(this.state, {
            active: {
                [value[0]]: {
                    [value[2]]: {
                        $set: true,
                    }
                } 
            },
            
            selectedAbilities: {
                [value[0]]:{
                    $set: findAbility.noraCost
                }
            },
            
        }), () =>{
            this.setState({ noraCost: (this.state.updatedNoraCost) + this.state.selectedAbilities[0] + this.state.selectedAbilities[1]})
        })
    }

    buildRunes(){
        const {eachRune, listKeys, index, display, toggleRunes, abilities, sortBy} = this.props;
        const { noraCost } = this.state;
        const nameLevel = (
            eachRune.level !== undefined && eachRune.level > 0 //determine if the current rune has a assigned level 
            ? 
            <b className='name' >{eachRune.name} ({eachRune.level})</b>  // if yes attach the level to the name E.g acid bomb with level 2 = acid bomb (2)
            : 
            <b className='name' >{eachRune.name}</b> // if no leave the name as is
        )

        const expandedResult = (displayToggle) =>{ // expand the current rune and display more of its information   
            let abilityList = [], abilitySets = [], key = 0, collapsedRune = '';
    
            const StartingAbilities = (item) => {// StartingAbilities is a list of all the abilities a champion has base
                abilityList = eachRune[item];
                return  <div key={key++} className={item} style={{gridArea: item}}>
                            Base Abilities:
    
                            {abilityList.map(value => (
                                <Ability key={value.id} value={value.id} dataList={abilities}></Ability>
                            ))}
    
                        </div>
            }

            const AbilitySets = (item) => {// AbilitySets are a list of ability options a rune can select from
                // a rune can only pick one ability from each set, the noraCost of that ability is reflected in the overall cost of the rune
                // default abilities in  an abilitySet are the abilities a rune starts with and their noraCost is already calculated in  the runes starting noraCost
                abilitySets = eachRune.abilitySets.map(innerValue => {return innerValue.abilities.map(thirdInnerValue =>{ return thirdInnerValue })});
                
                return <div key={key++} className={item} style={{gridArea: item}}>
                        {
                            abilitySets.map(
                                (value, index) => {
                                return <div key={key++}>Ability Upgrade {index+1}: {value.map((innerValue, innerIndex) => {
                                        return <span key={key++}>
                                                <input 
                                                type="radio" 
                                                id={`${eachRune.name}AbilitySet${index}Ability${innerIndex}`}
                                                name={`${eachRune.name}AbilitySet${index}`}
                                                value={`${index} ${innerIndex} ${innerValue.id}`}
                                                defaultChecked={innerValue.default ? 'checked' : ''}
                                                onChange={this.upgradeAbilities}
                                                />

                                                <label 
                                                htmlFor={`${eachRune.name}AbilitySet${index}Ability${innerIndex}`}
                                                defaultChecked={innerValue.default ? 'checked' : ''}
                                                >
                                                    <Ability key={innerValue.id} value={innerValue.id} dataList={abilities}/>
                                                </label>
                                            </span>
                                    })}
                                </div>}
                            )
                        }
                    </div>
            }
            
            const NoraCost = (item) => {
                return <li key={key++} className={item} style={{gridArea: item}} onClick={sortBy} >
                       {item}: <span className={item}>{noraCost}</span>
                </li> 
            }

            const Name = (item) =>{
                return eachRune.hash === undefined // if the current rune doesn't have a picture
                ? //move the expand functionality to the name
                <li key={key++} className={`${item} clickable`} style={{gridArea: item}} onClick={() => {displayToggle(index)}}> 
                    {item}: <span>{nameLevel}</span> 
                </li>
                :
                <li key={key++} className={item} style={{gridArea: item}} onClick={sortBy}>
                    {item}: <span>{nameLevel}</span>
                </li>
            }
    
            const TrueToYes = (item) => { // convert the true or false items in a rune to something more readable 
                return <li key={key++} className={item} style={{gridArea: item}}>
                            {item}: <span>{eachRune[item] ? 'Yes' : 'No'}</span>
                        </li>;
            }
    
            const Description = (item) => { // run the description of a rune into the convertAbilityTags function to search for ability tags and convert them to their respective abilities
                return <li key={key++} className={item} style={{gridArea: item}}>
                            Description: <span>{convertAbilityTags(eachRune[item], abilities)}</span>
                        </li>
            }
    
            const IsAnArray = (item) => { // turn arrays in the rune into something more readable
                return  <div key={key++} className={item} style={{gridArea: item}}>
                            {item}: <ul>{eachRune[item].map((value, key) => {return <li key={key}>{" " + value}</li> })}</ul>
                        </div>; 
            }
    
            const IconName = (item) => { // run the icons found in a rune through the FindAbilityIcon function to convert them to their respective icon image
                return <li key={key++} className={item} style={{gridArea: item}}>
                            <span className="largeIcon">{findAbilityIcon(eachRune, 'large')}</span>
                        </li>;
            }
    
            const Rarity = (item) => { // determine the rarity of the current rune
                // currently deprecated in favor of the frameRarity
                return <li key={key++} className={item} style={{gridArea: item}}>
                            {item}: <span className={eachRune[item]}>{eachRune[item]}</span>
                        </li>;
            }

            const BuildImageFrame = (item) => {// generate the IMG for runes based on its hash value from the API, you can determine the size from ".../images/runes/(whatever size you want)/..."
                // sizes for the hash include: lg, med, sm (not all runes have a sm size), hash also determines the sprite of the rune
                // sprites can be found at https://d2aao99y1mip6n.cloudfront.net/images/runes/idols/(hash).gif
                // sprites only have one size and are currently not being generated for optimization reasons 
                return 	<li key={key++} className={item} style={{gridArea: item}}>
                        <div className="img-full clickable"  onClick={() => {displayToggle(index)}}>
                            <img className="image rune" loading="lazy" src={"https://d2aao99y1mip6n.cloudfront.net/images/runes/lg/" + eachRune[item] + ".jpg"} alt="Runes" />
                            <img className="image frame" loading='lazy' src='https://d2aao99y1mip6n.cloudfront.net/_themes/global/frames/large/front/1.gif' alt='Rune Frame' />
                            <img className="image frameRarity" loading='lazy' src={`Images/${eachRune['rarity']}.gif`} alt='Rarity Frame'/>
                        </div>
                    </li>;
            }
    
            const RestOf = (item) => { // generate the rest of the items in the rune that don't require special code
                return <li key={key++} className={item} style={{gridArea: item}} onClick={sortBy}>
                            {item}: <span className={item}>{eachRune[item]}</span>
                        </li>;
            }
    
            return <div key={eachRune.name} className='expandedRune' id={eachRune.name}>{ listKeys.map((item) => {
                    if(item === "abilitySets"){return AbilitySets(item);}
                    if(item === "startingAbilities"){ return  StartingAbilities(item);}
                    if(Array.isArray(eachRune[item])){return IsAnArray(item);}
                    if(item === 'noraCost'){return NoraCost(item)}
                    if(item === 'hash'){return BuildImageFrame(item)}
                    if(item === 'tradeable' || item === 'allowRanked' || item === 'forSale'){ return	TrueToYes(item);}
                    if(item === "description" || item === "long_description"){ return Description(item);}
                    if(item === "name"){collapsedRune = Name(item); return collapsedRune}
                    if(item === 'rarity'){ return Rarity(item);}
                    if(item === 'icon_name'){ return IconName(item)}
                    else{ return RestOf(item)}
                    })
                }
            </div>
        }

        const CollapsedRune = (!display ?
            <div key={eachRune.name} className='collapsedRune clickable' onClick={() => {toggleRunes(index)}}>
                <div className='name' style={{gridArea: 'name'}}>Name: <span>{nameLevel}</span></div>
                {eachRune.noraCost? 
                    <div className='noraCost' style={{gridArea: 'noraCost'}}>Nora Cost: <span>{eachRune.noraCost}</span></div>
                    :
                    ''
                }
            </div>
            :
            expandedResult(toggleRunes)
        ) 
        
        return CollapsedRune
    }
    //for each item in a rune generate an li with a gridArea and style name for each property of a rune
    //and populate that rune with the items contents
    //i.e: the name property of a rune will have a gridArea of name, a class of name, and the name value of the rune
    //e.g the flavorText property for the "altar of bones" rune will have gridArea: flavorText, class="flavorText", and flavorText: "We give this offering..." "

    render(){
        try {
            return this.buildRunes()
        }
        catch (error) {
            console.error(error);
            return <div className="RunesErrorMessage"><h3>item not Found</h3></div>
        }
    }
}

class Runes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: Array(props.displayData).fill(false),
            currentPage: 1,
            sortBy: 'name',
            toggled: false
        };
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id),
        });
    }

    sortBy(event){
        this.setState({
            sortBy: event.target.className ? event.target.className : 'name',
            toggled: !this.state.toggled
        })
    }

    toggleRunes = (index) =>{
        const displayStatus = [...this.state.display];
        displayStatus[index] = !this.state.display[index];
        this.setState({display: displayStatus});
    }

    render(){
        const {currentPage, display, sortBy, toggled} = this.state;
        const {displayData, displayListName, abilities, displayNumber} = this.props;
        let theDisplayNumber = displayNumber.current ? displayNumber.current.value : 20;
        const lastIndex = currentPage * theDisplayNumber;
        const firstIndex = lastIndex - theDisplayNumber
        const currentRunes = displayData.slice(firstIndex, lastIndex);

        const renderRunes = (item, i) => {
            return <div key={i} className={`RuneBox ${displayListName}`}>
                <Rune
                    key={item.id ? item.id : item.key}
                    eachRune={item} 
                    listKeys={Object.keys(displayData[0])} 
                    index={i} 
                    display={display[i]}
                    toggleRunes={this.toggleRunes.bind(this)}
                    abilities={abilities}
                    sortBy={this.sortBy.bind(this)}
                />
            </div>
        };

        const expandAll = <button 
            key="expandAll" 
            className='expandAll' 
            onClick={() => this.setState({
                display: [...Array(displayData.length+displayData.length)].map(() => !display[0] ? true : false)
            })}>Expand All
        </button>
        
        const pageNumbers = [];
        for(let i = 1; i <= Math.ceil(displayData.length / theDisplayNumber); i++){
            pageNumbers.push(i)
        }

        const renderPageNumbers = <ul className='pageNumbers'>
            {pageNumbers.map(number => {
                return (
                <li key={number} id={number} className={currentPage === number ? 'activeNumber' : ''}  onClick={this.handleClick}>{number}
                </li>
                );
            })}
        </ul>

        return <div ref='placement' className='runesPlacement' id="runesPlacement">
            {expandAll}
            {renderPageNumbers}
            {<FlatList
                list={currentRunes}
                renderItem={renderRunes}
                renderWhenEmpty={() => <div key={'Empty List'} className="RunesErrorMessage emptyList"><h3>No Items Found</h3></div>}
                
                
                //groupBy={sortBy}
                sortBy={[{key: sortBy, descending: toggled}]}
            />}
            
        </div>
    }
}

class Ability extends React.Component {
    // props are this.props.value: the unique identifer for abilities, conditions, and mechanics, this.props.datalist: the full list of abilities, conditions, and mechanics

    render(){
        try {
            const {dataList, value} = this.props
            let conditionsAndMechanics = [dataList[1], dataList[2]].flat(), result = [];

            // determine which datalist to use, then filter through that list and fine the this.props.value unique identifier
            if(typeof(value) === 'string'){
                result = conditionsAndMechanics.filter(item =>{
                    return item.key === value
                })
            }else if(typeof(value) === 'number'){
                result = dataList[0].filter(item => {
                    return item.ability_id === value
                })
            }

            //if no unique identifier was found return an empty string 
            //if a identifier was found run the hover ability function which will generate the ability
            if(result === undefined || result.length === 0){
                let failedToFind = this.props.failedToFind[0].split(/<.*?>/)
                return <span className="markupAbility"><b className='name'>{failedToFind[1]}</b></span>
            }else{
                return (
                    HoverAbility(result[0], dataList)
                )
            }
        } catch (error) {
            console.error(error);
            return <div className="RunesErrorMessage"><h3>Ability not Found</h3></div>
        }
    }
}

class RunesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            displayNumber: new React.createRef(),
            faction: ''
        }
    }

    updateSearch(event){
        this.setState({
            search: event.target.value,
        });
    }

    updateFaction(event){
        this.setState({
            faction: event.target.value
        })
    }

    render(){
        let filtered, filteredByStartingAbilities, filteredByName, filteredByAbilityUpgrades, filteredByRace, filteredByFaction, advancedFilter = [];
        let abilityUpgrades, filteredByDescription;

        const {displayData, displayListName, abilities} = this.props, {search, displayNumber, faction} = this.state

        try {
            function filterFaction(data, state){
                return filteredByFaction = data.filter(value => value.factions.includes(state));
            }

            function filterData(data, state){
                if(state.length < 3 ){
                    return filtered = data;
                }else if(state[0] === '!' && state.length > 5){
                    advancedFilter = state.slice(2);

                    filtered = data.filter(
                        rune => {
                            switch (state[1]){
                                case 'n': 
                                    return rune.name.toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1;
                                case 'a': 
                                    return [
                                        
                                        rune.description.toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1,
                                        rune.startingAbilities.map(value => value.name.toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1).filter(Boolean)
                                    ]
                                case 'r': 
                                    return rune.races.map(value => value.toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1).filter(Boolean)[0];
                                default:
                                    return <div className="RunesErrorMessage"><h3>Rune not Found</h3></div>
                            }
                        }
                    )
                    console.log(advancedFilter, filtered, state[1])
                    return filtered;
                }else{
                    filtered = data.filter(
                        (rune) =>{
                            filteredByName = rune.name.toLowerCase().indexOf(state.toLowerCase()) !== -1
                            
                            if(rune.startingAbilities !== undefined){
                                filteredByStartingAbilities = rune.startingAbilities.map(value => value.name.toLowerCase().indexOf(state.toLowerCase()) !== -1).filter(Boolean)
                                
                                abilityUpgrades = rune.abilitySets.map(innerValue => {return innerValue.abilities.map(thirdInnerValue =>{ return thirdInnerValue.name })});
                                filteredByAbilityUpgrades = abilityUpgrades.flat().map(value => value.toLowerCase().indexOf(state.toLowerCase()) !== -1).filter(Boolean);
                                
                                filteredByRace = rune.races.map(value => value.toLowerCase().indexOf(state.toLowerCase()) !== -1).filter(Boolean)

                                return filteredByName || filteredByStartingAbilities[0] || filteredByAbilityUpgrades[0] || filteredByRace[0];
                            }else if(rune.description !== undefined){
                                filteredByDescription = rune.description.toLowerCase().indexOf(state.toLowerCase()) !== -1;
                                return filteredByName || filteredByDescription
                            }else if(rune.shortDescription !== undefined){
                                filteredByDescription = rune.shortDescription.toLowerCase().indexOf(state.toLowerCase()) !== -1;
                                return filteredByName || filteredByDescription
                            }
                            return filteredByName
                        }
                    );
                }
            }
            
            if(displayData !== undefined || displayData !== any || displayData !== null){
                if(faction !== '' && displayListName !== "listOfConditions" && displayListName !== "listOfMechanics" && displayListName !== "listOfAbilities"){
                    filterFaction(displayData, faction);
                    filterData(filteredByFaction, search);
                }else{
                    filterData(displayData, search);
                }
            }
        } catch (error) {
            console.error(error)
            return <div className="RunesErrorMessage"><h3>Rune not Found</h3></div>
        }

        

        return (
            <div className="searchPlacement">
                <ul>
                    <div className="inputContainer">
                        <label className="searchLabel" htmlFor="displayNumber">Runes per Page: </label>
                        <input ref={displayNumber} type="number" className="displayNumber" id="displayNumber" defaultValue="15" min="1"></input>
                    
                        <label className="searchLabel" htmlFor="nameSearchField">Search Here: </label>
                        <input type="text" className="searchField" id="nameSearchField" value={search} onChange={this.updateSearch.bind(this)} ></input>

                        <label className="searchLabel">Faction:</label>
                        <select name="Faction" onChange={this.updateFaction.bind(this)} defaultValue="">
                            <option value="" >All Factions</option>
                            <option value="Forglar Swamp">Forglar Swamp</option>
                            <option value="Forsaken Wastes">Forsaken Wastes</option>
                            <option value="Ironfist Stronghold">Ironfist Stronghold</option>
                            <option value="K'thir Forest">K'thir Forest</option>
                            <option value="Savage Tundra" >Savage Tundra</option>
                            <option value="Shattered Peaks">Shattered Peaks</option>
                            <option value="Sundered Lands">Sundered Lands</option>
                            <option value="Underdepths">Underdepths</option>
                        </select>
                    </div>
                     
                    <Runes displayListName={displayListName} displayData={filtered} abilities={abilities} displayNumber={displayNumber}></Runes>
                </ul>
            </div>
        )
    }
}

export default App;
