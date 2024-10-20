import React, { Component} from 'react';
import update from 'react-addons-update';
import { any } from 'prop-types';
import FlatList from 'flatlist-react';
import './App.css';
import { conditions} from './Runes/Api files/condition';
import { mechanics} from './Runes/Api files/mechanics';
import { champs, spells, equips, relics} from './Runes/Api files/champs';
import {abilities} from './Runes/Api files/abilities';
import {champAbilities} from './Runes/Api files/champAbilities';


function updateState(valueOfList){
	this.setState({valueOfList})
}

function updateSearch(event){
    if(event.target){
        this.setState({search: event.target.value,})
    }else{
        this.setState({search: event,})
    }
}

class App extends Component {
    constructor(props){
        super(props);

        // initialize the lists that will be holding all of the  sites data
        this.state = {
            listOfAll : [],
            listOfConditions: [],
            listOfChampions: [],
            listOfAbilities: [],
            listOfSpells: [],
            listOfEquips: [],
            listOfRelics: [],
            listOfMechanics: [],
            //Determine what the current clicked list is
            //i.e if Relics button is clicked valueOfList: listOfRelics; and will display the list of relics
            valueOfList: 'listOfChampions',
            slide: 0,
            prevSlide: 0,
            toolTip: ['Click on the stat of a Rune to sort your searchs by that stat', 
                'Click on the Icon of an ability to quick search for that ability',
                'Click the Image of an expanded rune to collapse it']
        };

        //updateList = updateList.bind(this)
        updateState = updateState.bind(this);
    }

    componentDidMount(){
        // Code to generate the abilities found only on champions
        //
        // let championAbilitySets = champs.map((value) => value.abilitySets[0].abilities.concat(value.abilitySets[1].abilities)).flat()
        // let championStartingAbilities = champs.map(value => value.startingAbilities).flat()
        // let champAbilities = championStartingAbilities.concat(championAbilitySets).filter((value, index, self) => 
        //     index === self.findIndex(x => (
        //         x.id === value.id
        //     ))
        // )

        // set all of the data imported from the APIs to their respective lists
        this.setState({
            listOfAll: equips.concat(relics, spells, champs).sort((a, b) => {
                let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            }),
            listOfConditions: conditions,
            listOfChampions: champs,
            listOfAbilities: champAbilities.concat(abilities).filter((value, index, self) => 
                index === self.findIndex(x => (
                    value.ability_id === x.ability_id
                ))
            ),
            listOfSpells: spells,
            listOfEquips: equips,
            listOfRelics: relics,
            listOfMechanics: mechanics,
        })

        setInterval(
            () => {
                if(this.state.prevSlide === this.state.toolTip.length - 2){
                    this.setState( prevState => {
                        return {
                            slide: 0,
                            prevSlide: prevState.slide
                            
                        }
                    })
                }else{
                    this.setState( prevState => {
                        return {
                            slide: prevState.slide + 1 ,
                            prevSlide: prevState.slide,
                            
                        }
                    })
                }
            }, 10000)
        
    }

    toolTipSlides(){
    
        const {slide, toolTip} = this.state;
    
        return(
            <div className='toolTipContainer'>
                <div className="toolTipSlider"
                    style={{ transform: `translate3d(${-slide * 100}%, 0, 0)` }}
                >
                    {toolTip.map((value, index) => {
                        return <span className='toolTip' key={index} >{value}</span>
                        })
                    } 
                </div>
                
                <div className='toolTipButtonContainer'>
                    {toolTip.map((value, index) => {
                        return <div key={index} 
                                    className={`toolTipButton ${slide === index ? "active" : ""}`}
                                    onClick={() => {this.setState({slide: index })}}></div>
                    })}
                </div>
            </div>
        )
    }

