import html2canvas from 'html2canvas'

function removeCanva() {
    const canvas = document.querySelectorAll('canvas')
    canvas.forEach((canva) => canva.remove());
}
export function tabToCanvas() {
    removeCanva()
    const canva = document.querySelector('.export__canvas--wrapper')
    canva.classList.contains('actif') ? '' : canva.classList.add('actif');
    html2canvas(document.querySelector('table.actif')).then(canvas => {
        canva.appendChild(canvas)
    });
}
