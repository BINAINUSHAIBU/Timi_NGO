# ORBIT WORLD TECH
Global technology-channel dashboard covering 34 countries and 408 generated channel catalog entries.

## Run
Use a local web server because browsers block `fetch()` from `file://`.

Python:
`python -m http.server 8080`

Then open:
`http://localhost:8080/`

## Add authorized live streams
Edit `data/channels.json` and put an authorized HLS `.m3u8` URL in each channel's `stream` field.

The project includes HLS.js playback, automatic channel filtering, country/category menus, search, quality filtering, favorites UI, responsive design, and a scalable JSON data structure.
