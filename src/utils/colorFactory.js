import hexRgb from 'hex-rgb'
import rgbHex from 'rgb-hex'
/**
 * Factory to create a new color component 
 * @param {Number} index 
 * @param {HTMLElement} colorList 
*/
export default function colorComponent(index, colorList, data) {
    //Name color bloc
    let divGroupInput = document.createElement('div')
    divGroupInput.setAttribute('class', 'input-group--wrapper')

    let divInput1 = document.createElement('div')
    divInput1.setAttribute('class', 'input--wrapper')
    divGroupInput.appendChild(divInput1)

    let label1 = document.createElement('label')
    label1.setAttribute('for', 'color__name' + index)
    label1.textContent = data.factory.name
    divInput1.appendChild(label1)

    let input1 = document.createElement('input')
    input1.setAttribute('type', 'text')
    input1.setAttribute('id', 'color__name' + index)
    input1.setAttribute('name', 'color__name' + index)
    divInput1.appendChild(input1)

    //RGBA color bloc
    //R bloc
    let divInput2 = document.createElement('div')
    divInput2.setAttribute('class', 'hexa--wrapper')
    divGroupInput.appendChild(divInput2)

    let divInput21 = document.createElement('div')
    divInput21.setAttribute('class', 'input--wrapper')
    divInput2.appendChild(divInput21)

    let label21 = document.createElement('label')
    label21.setAttribute('for', 'color__r' + index)
    label21.textContent = data.factory.color_r
    divInput21.appendChild(label21)

    let input21 = document.createElement('input')
    input21.setAttribute('type', 'text')
    input21.setAttribute('id', 'color__r' + index)
    input21.setAttribute('name', 'color__r' + index)
    input21.type = "number"
    input21.maxLength = "3"
    input21.min = 0
    input21.max = 255
    divInput21.appendChild(input21)
    input21.addEventListener('keydown', (e) => {
        const allowedCharacters = '0123456789';
        (e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Backspace" || e.key === "Home" || e.key === "End" || e.key === "Enter" || e.key === "Tab") ? '' :
            allowedCharacters.indexOf(e.key) === -1 ? e.preventDefault() : ''
    })
    input21.addEventListener('change', (e) => {
        const rTrim = parseInt(input21.value.trim())
        const gTrim = parseInt(input22.value.trim())
        const bTrim = parseInt(input23.value.trim())
        const aTrim = parseFloat(input24.value.trim())
        // If > 255 then change for value max 255
        rTrim > 255 ? input21.value = 255 : ''
        // If r g b are between 0 and 255, then change hexa color and preview color 
        rTrim >= 0 && gTrim >= 0 && bTrim >= 0 && rTrim <= 255 && gTrim <= 255 && bTrim <= 255
            ? input24.value.trim().length != 0
                ? ((input3.value = rgbHex(rTrim, gTrim, bTrim, aTrim)), //Hex value
                    (divInput41.style.backgroundColor = '#' + input3.value)) //Preview color
                : ((input24.value = 1), //Alpha value
                    (input3.value = rgbHex(rTrim, gTrim, bTrim)), //Hex value
                    (divInput41.style.backgroundColor = input3.value)) //Preview color
            : ''
    })

    //G bloc
    let divInput22 = document.createElement('div')
    divInput22.setAttribute('class', 'input--wrapper')
    divInput2.appendChild(divInput22)

    let label22 = document.createElement('label')
    label22.setAttribute('for', 'color__g' + index)
    label22.textContent = data.factory.color_g
    divInput22.appendChild(label22)

    let input22 = document.createElement('input')
    input22.setAttribute('type', 'text')
    input22.setAttribute('id', 'color__g' + index)
    input22.setAttribute('name', 'color__g' + index)
    input22.type = "number"
    input22.maxLength = "3"
    input22.min = 0
    input22.max = 255
    divInput22.appendChild(input22)
    input22.addEventListener('keydown', (e) => {
        const allowedCharacters = '0123456789';
        (e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Backspace" || e.key === "Home" || e.key === "End" || e.key === "Enter" || e.key === "Tab") ? '' :
            allowedCharacters.indexOf(e.key) === -1 ? e.preventDefault() : ''
    })
    input22.addEventListener('change', (e) => {
        const rTrim = parseInt(input21.value.trim())
        const gTrim = parseInt(input22.value.trim())
        const bTrim = parseInt(input23.value.trim())
        const aTrim = parseFloat(input24.value.trim())
        // If > 255 then change for value max 255
        gTrim > 255 ? input22.value = 255 : ''
        // If r g b are between 0 and 255, then change hexa color and preview color 
        rTrim >= 0 && gTrim >= 0 && bTrim >= 0 && rTrim <= 255 && gTrim <= 255 && bTrim <= 255
            ? input24.value.trim().length != 0
                ? ((input3.value = rgbHex(rTrim, gTrim, bTrim, aTrim)), //Hex value
                    (divInput41.style.backgroundColor = '#' + input3.value)) //Preview color
                : ((input24.value = 1), //Alpha value
                    (input3.value = rgbHex(rTrim, gTrim, bTrim)), //Hex value
                    (divInput41.style.backgroundColor = input3.value)) //Preview color
            : ''
    })

    //B bloc
    let divInput23 = document.createElement('div')
    divInput23.setAttribute('class', 'input--wrapper')
    divInput2.appendChild(divInput23)

    let label23 = document.createElement('label')
    label23.setAttribute('for', 'color__b' + index)
    label23.textContent = data.factory.color_b
    divInput23.appendChild(label23)

    let input23 = document.createElement('input')
    input23.setAttribute('type', 'text')
    input23.setAttribute('id', 'color__b' + index)
    input23.setAttribute('name', 'color__b' + index)
    input23.type = "number"
    input23.maxLength = "3"
    input23.min = 0
    input23.max = 255
    divInput23.appendChild(input23)
    input23.addEventListener('keydown', (e) => {
        const allowedCharacters = '0123456789';
        (e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Backspace" || e.key === "Home" || e.key === "End" || e.key === "Enter" || e.key === "Tab") ? '' :
            allowedCharacters.indexOf(e.key) === -1 ? e.preventDefault() : ''
    })
    input23.addEventListener('change', (e) => {
        const rTrim = parseInt(input21.value.trim())
        const gTrim = parseInt(input22.value.trim())
        const bTrim = parseInt(input23.value.trim())
        const aTrim = parseFloat(input24.value.trim())
        // If > 255 then change for value max 255
        bTrim > 255 ? input23.value = 255 : ''
        // If r g b are between 0 and 255, then change hexa color and preview color 
        rTrim >= 0 && gTrim >= 0 && bTrim >= 0 && rTrim <= 255 && gTrim <= 255 && bTrim <= 255
            ? input24.value.trim().length != 0
                ? ((input3.value = rgbHex(rTrim, gTrim, bTrim, aTrim)), //Hex value
                    (divInput41.style.backgroundColor = '#' + input3.value)) //Preview color
                : ((input24.value = 1), //Alpha value
                    (input3.value = rgbHex(rTrim, gTrim, bTrim)), //Hex value
                    (divInput41.style.backgroundColor = input3.value)) //Preview color
            : ''
    })

    //A bloc
    let divInput24 = document.createElement('div')
    divInput24.setAttribute('class', 'input--wrapper')
    divInput2.appendChild(divInput24)

    let label24 = document.createElement('label')
    label24.setAttribute('for', 'color__a' + index)
    label24.textContent = 'Alpha'
    divInput24.appendChild(label24)

    let input24 = document.createElement('input')
    input24.setAttribute('type', 'text')
    input24.setAttribute('id', 'color__a' + index)
    input24.setAttribute('name', 'color__a' + index)
    divInput24.appendChild(input24)
    input24.addEventListener('keydown', (e) => {
        const allowedCharacters = '0123456789.';
        (e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Backspace" || e.key === "Home" || e.key === "End" || e.key === "Enter" || e.key === "Tab") ? '' :
            allowedCharacters.indexOf(e.key) === -1 ? e.preventDefault() : ''
    })
    input24.addEventListener('change', (e) => {
        const rTrim = parseInt(input21.value.trim())
        const gTrim = parseInt(input22.value.trim())
        const bTrim = parseInt(input23.value.trim())
        const aTrim = parseFloat(input24.value.trim())
        // If alpha > 1 then change alpha for value max 1
        aTrim > 1 ? input24.value = 1 : ''
        // If r g b are between 0 and 255, then change hexa color and preview color 
        rTrim >= 0 && gTrim >= 0 && bTrim >= 0 && rTrim <= 255 && gTrim <= 255 && bTrim <= 255
            ? input24.value.trim().length != 0
                ? ((input3.value = rgbHex(rTrim, gTrim, bTrim, aTrim)), //Hex valuedisplayExportColor
                    (divInput41.style.backgroundColor = '#' + input3.value)) //Preview color
                : ((input24.value = 1), //Alpha value
                    (input3.value = rgbHex(rTrim, gTrim, bTrim)), //Hex value
                    (divInput41.style.backgroundColor = input3.value)) //Preview color
            : ''
    })

    // hexa color bloc
    let divInput3 = document.createElement('div')
    divInput3.setAttribute('class', 'input--wrapper')
    divGroupInput.appendChild(divInput3)

    let label3 = document.createElement('label')
    label3.setAttribute('for', 'color__hexa' + index)
    label3.textContent = 'Hexa'
    divInput3.appendChild(label3)

    let input3 = document.createElement('input')
    input3.setAttribute('type', 'text')
    input3.setAttribute('id', 'color__hexa' + index)
    input3.setAttribute('name', 'color__hexa' + index)
    input3.addEventListener('keydown', (e) => {
        const allowedCharacters = 'abcdef0123456789#';
        const keyPressed = e.key.toLowerCase();
        (e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Backspace" || e.key === "Home" || e.key === "End" || e.key === "Enter" || e.key === "Tab") ? '' :
            allowedCharacters.indexOf(keyPressed) === -1 ? e.preventDefault() : ''
    })
    input3.addEventListener('change', (e) => {
        const hexTrim = e.target.value.trim()
        const hexSplit = hexTrim.split('#')[1]
        if(
            hexTrim.match(/^\s*#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{8})\b$/gm) || hexTrim.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{8})\b$/gm)
        ) {
            const rgbColor = hexSplit ? hexRgb(hexSplit) : hexRgb(hexTrim)
            //Path rgba color
            e.target.parentElement.previousSibling.children[0].children[1].value = rgbColor.red
            e.target.parentElement.previousSibling.children[1].children[1].value = rgbColor.green
            e.target.parentElement.previousSibling.children[2].children[1].value = rgbColor.blue
            e.target.parentElement.previousSibling.children[3].children[1].value = rgbColor.alpha

            //Path preview color
            e.target.parentElement.parentElement.children[3].children[0].style.backgroundColor = hexSplit ? '#' + hexSplit : '#' + hexTrim
        }
    })

    divInput3.appendChild(input3)

    // Preview
    let divInput4 = document.createElement('div')
    divInput4.setAttribute('class', 'preview--wrapper')
    divGroupInput.appendChild(divInput4)

    let divInput41 = document.createElement('div')
    divInput41.setAttribute('class', 'color-preview')
    divInput4.appendChild(divInput41)

    // Remove color bloc
    let divInput5 = document.createElement('div')
    divInput5.setAttribute('class', 'remove')
    divInput5.tabIndex = "0";
    divInput5.ariaHidden = false
    divInput5.ariaLabel = "Remove color"
    divGroupInput.appendChild(divInput5)

    let icon5 = document.createElement('i')
    icon5.setAttribute('class', 'fa-regular fa-circle-xmark')
    divInput5.appendChild(icon5)
    divInput5.addEventListener('click', (e) => {
        divGroupInput.remove()
    })
    divInput5.addEventListener('keydown', (e) => {
        e.key === "Enter" ? divGroupInput.remove() : ''
    })
    colorList.appendChild(divGroupInput)
}
