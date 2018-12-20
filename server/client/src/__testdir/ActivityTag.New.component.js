import React, {Component} from 'react';
import axios from 'axios';

class ActivityTagNewComponent extends Component {

  constructor() {
    super();
    this.state = {}

    this.onSubmit = this.handleOnSubmit.bind(this);

  }

  async handleOnSubmit(e) {
    e.preventDefault();
    const tag = {label: e.target['label'].value}

    const response = await axios.post('/api/auth/activity/tag/new', tag);
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
            <button type="submit">Submit</button>
          </div>
      </form>
    )
  }

}

export default ActivityTagNewComponent;