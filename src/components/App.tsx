import React from 'react';
import '../styles/main.scss';
import imageSrc from '../assets/media/React-icon.svg';
import Contacts from './Contacts';

const App: React.FC = (): JSX.Element => {
    return (
        <div className="app">
            <div className="app__header">
                <img src={`${imageSrc}`} className='app__header-icon' alt="React icon" />
                <h1 className="app__header-title">React App</h1>
            </div>
            <Contacts/>
        </div>
    );
}

export default App;