import React, { Component } from 'react';
import Prayer from './components/Prayer/prayer'
import './App.css';
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  translate,
} from 'react-switch-lang';
import { en } from './components/Language/en';
import { zh } from './components/Language/zh';

setTranslations({ en, zh });
setDefaultLanguage('en');

setLanguageCookie();

class App extends Component {

  render() {
    const { t } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <h1>{t('header')}</h1>
        </header>
        <Prayer />
        <footer className="App-footer">
          <p>
            {t('made_by')} <a href="https://github.com/aboudicheng/" target="_blank" rel="noopener noreferrer">{t('ping_cheng')}</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default translate(App);
