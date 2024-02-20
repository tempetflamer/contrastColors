import { toCanvas, toJpeg, toPng, toSvg } from 'html-to-image';
import csvDownload from 'json-to-csv-export';


/**
 * Remove all existing canvas before being called to created a new one
 */
function removeCanva() {
    const canvas = document.querySelectorAll('canvas')
    canvas.forEach((canva) => canva.remove());
}

/**
 * Create a canva of HTML <table> element selected (actif)
 */
export function tabToCanvas() {
    removeCanva()
    const canva = document.querySelector('.matrix__export__canvas--wrapper')
    canva.classList.remove
    canva.classList.contains('actif') ? '' : canva.classList.add('actif');
    toCanvas(document.querySelector('table.actif')).then(canvas => {
        canva.appendChild(canvas)
    });
}

/**
 * Export table to SVG 
 */
export function tabToSVG() {
    toSvg(document.querySelector('table.actif'))
        .then(function (dataUrl) {
            const link = document.createElement('a')
            link.download = 'table.svg'
            link.href = dataUrl
            link.click()
        });
}

/**
 * Export table to PNG image
 */
export function tabToPNG() {
    toPng(document.querySelector('table.actif'), { cacheBust: true, })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'table.png'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => {
            console.log(err)
        })
}

/**
 * Export colors to PNG image
 */
export function colorsToPNG() {
    const removeIcons = document.querySelectorAll('.remove')
    removeIcons.forEach(icon => {
        icon.classList.add('hidden')
    });
    toPng(document.querySelector('.color__list'), { cacheBust: true })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'colors.png'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => {
            console.log(err)
        })
    removeIcons.forEach(icon => {
        icon.classList.remove('hidden')
    });
}


/**
 * Export table to JPG image
 */
export function tabToJPG() {
    toJpeg(document.querySelector('table.actif'), { cacheBust: true, })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'table.jpg'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => {
            console.log(err)
        })
}

/**
 * Export colors to JPG image
 */
export function colorsToJPG() {
    const removeIcons = document.querySelectorAll('.remove')
    removeIcons.forEach(icon => {
        icon.classList.add('hidden')
    });
    toJpeg(document.querySelector('.color__list'), { cacheBust: true, backgroundColor: 'white' })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'colors.jpg'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => {
            console.log(err)
        })
    removeIcons.forEach(icon => {
        icon.classList.remove('hidden')
    });
}

//

/**
 * Export colors to Json
 */
export function toJson() {
    const allColors = document.querySelectorAll('.input-group--wrapper')
    let jsonArray = []

    allColors.forEach((color, index) => {
        let colorName = color.children[0].children[1].value
        let colorR = color.children[1].children[0].children[1].value
        let colorG = color.children[1].children[1].children[1].value
        let colorB = color.children[1].children[2].children[1].value
        let colorA = color.children[1].children[3].children[1].value
        let colorHexa = color.children[2].children[1].value
        let json = { name: colorName, rgba: { r: colorR, g: colorG, b: colorB, a: colorA }, hexa: colorHexa }
        jsonArray.push(json)
    })
    let jsonConv = { colors: jsonArray }
    const a = document.createElement('a')
    const file = new Blob([JSON.stringify(jsonConv)], { type: 'text/plain' })
    a.href = URL.createObjectURL(file)
    a.download = 'contrastColorData.json'
    a.click()
}

/**
 * Export Colors to CSV
 */
export function toCsv() {
    const allColors = document.querySelectorAll('.input-group--wrapper')
    let jsonArray = []

    allColors.forEach((color, index) => {
        let colorName = color.children[0].children[1].value
        let colorR = color.children[1].children[0].children[1].value
        let colorG = color.children[1].children[1].children[1].value
        let colorB = color.children[1].children[2].children[1].value
        let colorA = color.children[1].children[3].children[1].value
        let colorHexa = color.children[2].children[1].value
        let json = { name: colorName, rgba: `${colorR},${colorG},${colorB},${colorA}`, hexa: colorHexa }
        jsonArray.push(json)
    })

    const dataToConvert = {
        data: jsonArray,
        filename: 'contrastColorData',
        delimiter: ';',
        headers: ['Name', "RGBA", "Hexa"]
    }

    const a = document.createElement('a')
    a.download = 'contrastColorData.csv'
    a.onclick = () => csvDownload(dataToConvert)
    a.click()

}
