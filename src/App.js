import React, { Component } from 'react';
import Prayer from './components/Prayer'
import './App.css';
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  translate,
} from 'react-switch-lang';
import { en } from './components/Language/en';
import { fr } from './components/Language/fr'
import { tr } from './components/Language/tr'
import { zh } from './components/Language/zh';
import { jp } from './components/Language/jp'
import { zh_cn } from './components/Language/zh-cn';

setTranslations({ en, fr, tr, jp, zh, zh_cn });
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
        <div id="table"></div>
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
