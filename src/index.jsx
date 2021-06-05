import './declaration.d'
import './style.css'
//import 'module-workers-polyfill';
import Header from './components/Header'
import Main from './components/Main'

document.querySelector('#app').appendChild(<div>
  <Header />
  <Main />
</div>)