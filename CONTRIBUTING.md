# Contributing

## Development

```
npm install
npm run build      # bundle src/main.ts -> dist/lyrics-position.js (esbuild)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run format     # prettier --write
npm run check      # typecheck + lint + prettier --check
```

To test locally, copy the build output into the Spicetify `Extensions` folder and apply:

```
copy dist\lyrics-position.js %APPDATA%\spicetify\Extensions\   (Windows)
cp dist/lyrics-position.js ~/.config/spicetify/Extensions/     (macOS/Linux)
spicetify config extensions lyrics-position.js
spicetify apply
```

## Project structure

```
scripts/build.mjs   esbuild build script
src/
  main.ts           entry point (init, event wiring)
  store.ts          shared state and types
  config.ts         settings persistence (localStorage)
  i18n.ts           English / Japanese strings
  styles.css        all styles
  styles.ts         style injection
  track.ts          current track metadata
  providers.ts      lyrics providers (Spotify / LRCLIB)
  lyrics.ts         fetch orchestration, album color extraction
  render.ts         rendering and the highlight loop
  targets.ts        display targets (sidebar cards / popup / window)
  modes.ts          mode switching
  ui-buttons.ts     playbar button, official-button hook
  settings-ui.ts    settings dialog
  types/            Spicetify type definitions used by this project
```

## Release

Run **Actions → Release → Run workflow** on GitHub. Enter a version (or leave blank to use the
`version` field in `package.json`); the workflow runs checks, builds, and publishes a GitHub
Release with `lyrics-position.js` attached.
