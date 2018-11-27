import React from "react";
import Head from "next/head";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: ""
    };
  }
  onAnswerChange = e => {
    this.setState({ answers: e.target.value });
  };
  render() {
    return (
      <div>
        <Head>
          <title>My page title</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css"
          />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
          />
        </Head>
        <style jsx>
          {`
            input:focus {
              border-color: #a44dce;
            }
          `}
        </style>
        <section className="section">
          <div className="container">
            <h1 className="title">Puppeter automation</h1>
            <p className="subtitle">
              Ask me any <strong>Questions ?</strong>
            </p>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="What's the questions ?"
                onChange={e => this.onAnswerChange(e)}
              />
            </div>

            {this.state.answers && this.state.answers.length > 0 && (
              <div>Your answer is : {this.state.answers}</div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
