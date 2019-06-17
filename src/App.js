import React, { Component } from 'react';
import './App.scss';
import { connect } from "react-redux";


class App extends Component {
  render() {
    // Destructuring assignment from Props
    const { fetching, info, onRequestInfo, error } = this.props;

    const input = React.createRef()

    console.log(info)
    return (
      <div className="App">
        <header className="App-header">
          <img src="./pi.png" className="App-logo rounded-circle" alt="logo" />
          <h1 className="App-title">Numbers</h1>


          {info ? (
            <p className="App-intro">{info}</p>
          ) : (
              <p className="App-intro">No infos available</p>
            )}
          <form>
            <div>
              <label>insert a number</label>
              <input type="number" ref={input} className="form-control m-5" />
            </div>
            <div>
              {fetching ? (
              <button className="btn btn-warning" disabled>Fetching...</button>
            ) : (
                <button className="btn btn-primary" onClick={() => onRequestInfo(input.current.value)}> Show info about this number </button>
              )}
            </div>
            
          </form>

          {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}



          <small>Powered by <a href="http://numbersapi.com/">NumbersApi</a> without <a href="https://numbers-api-proxy.dci-fbw121.now.sh/?number=23"> CORS </a></small>
        </header>
      </div>
    );
  }
}

// Extracting Data with mapStateToProps
const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    info: state.info,
    error: state.error
  };
};

// Dispatching actions with mapDispatchToProps
const mapDispatchToProps = dispatch => {
  return {
    onRequestInfo: (num) => {
      console.log(num)
      return dispatch({ type: "API_REQUEST", number: num })
    }
  };
};

// the connect() function connects the React component to the Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(App);