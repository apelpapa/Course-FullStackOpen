```mermaid
sequenceDiagram
    Client ->> Server: Requests https://studies.cs.helsinki.fi/exampleapp/notes
    Server ->> Client: Sends notes.html
    Client ->> Server: Requests main.css
    Server ->> Client: Sends main.css
    Client ->> Server: Requests main.js
    Server ->> Client: Sends main.js
    Client ->> Server: Requests data.json
    Server ->> Client: Sends data.json
```