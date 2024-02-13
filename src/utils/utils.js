import html2canvas from 'html2canvas'
import { elementToSVG, formatXML } from 'dom-to-svg'
import { toPng, toJpeg, toBlob, toPixelData, toSvg, toCanvas } from 'html-to-image';
import * as saveSvgAsPng from "save-svg-as-png";

function removeCanva() {
    const canvas = document.querySelectorAll('canvas')
    canvas.forEach((canva) => canva.remove());
}

export function tabToCanvas() {
    removeCanva()
    const canva = document.querySelector('.export__canvas--wrapper')
    canva.classList.contains('actif') ? '' : canva.classList.add('actif');
    toCanvas(document.querySelector('table.actif')).then(canvas => {
        canva.appendChild(canvas)
    });
}

function filter(node) {
    return (node.tagName !== 'i');
}
export function tabToSVG() {
    toSvg(document.querySelector('table.actif'), { filter: filter })
        .then(function (dataUrl) {
            let svg = decodeURIComponent(dataUrl.split(',')[1])
            document.querySelector('.export__canvas--wrapper').innerHTML = svg

            const element = document.querySelector('.export__canvas--wrapper svg');
            const filename = "table.svg";
            saveSvgAsPng.saveSvg(element, filename);
        });
}

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
