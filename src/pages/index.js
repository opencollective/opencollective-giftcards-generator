import React, { Component } from 'react';
import { saveAs } from 'file-saver';

import StyledButton from '../components/StyledButton';
import StyledInput from '../components/StyledInput';

export default class Home extends Component {
  state = { formInput: '', loading: false, error: null };

  async generateAndDownload(format) {
    const filename = `giftcards.${format}`;
    const jsonString = `{ "cards": ${this.state.formInput.trim()} }`;
    try {
      const payload = JSON.parse(jsonString);
      this.setState({ loading: true });
      const response = await fetch(`/render-many/${filename}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const file = await response.blob();
      saveAs(file, filename);
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
      console.log('JSON payload', jsonString);
    }
  }

  render() {
    const { formInput, loading, error } = this.state;
    const readyToSubmit = formInput.length > 0;

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
        <hr />
        <h2>Generate directly from data</h2>
        <p>Paste the array from GraphQL API here.</p>
        <details>
          <summary>See example</summary>
          <pre>
            {`
          [
            {
              "id": null,
              "name": "€5 Gift Card from BrusselsTogether ASBL",
              "uuid": "84c3b302-93eb-4af5-9304-acf8f5fe83eb",
              "description": "€5 Gift Card from BrusselsTogether ASBL",
              "initialBalance": 500,
              "monthlyLimitPerMember": null,
              "expiryDate": "Fri May 15 2020 00:00:00 GMT+0200 (GMT+02:00)",
              "currency": "EUR",
              "data": null,
              "__typename": "PaymentMethodType"
            },
            {
              "id": null,
              "name": "€5 Gift Card from BrusselsTogether ASBL",
              "uuid": "a5665a61-ec24-41fe-904c-5b477f469622",
              "description": "€5 Gift Card from BrusselsTogether ASBL",
              "initialBalance": 500,
              "monthlyLimitPerMember": null,
              "expiryDate": "Fri May 15 2020 00:00:00 GMT+0200 (GMT+02:00)",
              "currency": "EUR",
              "data": null,
              "__typename": "PaymentMethodType"
            }
          ]
          `}
          </pre>
        </details>
        <StyledInput
          as="textarea"
          width={300}
          value={this.state.formInput}
          onChange={e => this.setState({ formInput: e.target.value })}
        />
        <br />
        <StyledButton
          minWidth={150}
          mr={2}
          disabled={!readyToSubmit}
          loading={loading}
          onClick={() => this.generateAndDownload('html')}
        >
          Generate HTML
        </StyledButton>
        <StyledButton
          minWidth={150}
          buttonStyle="primary"
          disabled={!readyToSubmit}
          loading={loading}
          onClick={() => this.generateAndDownload('pdf')}
        >
          Generate PDF
        </StyledButton>
        {error && <pre>{error}</pre>}
      </div>
    );
  }
}
