import { Counter, LoadingCounter } from './components';
import './App.css';
import { useContext } from 'react';
import { WebsocketContext } from './contexts';

function App() {
    const websocket = useContext(WebsocketContext);

    return (
        <div className="app-container">
            {
                websocket ? (
                    <Counter websocket={websocket} />
                ) : (
                    <LoadingCounter />
                )
            }
            <div className="socials">
                <p>Fox Stevenson's socials:</p>
                <ul>
                    <li>
                        <a href="https://www.instagram.com/foxstevenson/">
                            <i className="fa-brands fa-instagram"></i>Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://soundcloud.com/foxstevenson">
                            <i className="fa-brands fa-soundcloud"></i>Soundcloud
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/user/FoxStevensonTV">
                            <i className="fa-brands fa-youtube"></i>YouTube
                        </a>
                    </li>
                    <li>
                        <a href="https://open.spotify.com/artist/2BQWHuvxG4kMYnfghdaCIy">
                            <i className="fa-brands fa-spotify"></i>Spotify
                        </a>
                    </li>
                    <li>
                        <a href="https://discord.gg/foxstevenson">
                            <i className="fa-brands fa-discord"></i>Discord
                        </a>
                    </li>
                </ul>
            </div>
            <p className="disclaimer">
                Disclaimer: This website has no affiliation to Fox Stevenson; It is a fan-made creation.
            </p>
        </div>
    );
}

export { App }