	render() {
        // store the data of the clicked list in populatedData
        const {valueOfList, listOfAbilities, listOfMechanics, listOfConditions} = this.state;
        let populatedData = this.state[valueOfList];
        
		return (
		<div className="App">
			<header className="App-header">
                <h1 className="App-title">PoxRaze</h1>
                <span>The PoxNora Search Engine</span>
                
                {this.toolTipSlides()}
			</header>    
        
			<div id='placement'>
                {/* the displayed information will be organized into lists of runes that share similarities. */}
                {/* currently lists can only be organized by "Name" of rune and the value of the list*/}
                <RunesList displayListName={valueOfList} displayData={populatedData || []} abilities={[listOfAbilities, listOfMechanics, listOfConditions]}></RunesList>
            </div>

            <div className='appFooter'> 
                <span>© Art and data related to PoxNora are property of <a href="http://www.desertowlgames.com/" target="blank">Desert Owl Games</a> </span>
                <span><a href="https://github.com/Blacr7/PoxRaze/blob/master/README.md#tutorial" target="blank">Tutorial</a></span>
                <span><a href="https://blacr7.github.io/Portfolio/" target="blank">© Robert Black JR, 2018 </a></span>
            </div>
		</div>
		);
	}
}

class ControlButtons extends Component{

    constructor(props){
        super(props);

        this.state = {
            active: [false,true,false,,,,,]
        }
    }

    render(){
        const {displayListName} = this.props;

        return(
            <div className="controlButtons">
                <button   className={displayListName == 'listOfAll' ? 'active' : ''} onClick={() => updateState('listOfAll')} id="All Runes">All Runes</button>
                <button   className={displayListName == 'listOfChampions' ? 'active' : ''} onClick={() => updateState('listOfChampions')} id="Champions">Champions</button>
                <button   className={displayListName == 'listOfSpells' ? 'active' : ''} onClick={() => updateState('listOfSpells')} id="Spells">Spells</button>
                <button   className={displayListName == 'listOfRelics' ? 'active' : ''} onClick={() => updateState('listOfRelics')} id="Relics">Relics</button>
                <button   className={displayListName == 'listOfEquips' ? 'active' : ''} onClick={() => updateState('listOfEquips')} id="Equips">Equips</button>
               	<button   className={displayListName == 'listOfAbilities' ? 'active' : ''} onClick={() => updateState('listOfAbilities')} id="Abilities">Abilities</button>
                <button   className={displayListName == 'listOfConditions' ? 'active' : ''} onClick={() => updateState('listOfConditions')} id="conditions">Conditions</button>
                <button   className={displayListName == 'listOfMechanics' ? 'active' : ''} onClick={() => updateState('listOfMechanics')} id="Mechanics">Mechanics</button>
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
                active: [Array(4).fill(false), Array(4).fill(false)],
                noraCost: props.eachRune.noraCost,
                updatedNoraCost: props.eachRune.noraCost -this.findDefault[0].noraCost - this.findDefault[1].noraCost,
                selectedAbilities: [this.findDefault[0].noraCost, this.findDefault[1].noraCost],
            };
    
            this.upgradeAbilities = this.upgradeAbilities.bind(this);
        }else{
            this.state = {
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
        const {eachRune, runeList, index, display, toggleRunes, abilities, sortBy} = this.props;
        const { noraCost } = this.state;

        const nameLevel = (
            eachRune.level !== undefined && eachRune.level > 0 //determine if the current rune has a assigned level 
            ? 
            <b className='name' >{eachRune.name} ({eachRune.level})</b>  // if yes attach the level to the name E.g acid bomb with level 2 = acid bomb (2)
            : 
            <b className='name' >{eachRune.name}</b> // if no leave the name as is
        )

        const expandedResult = (displayToggle) => { // expand the current rune and display more of its information   
            let abilityList = [], abilitySets = [], key = 0, collapsedRune = '';
    
            const StartingAbilities = (item) => {// StartingAbilities is a list of all the abilities a champion has base
                abilityList = eachRune[item];
                return  <div key={eachRune.name + key++} className={item} style={{gridArea: item}}>
                            Base Abilities:
    
                            {abilityList.map((value,index) => (
                                <div key={eachRune.name + key++} className={`Ability${index}`}>
                                    <Ability key={value.id} value={value.id} dataList={abilities}></Ability>
                                </div>
                                
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
                                                id={`${eachRune.id}AbilitySet${index}Ability${innerIndex}`}
                                                name={`${eachRune.id}AbilitySet${index}`}
                                                value={`${index} ${innerIndex} ${innerValue.id}`}
                                                defaultChecked={innerValue.default ? 'checked' : ''}
                                                onChange={this.upgradeAbilities}
                                                />

                                                <label 
                                                htmlFor={`${eachRune.id}AbilitySet${index}Ability${innerIndex}`}
                                                defaultChecked={innerValue.default ? 'checked' : ''}
                                                className={`AbilitySet${index} Ability${innerIndex}`}
                                                >
                                                    <Ability key={innerValue.id ? innerValue.id : innerValue.ability_id} value={innerValue.id ? innerValue.id : innerValue.ability_id} dataList={abilities}/>
                                                </label>
                                            </span>
                                    })}
                                </div>}
                            )
                        }
                    </div>
            }

