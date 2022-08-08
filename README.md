# Changes to come.

- [x] include list of Champions and find a list of abilities.
  - [x] find and include the remaining list of abilities
- [ ] link abilities, mechanics, and conditions between champs, relics, and spells.
- [x] Search function
  - [x] Search by race
  - [ ] Search by only one criteria 
    - [x] Search by only race
    - [x] Search by only name
    - [ ] Search by only ability
  - [x] Filter by faction
  - [ ] ~~Search by unit stats i.g. (dmg, spd, range, etc)~~
    - [x] sort by unit stats i.g. (dmg, spd, range, etc)
  - [x] Search by faction
  - [x] Search by ability
    - [ ] Search by ability level 
  - [x] Search by name

## Announcements

With the recent volume of patches the database may be out of date with the current patch and I do not want to roll out auto updates incase something breaks, if the database is currently out of date please feel free to message me.

~~There seems to be no API for *just* abilities, ive worked around this by pulling abilities from champions and putting them into their own list for easy lookup and filtering, because of that work around however all abilities not on a champion do not currently exist in the database, and as far as i could tell every other database ive seen past or present have had this problem and no one seems to have the solution.~~

~~this is why an equipment like **Bag of Boulders** will have abilities like *Bag of Boulders* but have no information on what *Bag of Boulders* actually does ~~

I have found an Api that includes a large sum of the abilities i was previously missing, some of the abilities in the game are still missing suchas Pillage, but im feeling much better about the ratio of missing to implemented abilities

## Tutorial 
* click anywhere on a collapsed rune to expand it

* close expanded runes by clicking the image of the rune, if there is no image click the name

* increase the number of runes shown at once with the *runes per page* section (be careful some lists have thousands of runes)

* if you are deep into the pages on a search and you then go into a more refined search make sure to click on lower page numbers to see runes if you don't find any. 

  * for example: you are on page 10 on the list of champions in the *Sundered Lands*, you then search for *skeezick*  there may not be 10 pages worth of *skeezick* in the *Sundered Lands* so you would have to click on page 1 or 2 to see your results

* lists of runes can be sorted by a particular value I.E. nora cost or damage

  * to sort a list of runes by a particular value simply click on the value(some values cannot be sorted) inside of a expanded rune
  
  * E.G. to sort a list of champions by their nora cost expand a rune and click on the NoraCost text on that rune  
   
  * sorting changes the list of runes from DES to AES or vice versa
  
  * rune lists are default sorted by rune name 
  
  * sorting only affects the runes on the page you are currently on, but the same sorting criteria will be applied to all pages


* currently implementing Advanced searching which will be activated with !(the letter of your search target) 

  * for example if you want to only search for a rune by the name start your search with !n

  * for example if you want to only search for a rune by the ability start your search with !a


* you can now filter champions by race

  * you can only filter champions by race, if you are doing a search with "All Runes", "Spells", "Relics", etc  filtering by race will remove all results without a race

* You can now click on a abilities Icon in order to search "All Runes" for that ability or that abilities name, for condition and mechanics click the name

  * filtering this way uses the "All Runes" tab

    * if you want to search through a different list of runes simply click the button with the runes you want to search through

  * ability searching currently ignores ability levels

    * E.G a search for Fire Bomb with show all levels of fire bomb not just the one you clicked

  * most Conditions and Mechanics are tied to abilities, and the search feature does not look "inside" abilities unless you are on the "Abilities" tab, so when using this feature to search for a condition or mechanic it might be more beneficial to search through the "abilities" tab find the ability you want then search for that ability

    * I am currently working on a way to automate this or at least make it more user friendly