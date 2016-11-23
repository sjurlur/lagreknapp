import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { daglig: false, manedlig: false, saving: false, saved: false }
    this.toggleDaglig = this.toggleDaglig.bind(this);
    this.toggleManedlig = this.toggleManedlig.bind(this);
    this.save = this.save.bind(this);
  }

  toggleDaglig() {
    this.setState({ daglig: !this.state.daglig, saved: false });
  }

  toggleManedlig() {
    this.setState({ manedlig: !this.state.manedlig, saved: false });
  }

  save() {
    this.setState({ saving: true });
    setTimeout(() => {
      this.setState({ saving: false, saved: true });
      setTimeout(() => {
        this.setState({ saving: false, saved: false });
      }, 2500);
    }, 3000);
  }

  render() {
    const spinner = (
      <div className="atom_spinner_circular small white">
        <div className="spinner">
          <div className="s1"></div>
          <div className="s2"></div>
          <div className="s3"></div>
          <div className="s4"></div>
          <div className="s5"></div>
          <div className="s6"></div>
          <div className="s7"></div>
          <div className="s8"></div>
        </div>
      </div>);

    const spinner2 = (
      <div className="atom_spinner_circular inline">
        <div className="spinner inline">
          <div className="s1"></div>
          <div className="s2"></div>
          <div className="s3"></div>
          <div className="s4"></div>
          <div className="s5"></div>
          <div className="s6"></div>
          <div className="s7"></div>
          <div className="s8"></div>
        </div>
      </div>);
    
    let buttonText = null;
    if (this.state.saving) {
      buttonText = spinner;
    }
    else if (this.state.saved) {
      buttonText = 'Lagret';
    }
    else {
      buttonText = 'Lagre';
    }

    let buttonText2 = 'Lagre';
    if (this.state.saved) {
      buttonText2 = 'Lagret';
    }

    const textClasses = classNames({
      saving: this.state.saving,
      saved: this.state.saved,
      text: true,
    });

    const secondSpinner = this.state.saving ? spinner2 : null;
    return (
      <div className="layout-container">
        <div>
          <fieldset>
            <legend>Send meg oppsummering på e-post...</legend>
            <div>
              <input type="checkbox" id="chkVarslingDaglig" value="on" checked={this.state.daglig} onChange={this.toggleDaglig}/>
              <label htmlFor="chkVarslingDaglig">ved åpning av begrenset/sperret informasjon (daglig oppsummering)</label>
            </div>
            <div>
              <input type="checkbox" id="chkVarslingManedlig" value="on" checked={this.state.manedlig} onChange={this.toggleManedlig}/>
              <label htmlFor="chkVarslingManedlig">ved alle oppslag i kjernejournal (månedlig oppsummering)</label>
            </div>
          </fieldset>
          <button className="actionbutton" disabled={this.state.saved} type="button" onClick={this.save} aria-live="polite" aria-busy={this.state.saving} ref="button">
            <span className={textClasses}>{buttonText}</span>
          </button>
        </div>

        <div className="example2">
          <fieldset>
            <legend>Send meg oppsummering på e-post...</legend>
            <div>
              <input type="checkbox" id="chkVarslingDaglig" value="on" checked={this.state.daglig} onChange={this.toggleDaglig}/>
              <label htmlFor="chkVarslingDaglig">ved åpning av begrenset/sperret informasjon (daglig oppsummering)</label>
            </div>
            <div>
              <input type="checkbox" id="chkVarslingManedlig" value="on" checked={this.state.manedlig} onChange={this.toggleManedlig}/>
              <label htmlFor="chkVarslingManedlig">ved alle oppslag i kjernejournal (månedlig oppsummering)</label>
            </div>
          </fieldset>
          <button className="actionbutton" disabled={this.state.saved} type="button" onClick={this.save} aria-live="polite" aria-busy={this.state.saving} ref="button">
            <span className={textClasses}>{buttonText2}</span>
          </button>
          {secondSpinner}
        </div>
      </div>
    );
  }
}

export default App;