            const NoraCost = (item) => {
                return <li key={key++} className={item} style={{gridArea: item}}>
                       {item}: <span className={item} onClick={sortBy}>{noraCost}</span>
                </li> 
            }

            const Name = (item) =>{
                // if the current rune doesn't have a picture move the expand functionality to the name
                return eachRune.hash === undefined 
                ? 
                <li key={key++} className={`${item} clickable`} style={{gridArea: item}} > 
                    <span className="material-icons" onClick={() => {displayToggle(index)}}>open_in_full</span> {item}:  <span onClick={() => [updateState('listOfAll'), updateSearch(eachRune.name)]}>{nameLevel}</span> 
                </li>
                :
                <li key={key++} className={item} style={{gridArea: item}} >
                    {item}: <span onClick={sortBy}>{nameLevel}</span>
                </li>
            }
    
            const TrueToYes = (item) => { // convert the true or false items in a rune to something more readable 
                return <li key={key++} className={item} style={{gridArea: item}}>
                            {item}: <span className={`${eachRune[item]}`}>{eachRune[item] ? 'Yes' : 'No'}</span>
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
                return <li 
                            key={key++}
                            className={item} 
                            style={{gridArea: item}}
                        >
                            <span className="largeIcon">{findAbilityIcon(eachRune, 'large')}</span>
                        </li>;
            }

            const BuildImageFrame = (item) => {// generate the IMG for runes based on its hash value from the API, you can determine the size from ".../images/runes/(whatever size you want)/..."
                // sizes for the hash include: lg, med, sm (not all runes have a sm size), hash also determines the sprite of the rune
                // sprites can be found at https://d2aao99y1mip6n.cloudfront.net/images/runes/idols/(hash).gif
                // sprites only have one size and are currently not being generated for optimization reasons 
                return 	<li key={key++} className={item} style={{gridArea: item}}>
                    
                        <div className="img-full" >
                            <img className="image rune " loading="lazy" src={"https://d2aao99y1mip6n.cloudfront.net/images/runes/lg/" + eachRune.hash + ".jpg"} alt="Runes" />
                            <img className="image frame" loading='lazy' src='https://d2aao99y1mip6n.cloudfront.net/_themes/global/frames/large/front/1.gif' alt='Rune Frame' />
                            
                            <div className='statSection'>
                                <div className='statBlock dmg' >
                                    <img className='damage' onClick={sortBy} src='./Images/dmgStat.png'></img>
                                    {eachRune.damage}
                                </div>
                                <div className='statBlock spd'>
                                    <img className='speed' onClick={sortBy} src='Images/spdStat.png'></img>
                                    {eachRune.speed}
                                </div>
                                <div className='statBlock rng'>
                                    <img className='maxRng' onClick={sortBy} src='Images/rngStat.png'></img>
                                    {`${eachRune.minRng} - ${eachRune.maxRng}`}
                                </div>
                                <div className='statBlock def'>
                                    <img className='defense' onClick={sortBy} src='Images/defStat.png'></img>
                                    {eachRune.defense}
                                </div>
                                <div className='statBlock hp'>
                                    <img className='hitPoints' onClick={sortBy} src='Images/hpStat.png'></img>
                                    {eachRune.hitPoints}
                                </div>
                            </div>
                            
                            <img className="image frameRarity clickable" loading='lazy' onClick={() => {displayToggle(index)}} src={`Images/${eachRune.rarity}.gif`} alt='Rarity Frame'/>
                        </div>

                        
                    </li>;
            }
    
