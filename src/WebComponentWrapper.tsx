import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import { StackOneHub } from './StackOneHub';

if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
    const WebComponent = reactToWebComponent(StackOneHub, React, ReactDOM, {
        props: {
            token: 'string',
            baseUrl: 'string',
            mode: 'string',
        },
    });

    if (!customElements.get('stackone-hub')) {
        customElements.define('stackone-hub', WebComponent);
    }
}
