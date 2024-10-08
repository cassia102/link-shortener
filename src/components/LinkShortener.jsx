import React, { useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function LinkShortener() {

    const [linkInput, setLinkInput] = useState('');
    const [shortLink, setShortLink] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async () => {
        try {
            const token = import.meta.env.VITE_BITLY_API_KEY;
            console.log('API Token:', token);

            if (!token) {
                throw new Error('API key is missing.');
            }

            const res = await fetch('https://api-ssl.bitly.com/v4/shorten', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "long_url": `${linkInput}`, "domain": "bit.ly" })
            });

            if (!res.ok) {
                console.error('Error:', res.statusText);
                return;
            }

            const result = await res.json();
            setShortLink(result.link);

        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="link-shortener-wrapper">
            {copied && <div className="copied-success-message"><p>🎉 Link copied to clipboard</p></div>}
            <div className="intro">
                <h1>Create attractive <span>links</span> with one click</h1>
                <p>Create powerful and recognizable short links</p>
            </div>
            <div className="link-input">
                <input 
                    type="text" 
                    name="linkInput"
                    value={linkInput}
                    onChange={e=> setLinkInput(e.target.value)}
                    />
                <button onClick={handleSubmit}>Create</button>
            </div>
            <div className="link-output">
                <h3>{shortLink}</h3>
                <CopyToClipboard text={shortLink}>
                    <button onClick={() => setCopied(true)}>&#x1F4CB;</button>
                </CopyToClipboard>
            </div>
        </div>
    )
}