            const RestOf = (item) => { // generate the rest of the items in the rune that don't require special code
                if(item === 'rarity' || item === 'id'){
                    return
                }
                return <li key={key++} className={item} style={{gridArea: item}} >
                            {item}: <span className={item} onClick={sortBy}>{eachRune[item]}</span>
                        </li>;
            }

            return <div key={eachRune.name} className={`expandedRune`} id={eachRune.name}>{ Object.keys(eachRune).map((item) => {
                    
                    if(item === "abilitySets"){return AbilitySets(item);}
                    if(item === "startingAbilities"){ return  StartingAbilities(item);}
                    if(Array.isArray(eachRune[item])){return IsAnArray(item);}
                    if(item === 'noraCost'){return NoraCost(item)}
                    if(item === 'hash'){return BuildImageFrame(item)}
                    if(item === 'tradeable' || item === 'allowRanked' || item === 'forSale'){ return	TrueToYes(item);}
                    if(item === "description" || item === "shortDescription" || item === "short_description"){ return Description(item);}
                    if(item === "name"){collapsedRune = Name(item); return collapsedRune}
                    if(item === 'icon_name' || item === 'iconName'){ return IconName(item)}
                    else{ return RestOf(item)}
                    })
                }
            </div>
        }

        const CollapsedRune = (
            !display
            ?
                <div className={runeList}>
                    <div key={eachRune.name} className='collapsedRune clickable' onClick={() => {toggleRunes(index)}}>
                        <div className='name' style={{gridArea: 'name'}}>Name: <span>{nameLevel}</span></div>
                        {eachRune.noraCost && eachRune.cost ? 
                            <div className='noraCost' style={{gridArea: 'noraCost'}}>Nora Cost: <span>{eachRune.noraCost}</span></div>
                            :
                            ''
                        }
                    </div>
                </div>
                
            :
                <div className={runeList}>
                    {expandedResult(toggleRunes)}
                </div>
                
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
            display: Array(100).fill(false),
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
            toggled: !this.state.toggled,
            sortBy: event.target.className ? event.target.className : 'name',
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
        displayData.sort((a,b) => toggled ? a[sortBy] < (b[sortBy]) : b[sortBy] < (a[sortBy]));
        const currentRunes = displayData.slice(firstIndex, lastIndex);
        
        const renderRune = (item) => {
            //item is an object containing all the information for a rune
            //i is the runes id, cant find the reason for that
            return <div key={item[1]} className={`RuneBox ${item[1]}`}>
                <Rune
                    key={item[0].id ? item[0].id : item[0].key}
                    eachRune={item[0]}
                    runeList={displayListName}
                    index={item[1]} 
                    display={display[item[1]]}
                    toggleRunes={this.toggleRunes.bind(this)}
                    abilities={abilities}
                    sortBy={this.sortBy.bind(this)}
                />
            </div>
        };
        
        const expandAll = <button 
            key="expandAll" 
            className='expandAll'
            onClick={() => 
                this.setState({
                display: display.map(value => !value),
            })}
        >
                Expand All
        </button>
        
        const pageNumbers = [];
        for(let i = 1; i <= Math.ceil(displayData.length / theDisplayNumber); i++){
            pageNumbers.push(i)
        }

        const renderPageNumbers = <ul className='pageNumbers'>
            {pageNumbers.map(number => {
                let startOf = displayData[number * theDisplayNumber - theDisplayNumber],
                endOf = displayData[(number * theDisplayNumber - theDisplayNumber) - 1],
                nextOf = displayData[(number * theDisplayNumber) - 1]

                let findStartOf = () => { 
                    if(number === 1 && startOf !== undefined){
                        return [<span className='startOf' key={startOf.name[0]}>{startOf.name[0]}</span>, ' ', number]
                    }if (nextOf !== undefined && endOf !== undefined && endOf.name[0] !== nextOf.name[0]){
                        return [
                            <span className='startOf' key={startOf.name[0]}>
                               {startOf.name[0]} - {nextOf.name[0]} {number}  
                            </span>
                        ]
                    }
                        return [number]
                }

                return (
                <li key={number} id={number} className={currentPage === number ? 'activeNumber' : ''}  onClick={this.handleClick}>
                    {findStartOf()}
                </li>
                );
            })}
        </ul>

        
        

        return <div ref='placement' className='runesPlacement' id="runesPlacement">
            {expandAll}
            {renderPageNumbers}
                {
                    <FlatList
                        list={currentRunes.map((value, index) => {
                            return [value, index];
                        })}
                        renderItem={renderRune}
                        renderWhenEmpty={() => 
                            <div key={'Empty List'} className="RunesErrorMessage emptyList">
                                <h3>No Runes Found</h3>
                                
                                <span>Select a "Rune" button, a valid page number, or try and broaden your search </span>
                            </div>}
                        limit={theDisplayNumber}
                    />
                }
        </div>
    }
}

