import * as React from 'react'
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import {GoogleOAuthProvider} from "@react-oauth/google";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="59654328577-tf8o08alil8qfomnjbk78avcgj85tm3u.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>
);