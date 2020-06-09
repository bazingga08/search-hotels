# search-hotels:

search-hotels is a project where you are given the flexibility to search for the restaurant and play with cards by reordering the cards and deleting unnecessary cards from the searched list

### Problem Statement and Problem Conditions
- Create a search bar on top of the page with a search button adjacent to it.
- On doing a search, perform network call to the given api and show received restaurants
in a vertical list with each restaurant card having a UI similar to the one given in the
below link.
- https://www.zomato.com/bangalore/restaurants/a2b-adyar-ananda-bhavan
- (Use the big card in centre with ‘call’ and ‘view menu’ buttons)
- A card can be selected or deselected by clicking upon it.
- More than 1 card can be selected at the same time.
- Change the background colour of a selected card to grey.
- There are 2 possible actions on each card(s)- Delete and Bring to top
- Delete- All selected cards or single card can be deleted from the list.
- Bring to top- This feature rearranges the cards in the list. When clicked upon
this button, the selected cards or single card will come to the top of the list,
pushing the non-selected cards down in the list.
- For example- in a list of 10 cards, if one selects card number 4 and 7 and
clicks on this button, then card at position 4 will come to position 1 and
card at position 7 will come to position 2(relative position of selected
cards will not change). All other cards will be pushed below them.
- The actions should be allowed on each card individually as well as bulk selected
cards.
- For each card, buttons for performing these actions are to be placed on the top
right corner on the card itself.
- Buttons for performing bulk actions are to be placed at the top right corner of the
page, aligned horizontally with the search bar.
- When the action is finished, the status of the action and the affected list of items
have to be displayed accordingly.
- For example- “Card 1, Card 2, Card 3 have been deleted”.
- New search will remove the old data and selections from the screen.

## Installation and Running

clone [search-hotels](https://github.com/addepalli8/search-hotels) repository from Github and install the necessary packages wrt the application and run the project

```bash
git clone https://github.com/addepalli8/search-hotels
cd search-hotels
npm i --save
npm start
```

## Implementations
- Reusable components.
- Maintained code standards (eslint).
- comments wherever needed
- cross-browser compatibility.
- device compatibility.

## solved the problem and built the application in 1 day including design and functionalities