const HoverAbility = (data, dataList, isNested) => {
    //create a hover box for the abilities in the game
    
    //determine if an ability has more than one level and apply the level number to the name of the ability
    let name = data.level !== undefined && data.level > 0 ? 
        <b className='name' >{data.name} ({data.level})</b> 
        : 
        <b className='name' >{data.name}</b>;

    // run the convert ability tag function of the desccription of a rune
    // if the description is nested within another description/ ability lookup convert ability tags will behave differently
    // to stop infinite recursion 
    let description = (data) => {
        let result 
            if(data.description){
                result = convertAbilityTags(data.description, dataList, isNested)
            }else if(data.shortDescription){
                result = convertAbilityTags(data.shortDescription, dataList, isNested)
            }else if(data.short_description){
                result = convertAbilityTags(data.short_description, dataList, isNested)
            }
            return <span className='description' > 
                {result}
            </span>
    }

    //<RunesList displayListName='listOfAll' displayData={allTheRunes || []} abilities={[dataList[0], dataList[1], dataList[2]]}></RunesList>
    return <span key={data.asset_id ? data.asset_id : data.key} className="markupAbility">
        {findAbilityIcon(data, 'small')} &nbsp;

        {data.key ? [<span key={data.name + data.key} onClick={() => [updateState('listOfAll'), updateSearch(data.name)]}>{name}</span>] : name}
        <div className='abilityHoverContainer'>
            <div className='abilityHover'>
                <div className='nameHidden'>{name}</div>
                {
                    data.cooldown !== undefined 
                    ? 
                        [
                            <span key={'cooldown' + data.asset_id} className='cooldown' >{data.cooldown !== 0 ? 'Cooldown: ' + data.cooldown : ''}</span>, 
                            <span key={'apCost' + data.asset_id} className='apCost' >{data.ap_cost ? 'AP cost: ' + data.ap_cost : 'AP cost: ' + data.apCost}</span>,
                            <span key={'noraCost' + data.asset_id} className='noraCost'>Nora cost: {data.cost ? data.cost : data.noraCost}</span>
                        ] 
                    : 
                        ''
                }
                
                {description(data)}
            </div>
        </div>
        
    </span>
}

const convertAbilityTags = (string, list, isNested) => {
    //convert ability, condition, and mechanic markup into searchable text,
    //then rune that text through the Ability class to find the relevant abilities
    let id = 0, abilityName = '';
    let reg = new RegExp(/(<.*?>*<.*?>)/), splitString = string.split(reg), lookFor = 'value';

    const nestedAbility = (data, key) => <div key={key} className='nestedAbility name'>{data}</div>

    return(<span className="markupText">
        {
            splitString.reduce((prevString, currentString, i) => {
                if(!i){
                    return [currentString];
				}
                //id is the value found between e= and > 
                id = currentString.split(/e=(.*?)>/)[1];
                abilityName = currentString.split(/>(.*?)</)[1];
                if(currentString.includes(lookFor) && isNested){
                    return prevString.concat(
                        nestedAbility(abilityName, id)
                    )
                }
                else if(currentString.includes(lookFor)){
                    return prevString.concat(
                        <Ability 
                            key={`${id} ${i}`} 
                            value={id.match(/\d+/g) === null ? id : Number(id)} 
                            dataList={list}
                            inCaseFailedToFind={splitString.filter(value => value.includes(id))}
                            isNested={true}
                        />
                    )
                }else {
                    return prevString.concat(currentString);
                }
                
            }, [])
        }
	</span>)
}

