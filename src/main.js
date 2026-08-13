import './style.scss'

function addDefaultDataConverter(optionId, mmValue, inchValue) {
    document.querySelector(`#${optionId} + select`)
        .addEventListener('change', (ev) => {
            const setInputValue = (val) => document.getElementById(optionId).setAttribute("value", val)

            switch (ev.target.value) {
                case "cm":
                    setInputValue(mmValue)
                    break;
                case "in":
                    setInputValue(inchValue)
                    break;
            }
        })
}

/*
 * Default values are based off the 'A4' format for centimeters and the 'US Letter' format for inches.
 */
addDefaultDataConverter("page-height", 29.7, 11)
addDefaultDataConverter("page-width", 21.0, 8.5)
addDefaultDataConverter("margin-top", 2, 1)
addDefaultDataConverter("margin-bottom", 2, 1)
addDefaultDataConverter("margin-left", 3, 1)
addDefaultDataConverter("margin-right", 1.5, 1)
// paragraph-spacing-before: 0, 0
addDefaultDataConverter("paragraph-spacing-after", 0.35, 0.14)
addDefaultDataConverter("header-from-top", 1.25, 0.5)
addDefaultDataConverter("footer-from-bottom", 1.25, 0.5)

import createModule from "./pagecounter-lib.js"
const { cwrap, FS } = await createModule();
const getPageCount = cwrap(
    "page_count",
    "number",
    [
        "string",  // filename
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
        "number"   // footer_from_bottom
    ]
)

const cmToInches = (valcm) => valcm / 2.54

document.getElementById("form-submit-btn")
    .addEventListener('click', async (ev) => {
        ev.preventDefault()

        const resultat = document.getElementById("pagecount-result")
        resultat.hidden = true

        FS.writeFile("/file.txt", new Uint8Array(await (document.getElementById("textfile-input")
            .files[0])
            .arrayBuffer()));

        const valueOf = (id) => {
            const val = document.getElementById(id).value
            const unit = document.querySelector(`#${id} + select`)?.value
            if (unit !== null && unit === "cm") return cmToInches(val)
            else return val
        }

        const result = getPageCount(
            "/file.txt",
            "/arial.ttf",
            valueOf("font-size"),
            valueOf("line-spacing"),
            valueOf("page-height"),
            valueOf("page-width"),
            valueOf("margin-top"),
            valueOf("margin-bottom"),
            valueOf("margin-left"),
            valueOf("margin-right"),
            valueOf("paragraph-spacing-before"),
            valueOf("paragraph-spacing-after"),
            valueOf("header-from-top"),
            valueOf("footer-from-bottom")
        );

        FS.unlink("/file.txt")

        resultat.textContent = `Result: ${result} pages`
        resultat.hidden = false
    })
