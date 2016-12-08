import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';
import Collapse from 'react-collapse';
import logg from './kj.png'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { daglig: false, manedlig: false, saving: false, saved: false, savedOnce: false, open: false }
    this.toggleDaglig = this.toggleDaglig.bind(this);
    this.toggleManedlig = this.toggleManedlig.bind(this);
    this.save = this.save.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleDaglig() {
    this.setState({ daglig: !this.state.daglig, saved: false, savedOnce: false });
  }

  toggleManedlig() {
    this.setState({ manedlig: !this.state.manedlig, saved: false, savedOnce: false });
  }

  toggleOpen() {
    const open = !this.state.open;
    this.setState({ open });
  }

  save() {
    this.setState({ saving: true });
    setTimeout(() => {
      this.setState({ saving: false, saved: true, savedOnce: true });
      setTimeout(() => {
        this.setState({ saving: false, saved: false });
      }, 3000);
    }, 2500);
  }

  render() {
    const spinner = (
      <div className="atom_spinner small">
        <div className="spinner">
          <div className="spin1"></div>
          <div className="spin2"></div>
          <div className="spin3"></div>
          <div className="spin4"></div>
        </div>
      </div>);
    
    let buttonText = null;
    if (this.state.saving) {
      buttonText = spinner;
    }
    else if (this.state.savedOnce) {
      buttonText = 'Lagret';
    }
    else {
      buttonText = 'Lagre endringer';
    }

    const textClasses = classNames({
      saving: this.state.saving,
      saved: this.state.saved,
      text: true,
    });
    const expButtonClasses = classNames('atom_inline-navigationbutton', 'arrow-after', {
      'arrow-up': this.state.open,
      'arrow-down': !this.state.open,
    });
    const buttonClasses = classNames('actionbutton',{saved: this.state.savedOnce});

    return (
      <div className="layout-container">
        <h1>Logg over bruk</h1>
        <p>
          Dette er en oversikt over aktiviteter i kjernejournalen din. Du kan se hvem som har åpnet den, og om det er gjort registreringer eller endringer.
        </p>
        <p>
          Navnet på helsepersonell som har åpnet kjernejournalen din vises først etter én uke. Du kan også se når du selv har vært inne på din kjernejournal.
        </p>
        <button className={expButtonClasses} onClick={this.toggleOpen}>Instillinger for oppsummering på e-post</button>
          <Collapse isOpened={this.state.open}>
          <br/>
          <fieldset>
            <legend>Send meg oppsummering på e-post...</legend>
            <div>
              <input type="checkbox" id="chkVarslingDaglig3" value="on" checked={this.state.daglig} onChange={this.toggleDaglig}/>
              <label htmlFor="chkVarslingDaglig3">ved åpning av begrenset/sperret informasjon (daglig oppsummering)</label>
            </div>
            <div>
              <input type="checkbox" id="chkVarslingManedlig3" value="on" checked={this.state.manedlig} onChange={this.toggleManedlig}/>
              <label htmlFor="chkVarslingManedlig3">ved alle oppslag i kjernejournal (månedlig oppsummering)</label>
            </div>
          </fieldset>
          <p className="endringer"><b>Endringer  av personvernoppsett vil alltid bli varslet dersom du har registrert e-postadressen din.</b></p>
          <p>E-post vil bli sendt til <em>oystein.kristiansen@pastafabrikken.no</em></p>
          <p><a href="#">Endre e-postadresse i digitalt kontaktregister (ID-porten)</a></p>
          <button className={buttonClasses} type="button" onClick={this.save} aria-live="polite" aria-busy={this.state.saving} ref="button">
            <span className={textClasses}>{buttonText}</span>
          </button>
        </Collapse><br/><br/>
        <img src={logg} alt=""/>
      </div>
    );
  }
}

export default App;
