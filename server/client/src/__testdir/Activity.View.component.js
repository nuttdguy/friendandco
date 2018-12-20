import React, {Component} from 'react';
import axios from 'axios';


class ActivityViewComponent extends Component {

  constructor() {
    super();
    this.state = {
      
    }
  }

  async componentDidMount() {
    const response = await axios.get('/api/activity'); 
    console.log(response);

  }

  render() {
    return (
      <div>
        Activity View
      </div>
    )
  }

}

export default ActivityViewComponent;
