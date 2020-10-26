import React from 'react';


class Clock extends React.Component {
  componentDidMount() {
      setInterval(() => {
          this.getTime();
      })
  }
  constructor() {
      super();
      this.state = {
          time: "00:00:00:AM",
      }
  }
  getTime() {
      setInterval(() => {
          let date = new Date();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let seconds = date.getSeconds();
          let ampm = this.hour >= 12 ? 'AM' : 'PM';
          hour = hour % 12;
          hour = hour ? hour : 12;
          hour = fullTime(hour);
          minute = fullTime(minute);
          seconds = fullTime(seconds); 
          this.setState({
              time: hour % 12 + ":" + minute + ":" + seconds + ":" + 
           ampm,
          });
          function fullTime(n) { return n < 10 ? "0" + n : n }

      }, 1000);
  }
  render() {
      return (
          <div className="container">              
              <h3>{this.state.time}</h3>
          </div>
      );
  }
};


export default Clock;
