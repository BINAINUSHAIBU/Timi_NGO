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

## Curated official live sources
The project now includes a small curated set of publisher-owned/public live sources:
- NASA Live — official NASA YouTube live source
- NASA International Space Station Live — official NASA YouTube source
- Euronews LIVE — official Euronews YouTube source
- Bloomberg Live TV — official Bloomberg live page

YouTube sources are embedded using YouTube's official embed player. Bloomberg is opened on Bloomberg's official live page because the provider controls its web player.
