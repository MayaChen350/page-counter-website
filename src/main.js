import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'

import createModule from "./pagecounter-lib.js"

document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

setupCounter(document.querySelector('#counter'))

const input = document.getElementById("textfile-input")

input.addEventListener('change', async (event) => {

    const em = await createModule();

    em.FS.writeFile("/file.txt", new Uint8Array(await event.target.files[0].arrayBuffer()));

    const getPageCount = em.cwrap(
        "page_count",
        "number",
        [
            "string", // filename
            "string",  // ttf filename
            "number",  // font_size
            "number",  // line spacing
            "number",  // page height
            "number",  // page width
            "number",  // margin_top 
            "number",  // margin_bottom
            "number",  // margin_left
            "number",  // margin_right
            "number",  // paragraph_spacing_before
            "number",  // paragraph_spacing_after
            "number",  // header_from_top
            "number"  // footer_from_bottom
        ]
    )

    const fontSize = 12
    const lineSpacing = 1.15
    const pageHeight = 11
    const pageWidth = 8.5
    const marginTop = 1
    const marginBottom = 1
    const marginLeft = 1
    const marginRight = 1
    const paragraphSpacingBefore = 0
    const paragraphSpacingAfter = 0.14
    const headerFromTop = 0.5
    const headerFromBottom = 0.5

    const result = getPageCount(
        "/file.txt",
        "/arial.ttf",
        fontSize,
        lineSpacing,
        pageHeight,
        pageWidth,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        paragraphSpacingBefore,
        paragraphSpacingAfter,
        headerFromTop,
        headerFromBottom
    );

    console.log(result);
})
