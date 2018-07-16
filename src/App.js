import React, { Component } from 'react';
import {
  Header,
  Segment,
  Input,
  Message,
  Button,
  Icon,
} from 'semantic-ui-react'
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import 'semantic-ui-css/semantic.min.css';

const Main = styled.main`
  background-color: #eee;
  height: 100%;
`;

const HeadSegment = styled(Segment)`
  border-radius: 0 !important;
  text-align: center;
`;

const BlueSpan = styled.span`
  color: green;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 2rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SubForm = styled.div`
  margin-top: 1rem;
`;

const Forecast = styled.div`
  background-color: lightblue;
  margin: 2rem;
  padding: 2rem;
  border-radius: 10px;
  visibility: ${props => props.visible ? "visible": "hidden"};
`;

class App extends Component {
  state = {
    loading: false,
    city: 'Toronto',
    country: 'CA',
    weather: null,
    forecast: null,
  }

  setCity = (event, { value }) => {
    this.setState({
      ...this.state,
      city: value,
    })
  }

  setCountry = (event, { value }) => {
    this.setState({
      ...this.state,
      country: value,
    })
  }

  getData = () => {
    const that = this;

    this.setState({
      ...this.state,
      loading: true,
    }, () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&units=metric&APPID=885c24dac664de0bc9186f32747cf51a`)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          that.setState({
            ...that.state,
            loading: false,
            weather: data,
          }, () => {
            that.getForecastData();
          })
        });
    })
  }

  getForecastData = () => {
    const that = this;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&units=metric&APPID=885c24dac664de0bc9186f32747cf51a`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        console.log('forecast', data);
        that.setState({
          ...that.state,
          loading: false,
          forecast: data,
        });
      });
  }

  render() {
    return (
      <Main>
        <Header>
          <HeadSegment
            size="massive"
            color="black"
            inverted
          >
            Method<BlueSpan>::Weather</BlueSpan>
          </HeadSegment>
        </Header>
        <Body>
          <SearchForm>
            <Message info>
              Check the Weather by Searching Below
            </Message>
            <InputBox>
              <Input
                placeholder="City"
                onChange={this.setCity}
                default="Toronto"
              />
              <Input
                placeholder="Country"
                onChange={this.setCountry}
                default="CA"
              />
            </InputBox>
            <SubForm>
              <Button
                color="green"
                loading={this.state.loading}
                onClick={this.getData}
              >
                Search
              </Button>
            </SubForm>
          </SearchForm>
          {
            this.state.weather ?
              <Forecast
                visible={this.state.weather}
              >
                {this.state.weather.name} weather ||
                Temp: {this.state.weather.main.temp} ||
                Humidity: {this.state.weather.main.humidity}
              </Forecast>
            :
              null
          }

          {
            this.state.forecast ?
              <Forecast
                visible={this.state.forecast}
              >
                {this.state.forecast.city.name} forecast ||
                <div>
                  {this.state.forecast.list.forEach((value) => {
                    console.log('not enough time to display this data')
                    console.log(value);
                  })}
                </div>
              </Forecast>
            :
              null
          }
        </Body>
      </Main>
    );
  }
}

export default App;