const findAbilityIcon = (data, size) => {
    if(data.iconName !== '' && data.iconName !== undefined && data.iconName !== null){
        return <img 
            className='abilityIcon' 
            src={`https://d2aao99y1mip6n.cloudfront.net/images/ability_icons/${size}/icon_${data.icon_name ? data.icon_name: data.iconName}.gif`} 
            onError={
                //stop certain infinite onError loops from happening
                (q) => {
                    q.onError = (w) =>{
                        q.target.src = `https://d2aao99y1mip6n.cloudfront.net/images/ability_icons/small/icon_${data.icon_name ? data.icon_name: data.iconName}.gif`}
                    }
                } 
            alt={`${data.icon_name ? data.icon_name: data.iconName} icon`}
            value={data['name']}
            loading='lazy'
            onClick={() => [updateState('listOfAll'), updateSearch(data.name)]}
        /> 
    }else{
        return ''
    }
    
}

class Ability extends React.Component {
    
    // props are this.props.value: the unique identifer for abilities, conditions, and mechanics, this.props.datalist: the full list of abilities, conditions, and mechanics
    render(){
        try {
            const {dataList, value} = this.props
            //flatten conditions and mechanics arrays into one array
            let conditionsAndMechanics = [dataList[1], dataList[2]].flat(), result = [];

            // determine which datalist to use, then filter through that list and find the this.props.value unique identifier for the ability
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
                let inCaseFailedToFind = this.props.inCaseFailedToFind[0].split(/<.*?>/)
                return <span className="markupAbility"><b className='name'>{inCaseFailedToFind[1]}</b></span>
            }else if(this.props.isNested){
                return (
                    HoverAbility(result[0], dataList, true)
                )
            }
            else{
                return (
                    HoverAbility(result[0], dataList, false)
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
            faction: 'all',
            races: 'all',
            classes: 'all',
            rarity: 'all',
        }

        updateSearch = updateSearch.bind(this);
    }

    updateFaction(event){
        this.setState({
            faction: event.target.value
        })
    }

    updateRace(event){
        this.setState({
            races: event.target.value
        })
    }

    updateClass(event){
        this.setState({
            classes: event.target.value
        })
    }

    updateRarity(event){
        this.setState({
            rarity: event.target.value
        })
    }

    render(){
        let filtered, filteredByStartingAbilities, filteredByName, filteredByAbilityUpgrades, filteredByDropdown, filteredByRace, advancedFilter = [];
        let abilityUpgrades, filteredByDescription;

        const {displayData, displayListName, abilities} = this.props, {search, displayNumber, faction, races, classes, rarity} = this.state
        
        function advancedSearchFilter(data, state, abilityLocation){
            filtered = data.filter(
                rune => {
                    switch (state[1]){
                        case 'n': 
                            return rune.name.toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1;
                        case 'a': 
                            return filteredByDescription = rune[abilityLocation].toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1;
                        default:
                            return <div className="RunesErrorMessage"><h3>Rune not Found</h3></div>
                    }
                }
            )
        }

        try{
            function dropDownFilter(data){
                return filteredByDropdown = data.filter(
                    value =>  
                        (faction !== 'all' ? value.factions?.includes(faction) : value)
                        &&
                        (rarity !== 'all' ? value.rarity === rarity ? value : '' : value)
                        &&
                        (races !== 'all' && value.races ? value.races?.includes(races) : value)
                        &&
                        (classes !== 'all' && value.classes ? value.classes?.includes(classes) : value)
                );
            }

            function filterData(data, state){
                // wait for search condition of at least 3 characters
                // if the search condition starts with an ! wait for at least 5 characters
                if(state.length < 3){
                    return filtered = data;
                }else if(state[0] === '!' && state.length < 5){
                    return filtered = data;
                }
                
                else if(state[0] === '!' && state.length >= 5 && (displayListName === 'listOfSpells' || displayListName === 'listOfRelics' || displayListName === 'listOfEquips' )){
                    advancedFilter = state.slice(2);
                    advancedSearchFilter(data, state, 'description');
                    return filtered;
                }
                
                else if(state[0] === '!' && state.length >= 5 && displayListName === 'listOfAbilities'){
                    advancedFilter = state.slice(2);
                    advancedSearchFilter(data, state, 'short_description');
                    return filtered;
                }
                
                else if(state[0] === '!' && state.length >= 5 && displayListName === 'listOfChampions'){
                    advancedFilter = state.slice(2);

                    filtered = data.filter(
                        rune => {
                            switch (state[1]){
                                case 'n': 
                                    return rune.name.toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1;
                                case 'a': 
                                    filteredByStartingAbilities = rune.startingAbilities.map(value => value.name.toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1).filter(Boolean)
                                    
                                    abilityUpgrades = rune.abilitySets.map(innerValue => {return innerValue.abilities.map(thirdInnerValue =>{ return thirdInnerValue.name })});
                                    filteredByAbilityUpgrades = abilityUpgrades.flat().map(value => value.toLowerCase().indexOf(advancedFilter.toLowerCase()) !== -1).filter(Boolean);

                                    return filteredByStartingAbilities[0] || filteredByAbilityUpgrades[0]
                                default:
                                    return <div className="RunesErrorMessage"><h3>Rune not Found</h3></div>
                            }
                        }
                    )
                    return filtered;
                }else{
                    filtered = [data.filter(
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
                            }else if(rune['shortDescription'] !== undefined){
                                filteredByDescription = rune['shortDescription'].toLowerCase().indexOf(state.toLowerCase()) !== -1;
                                return filteredByName || filteredByDescription
                            }
                            return filteredByName
                        }
                    )
                    ]
                }
            }
            
            if(displayData !== undefined || displayData !== any || displayData !== null){
                if(displayListName !== "listOfConditions" && displayListName !== "listOfMechanics" && displayListName !== "listOfAbilities"){
                    dropDownFilter(displayData);
                    filterData(filteredByDropdown, search);
                }else{
                    filterData(displayData, search)
                }
            }
        } catch (error) {
            console.error(error)
            return <div className="RunesErrorMessage"><h3>Rune not Found</h3></div>
        }

