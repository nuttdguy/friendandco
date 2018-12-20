import React, {Component} from 'react';
import axios from 'axios';

class ActivityKindNewComponent extends Component {

  constructor() {
    super();
    this.state = {}

    this.onSubmit = this.handleOnSubmit.bind(this);

  }

  async handleOnSubmit(e) {
    e.preventDefault();
    const actKind = {
      label: e.target['label'].value,
      desc: e.target['desc'].value
    }

    const response = await axios.post('/api/auth/activity/kind/new', actKind);
    console.log(response);
  }

  render() {

    return (
      <form onSubmit={this.handleOnSubmit}>
          <div>
            <label htmlFor="label">Label</label>
            <input type="text" name="label" />
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
      </form>
    )
  }

}

export default ActivityKindNewComponent;