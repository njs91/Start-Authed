# Start Authed

Basic login system with authenticated routes, built in react and node (with TS).

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#back-end-installation">Back-end Installation</a></li>
        <li><a href="#front-end-installation">Front-end Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#default-setup">Default Setup</a>
      <ul>
        <li><a href="#formatting">Formatting</a></li>
        <li><a href="#preprocessing--transpiling">Preprocessing & Transpiling</a></li>
        <li><a href="#miscellaneous">Miscellaneous</a></li>
      </ul>
    </li>
  </ol>
</details>

## Getting Started

### Back-end Installation

@todo

### Front-end Installation

1. CD to front-end and install dependencies:
   ```sh
   npm install
   ```
2. Then run with:
   ```sh
   npm start
   ```

## Default Setup

### Formatting

Formatting is configured by prettier in package.json

### Preprocessing & Transpiling

1. TypeScript is transpiled into JavaScript for files with .tsx extensions (rather than .js)
2. Front-end uses SASS preprocessor with CSS modules (transpiles name.module.scss (& .sass) files to .css files)

### Miscellaneous

1. Need to run `npm run build` to generate production react files
2. Includes font awesome, default components, styles & variables: see /styles page
3. To format with prettier, run `npm run format`
4. To run unit tests (Jest), cd to front-end and run `npm test`
