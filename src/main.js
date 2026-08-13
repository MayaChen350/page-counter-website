import './style.scss'

import createModule from "./pagecounter-lib.js"

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

const input = document.getElementById("textfile-input")

input.addEventListener('change', async (event) => {

    const em = await createModule();

    em.FS.writeFile("/file.txt", new Uint8Array(await event.target.files[0].arrayBuffer()));

    const getPageCount = em.cwrap(
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
