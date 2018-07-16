import React, { Component } from 'react';
import {
  Header,
  Segment,
} from 'semantic-ui-react'
import styled from 'styled-components';

import 'semantic-ui-css/semantic.min.css';

const HeadSegment = styled(Segment)`
  border-radius: 0 !important;
  text-align: center;
`;

const BlueSpan = styled.span`
  color: green;
`;

class App extends Component {
  render() {
    return (
      <div>
        <Header>
          <HeadSegment
            size="massive"
            color="black"
            inverted
          >
            Method<BlueSpan>::Weather</BlueSpan>
          </HeadSegment>
        </Header>
      </div>
    );
  }
}

export default App;
