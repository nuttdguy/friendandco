import React, {Component} from 'react';
import axios from 'axios';

class ActivityPlaceNewComponent extends Component {

  constructor() {
    super();
    this.state = {}

    this.onSubmit = this.handleOnSubmit.bind(this);

  }

  async handleOnSubmit(e) {
    e.preventDefault();
    const place = {
      country: e.target['country'].value,
      name: e.target['name'].value,
      lat: e.target['lat'].value,
      long: e.target['long'].value,
      address1: e.target['address1'].value,
      address2: e.target['address2'].value,
      city: e.target['city'].value,
      state: e.target['state'].value,
      zip: e.target['zip'].value,

    }

    const response = await axios.post('/api/auth/activity/place/new', place);
    console.log(response);
  }

  render() {

    return (
      <form onSubmit={this.handleOnSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <input type="text" name="country" />
          </div>
          <div>
            <label htmlFor="name">Place name</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label htmlFor="lat">Lattitude</label>
            <input type="text" name="lat" />
          </div>
          <div>
            <label htmlFor="long">Longitude</label>
            <input type="text" name="long" />
          </div>
          <div>
            <label htmlFor="address1">Address 1</label>
            <input type="text" name="address1" />
          </div>
          <div>
            <label htmlFor="address2">Address 2</label>
            <input type="text" name="address2" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input type="text" name="state" />
          </div>
          <div>
            <label htmlFor="zip">zip</label>
            <input type="text" name="zip" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
      </form>
    )
  }
}

export default ActivityPlaceNewComponent;