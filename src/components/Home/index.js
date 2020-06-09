// @flow

import React, { Component } from "react";

// import necessary subComponents
import Loader from '../Loader';
import Card from '../Card';

// importing the style from the external css file
import "./home.css";

// imprting all the configurable and important data
import { API_KEY, COUNT } from '../../config';

// importing necessary images to display
import IconMoveToTop from '../../images/movetotopwhite.png';
import IconDelete from '../../images/deletewhite.png';
import IconMoveToTopDemo from '../../images/movetotop.png';
import IconDeleteDemo from '../../images/delete.svg';
import Iconlogo from '../../images/logo.svg';


// declaring the type of states and props used
type Props = {};
type State = {
  restaurantList: Array<Object>,
  search: string,
  modalMessage: string,
  getDataInprogress: boolean,
  showModal: boolean,
};

class Home extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: [],
      search: '',
      modalMessage: '',
      getDataInprogress: false,
      showModal: false,
    };

    //  binding all the necessary functions to perform state operations
    (this: any).onSearchClick = this.onSearchClick.bind(this);
    (this: any).handleSearchValueChange = this.handleSearchValueChange.bind(this);
    (this: any).onClickDelete = this.onClickDelete.bind(this);
    (this: any).onClickMovetoTop = this.onClickMovetoTop.bind(this);
    (this: any).onCardClick = this.onCardClick.bind(this);
    (this: any).onClickBulkDelete = this.onClickBulkDelete.bind(this);
    (this: any).onClickBulkMovetoTop = this.onClickBulkMovetoTop.bind(this);

  }

  // handling on change for text entered in the search box
    handleSearchValueChange(e) {
      let { value } = e.target;
      this.setState(prevState=>({
        search: value,
      }));
    }
  // handling onclick for the card to be selected and to deselect if already selectedå
    onCardClick(index) {
      let tempRestaurantList = [...this.state.restaurantList];
      if (index>=0) {
        if (tempRestaurantList[index].is_selected === true) {
          tempRestaurantList[index].is_selected = false;
        } else {
          tempRestaurantList[index].is_selected = true;
        }
      }
      this.setState(prevState=>({
        restaurantList: tempRestaurantList,
      }));
    }
    // onClick of deleting all selected cards
    onClickBulkDelete() {
      let tempRestaurantList = this.state.restaurantList.filter(restaurant=> !restaurant.is_selected);
      const tempModaldata = this.state.restaurantList.filter(restaurant=> restaurant.is_selected);
      // creating the message with all the data of the cards as a snack bar
      let tempModalMessage = '"';
      for(let i=0;i<tempModaldata.length;i++) {
        tempModalMessage += tempModaldata[i].restaurant.name + ', ';
      }
      tempModalMessage += '" have been deleted';

      // assigning list with modified data
      this.setState(prevState=>({
        restaurantList: tempRestaurantList,
        showModal: true,
        modalMessage: tempModalMessage,
      }));
      // removing the snack bar and its data
      setTimeout(()=> this.setState(prevState=>({
        showModal: false,
        modalMessage: '',
      })), 3000);
    }
    // onClick of removing all selected cards to the top
    onClickBulkMovetoTop() {
      let tempRestaurantSelectedList = [];
      let tempRestaurantUnselectedList = [];
      let tempModalMessage = '"';
      this.state.restaurantList.filter(restaurant=> !restaurant.is_selected);
      // creating the message with all the data of the cards as a snack bar
      // seperating the selected and unselected to move the selected cards to the top
      for(let i=0;i<this.state.restaurantList.length;i++) {
        if (this.state.restaurantList[i].is_selected) {
          tempRestaurantSelectedList.push(this.state.restaurantList[i]);
          tempModalMessage += this.state.restaurantList[i].restaurant.name + ', ';
        } else {
          tempRestaurantUnselectedList.push(this.state.restaurantList[i]);
        }
      }
      tempModalMessage += '" have been moved to the top of the list';
      let tempRestaurantList = [...tempRestaurantSelectedList, ...tempRestaurantUnselectedList];
      tempRestaurantList = tempRestaurantList.map(restaurant=> ({...restaurant, is_selected : false}));
      // assigning list with modified data
      this.setState(prevState=>({
        restaurantList: tempRestaurantList,
        showModal: true,
        modalMessage: tempModalMessage,
      }));
      // removing the snack bar and its data
      setTimeout(()=> this.setState(prevState=>({
        showModal: false,
        modalMessage: '',
      })), 3000);
    }

    onClickDelete(index) {
      let tempRestaurantList = [...this.state.restaurantList];
      // creating the message with all the data of the cards as a snack bar
      // deleting the particular card from the list
      let tempModalMessage = '';
      tempRestaurantList.splice(index,1);
      tempModalMessage = `"${this.state.restaurantList[index].restaurant.name}" has been deleted`;
      // assigning list with modified data
      this.setState(prevState=>({
        restaurantList: tempRestaurantList,
        showModal: true,
        modalMessage: tempModalMessage,
      }));
      // removing the snack bar and its data
      setTimeout(()=> this.setState(prevState=>({
        showModal: false,
        modalMessage: '',
      })), 3000);
    }
    onClickMovetoTop(index) {
      let tempRestaurantList = [...this.state.restaurantList];
      // creating the message with all the data of the cards as a snack bar
      // moving the particular card from the list to the top
      let temp = tempRestaurantList.splice(index,1);
      let tempModalMessage = '';
      tempModalMessage = `"${this.state.restaurantList[index].restaurant.name}" has been moved to the top of the list`;
      // assigning list with modified data
      this.setState(prevState=>({
        restaurantList: [...temp, ...tempRestaurantList],
        showModal: true,
        modalMessage: tempModalMessage,
      }));
      // removing the snack bar and its data
      setTimeout(()=> this.setState(prevState=>({
        showModal: false,
        modalMessage: '',
      })), 3000);
    }

  onSearchClick() {
    // getting the data from the API
    this.setState(prevState=>({
      getDataInprogress: true,
    }));
    fetch(`https://developers.zomato.com/api/v2.1/search?q=${this.state.search}&count=${COUNT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-key': API_KEY,
        },
        })
    .then(response => response.json())
    .then(data_list => this.setState(prevState=>({
        restaurantList: data_list.restaurants,
        getDataInprogress: false,
      }))
    )
    .catch(error=>
      this.setState(prevState=>({
          restaurantList: [],
          getDataInprogress: false,
        }))
      );
  }


  render() {
    // displaying the data of search section and list of restaurants
    return (
      <div className="app-container">
        { this.state.showModal ?
          <div className="modal">
            {this.state.modalMessage}
          </div> :
          null
        }
        <div className="top-bar">
          <div className="search-box-container">
            <img alt="zomato" src={Iconlogo} className="logo" />
            <input
              id="search"
              type="text"
              autoComplete="off"
              className="search-box-input"
              value={this.state.searchValue}
              onChange={this.handleSearchValueChange}
              placeholder="Search for Restaurants"
            />
            <div className="search-box-button" onClick={this.onSearchClick}>
              Search
            </div>
          </div>
          {this.state.restaurantList && this.state.restaurantList.filter(restaurant=> restaurant.is_selected).length ?
            <div>
              <img alt="delete bulk" src={IconMoveToTop} className="card-action-icons" onClick={this.onClickBulkMovetoTop} style={{marginRight: 10}} />
              <img alt="move to top bulk" src={IconDelete} className="card-action-icons" onClick={this.onClickBulkDelete} />
            </div> : <div style={{width: 42}} />
          }
        </div>
        <div className="main-page">
          {this.state.restaurantList && this.state.restaurantList.length ?
            <div className="card-action-helper">
              Tip:-
              <div>
                <img alt="delete" src={IconDeleteDemo} className="card-action-icons" style={{marginRight: 10, marginLeft: 5}} />
                 Delete
              </div>
              <div>
                <img alt="move to top" src={IconMoveToTopDemo} className="card-action-icons" style={{marginRight: 10, marginLeft: 10}} />
                 Move to Top
              </div>
            </div> :
          null}
          <div className="restaurant-list">
            {
              this.state.getDataInprogress ?
                <Loader /> :
                this.state.restaurantList && this.state.restaurantList.length ?
                  this.state.restaurantList.map((rest, index)=>
                    <Card
                      index={index}
                      key={index + '_' + rest.deeplink}
                      restaurant={rest.restaurant}
                      is_selected={rest.is_selected}
                      onClickDelete={this.onClickDelete}
                      onClickMovetoTop={this.onClickMovetoTop}
                      onCardClick={this.onCardClick}
                    />
                    ) :
                    <div className="landing-section">
                      Here You can search for all the restaurant partnered and
                      recognized by ZOMATO where you can find the details of the
                      restaurants and play with cards of the restaurant by deleting
                      unnecessary and changing their order.
                    </div>
            }
          </div>
        </div>
      </div>
      );
  }
}

export default Home;
