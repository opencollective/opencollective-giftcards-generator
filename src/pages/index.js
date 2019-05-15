import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Open Collective - Gift card generator</h1>
        <hr />
        <h2>Test Payloads</h2>
        <ul>
          <li>
            <a href="__test__/payload_simple_cards.html">Simple cards (html)</a>
          </li>
          <li>
            <a href="__test__/payload_simple_cards.pdf">Simple cards (pdf)</a>
          </li>
        </ul>
      </div>
    );
  }
}
