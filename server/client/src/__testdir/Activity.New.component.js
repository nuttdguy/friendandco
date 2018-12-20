import React, {Component} from 'react';
import axios from 'axios';

class ActivityNewComponent extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      tags: [],
      country: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      beginCal: {month: '', day: '', year: ''},
      endCal: {month: '', day: '', year: ''},
      beginTime: {hour: '', min: '', period: ''},
      endTime: {hour: '', min: '', period: ''}
    }

    this.onSubmit = this.handleOnSubmit.bind(this);
  }

  async handleOnSubmit(e) {
    e.preventDefault();
    const $ = e.target;

    const formData = {
      title: $['title'].value, 
      desc: $['desc'].value,
      tags: $['tags'].value,  
      country: $['country'].value, 
      address1: $['address1'].value, 
      address2: $['address2'].value,
      city: $['city'].value, 
      state: $['state'].value,
      zipcode: $['zipcode'].value,
      beginCal: {
        month: $['beginMonth'].value, 
        day: $['beginDay'].value, 
        year: $['beginYear'].value },
      endCal: {
        month: $['endMonth'].value, 
        day: $['endDay'].value, 
        year: $['endYear'].value },
      beginTime: {
        hour: $['beginHour'].value, 
        min: $['beginMin'].value, 
        period: $['beginPeriod'].value },
      endTime: {
        hour: $['endHour'].value, 
        min: $['endMin'].value, 
        period: $['endPeriod'].value } };

      // all input fields return a value
      console.log(formData);
    
      const res = await axios.post('api/auth/activity/new', formData);
      console.log(res);     

  }

  render() {

    return (
      <form onSubmit={this.handleOnSubmit}>

        {/* ACTIVITY DESCRIPTIVE DATA */}
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" placeholder="title"/>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input type="textarea" name="desc" placeholder="description"/>
          </div>

          <div>
            <label htmlFor="activity-tags">Activity Tags</label>
            <input type="text" name="tags" placeholder="comma separate each word; e.g. run, sport, gym, climbing" />
          </div>
        </div>


        {/* LOCATION DATA */}
        <div>
          <div>
            <label htmlFor="country">Location</label>
            <input type="text" name="country" placeholder="country" />
          </div>
          <div>
            <label htmlFor="address1">Address 1</label>
            <input type="text" name="address1" placeholder="1223 address street" />
          </div>
          <div>
            <label htmlFor="address2">Address 2</label>
            <input type="text" name="address2" placeholder="apt, suite, etc" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" placeholder="city" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input type="text" name="state" placeholder="state" />
          </div>
          <div>
            <label htmlFor="zipcode">Zip Code</label>
            <input type="text" name="zipcode" placeholder="zipcode" />
          </div>
        </div>

        {/* CALENDAR DATA */}
        <div>

          {/* BEGIN DATE */}
          <div>
            <div>
              <label htmlFor="begin-month">Begin month</label>
              <input type="text" name="beginMonth" placeholder="month"/>
            </div>
            <div>
              <label htmlFor="begin-day">Begin day</label>
              <input type="text" name="beginDay" placeholder="day"/>
            </div>          
            <div>
              <label htmlFor="begin-year">Begin year</label>
              <input type="text" name="beginYear" placeholder="year"/>
            </div>
          </div>

          {/* END DATE */}
          <div>
            <div>
              <label htmlFor="end-month">End month</label>
              <input type="text" name="endMonth" placeholder="month"/>
            </div>
            <div>
              <label htmlFor="end-day">End day</label>
              <input type="text" name="endDay" placeholder="day"/>
            </div>          
            <div>
              <label htmlFor="end-year">End year</label>
              <input type="text" name="endYear" placeholder="year"/>
            </div>
          </div>

          {/* BEGIN TIME */}
          <div>
            <div>
              <label htmlFor="hour">Begin hour</label>
              <input type="text" name="beginHour" placeholder="hour"/>
            </div>
            <div>
              <label htmlFor="minute">Begin minute</label>
              <input type="text" name="beginMin" placeholder="min"/>
            </div>          
            <div>
              <label htmlFor="period">AM / PM</label>
              <input type="text" name="beginPeriod" placeholder="period"/>
            </div>
          </div>

          {/* END TIME */}
          <div>
            <div>
              <label htmlFor="hour">Begin hour</label>
              <input type="text" name="endHour" placeholder="hour"/>
            </div>
            <div>
              <label htmlFor="minute">Begin minute</label>
              <input type="text" name="endMin" placeholder="min"/>
            </div>          
            <div>
              <label htmlFor="period">AM / PM</label>
              <input type="text" name="endPeriod" placeholder="period"/>
            </div>
          </div>
        
        </div>
      
        {/* SUBMIT BUTTON */}
        <div>
          <button type="Submit">Submit</button>
        </div>


      </form>
    )
  }

}


export default ActivityNewComponent;