        return (
            <div className="searchPlacement">
                    <div className="inputContainer">
                        {/* the various buttons that will prompt what list of runes to search through */}
				        <ControlButtons displayListName={displayListName}/>
                        <label className="searchLabel" htmlFor="displayNumber">Runes per Page: </label>
                        <input ref={displayNumber} type="number" className="displayNumber" id="displayNumber" defaultValue="15" min="1"></input>
                    
                        <label className="searchLabel" htmlFor="nameSearchField">Search Here: </label>
                        <input type="text" className="searchField" id="nameSearchField" value={search} onChange={updateSearch.bind(this)} ></input>
                        
                        <br/>
                        
                        <label className="searchLabel" htmlFor="factions">Faction:</label>
                        <select name="Faction" id='factions' onChange={this.updateFaction.bind(this)} defaultValue="all">
                            <option value="all" >All Factions</option>
                            <option value="Forglar Swamp">Forglar Swamp</option>
                            <option value="Forsaken Wastes">Forsaken Wastes</option>
                            <option value="Ironfist Stronghold">Ironfist Stronghold</option>
                            <option value="K'thir Forest">K'thir Forest</option>
                            <option value="Savage Tundra" >Savage Tundra</option>
                            <option value="Shattered Peaks">Shattered Peaks</option>
                            <option value="Sundered Lands">Sundered Lands</option>
                            <option value="Underdepths">Underdepths</option>
                        </select>

                        <label className="searchLabel" htmlFor="races">Races:</label>
                        <select name='races' id='races' onChange={this.updateRace.bind(this)} defaultValue="all">
                            <option value="all">All Races</option>
                            <option value="Angel">Angel</option>
                            <option value="Arthropod">Arthropod</option>
                            <option value="Barbarian">Barbarian</option>
                            <option value="Beast">Beast</option>
                            <option value="Boghopper">Boghopper</option>
                            <option value="Centaur">Centaur</option>
                            <option value="Construct">Construct</option>
                            <option value="Cyclops">Cyclops</option>
                            <option value="Demon">Demon</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Draksar">Draksar</option>
                            <option value="Dwarf">Dwarf</option>
                            <option value="Elemental">Elemental</option>
                            <option value="Elf">Elf</option>
                            <option value="Fairy">Fairy</option>
                            <option value="Ferren">Ferren</option>
                            <option value="Firk">Firk</option>
                            <option value="G'hern">G'hern</option>
                            <option value="Garu">Garu</option>
                            <option value="Goblin">Goblin</option>
                            <option value="Human">Human</option>
                            <option value="Hyaenid">Hyaenid</option>
                            <option value="Imp">Imp</option>
                            <option value="Jakei">Jakei</option>
                            <option value="Jellebrium">Jellebrium</option>
                            <option value="Kanen">Kanen</option>
                            <option value="Leoss">Leoss</option>
                            <option value="Lich">Lich</option>
                            <option value="Lonx">Lonx</option>
                            <option value="Minotaur">Minotaur</option>
                            <option value="Mirefolk">Mirefolk</option>
                            <option value="Moga">Moga</option>
                            <option value="Mutant">Mutant</option>
                            <option value="Myx">Myx</option>
                            <option value="Plant">Plant</option>
                            <option value="Salaman">Salaman</option>
                            <option value="Skeezick">Skeezick</option>
                            <option value="Skeleton">Skeleton</option>
                            <option value="Slag">Slag</option>
                            <option value="Snaptooth">Snaptooth</option>
                            <option value="Spirit">Spirit</option>
                            <option value="Stitched">Stitched</option>
                            <option value="Tortun">Tortun</option>
                            <option value="Treefolk">Treefolk</option>
                            <option value="Troll">Troll</option>
                            <option value="Undead">Undead</option>
                            <option value="Vampyre">Vampyre</option>
                            <option value="Vashal">Vashal</option>
                            <option value="Voil">Voil</option>
                            <option value="Worm">Worm</option>
                            <option value="Yeti">Yeti</option>
                            <option value="Zombie">Zombie</option>
                        </select>

                        <label className="searchLabel" htmlFor="classes">Classes:</label>
                        <select name='classes' id='classes' onChange={this.updateClass.bind(this)} defaultValue="all">
                            <option value="all">All Classes</option>
                            <option value="Archer">Archer</option>
                            <option value="Bard">Bard</option>
                            <option value="Brute">Brute</option>
                            <option value="Crone">Crone</option>
                            <option value="Cultist">Cultist</option>
                            <option value="Demi-God">Demi-God</option>
                            <option value="Druid">Druid</option>
                            <option value="Knight">Knight</option>
                            <option value="Monk">Monk</option>
                            <option value="Paladin">Paladin</option>
                            <option value="Priest">Priest</option>
                            <option value="Ranger">Ranger</option>
                            <option value="Rogue">Rogue</option>
                            <option value="Shaman">Shaman</option>
                            <option value="Tinkerer">Tinkerer</option>
                            <option value="Wizard">Wizard</option>
                            <option value="Warrior">Warrior</option>
                            <option value="Witch">Witch</option>
                        </select>

                        <label className="searchLabel" htmlFor="rarity">Rarity:</label>
                        <select name='rarity' id='rarity' onChange={this.updateRarity.bind(this)} defaultValue="all">
                            <option value="all">All Rarities</option>
                            <option value="COMMON">Common</option>
                            <option value="UNCOMMON">Uncommon</option>
                            <option value="RARE">Rare</option>
                            <option value="EXOTIC">Exotic</option>
                            <option value="LIMITED">Limited</option>
                            <option value="LEGENDARY">Legendary</option>
                        </select>
                        
                    </div>
                     

                    <Runes 
                        displayListName={displayListName} 
                        displayData={filtered.sort((a,b) => a.name.localeCompare(b.name)).flat()} 
                        abilities={abilities} 
                        displayNumber={displayNumber}
                    ></Runes>
            </div>
        )
    }
}

export default App;