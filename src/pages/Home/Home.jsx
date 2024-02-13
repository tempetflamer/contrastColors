import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from '../../utils/GlobalContext.jsx'
import hexRgb from 'hex-rgb'
import rgbHex from 'rgb-hex'
import { rgb, hex } from 'wcag-contrast'
import './Home.scss'
import { tabToCanvas, tabToSVG, tabToPNG, tabToJPG } from '../../utils/utils.js'

export default function Home() {
  const { addColor, colors } = useGlobalState()
  const colorListRef = useRef()
  const [countColor, setCountColor] = useState(0)
  const [newinput, setNewInput] = useState(0)
  const [tabLoaded, setTabLoaded] = useState(0)
  const [displayExportsTable, setDisplayExportsTable] = useState(0)

  useEffect(() => {
    !colors.size ? setCountColor(0) : setCountColor(colors.size)
  }, [colors])

  function toggleTabLoaded() {
    setTabLoaded(!tabLoaded)
  }
  function toggleExportsTable() {
    setDisplayExportsTable(!displayExportsTable)
  }

  function colorComponent(index) {
    // return textbox
    const colorlist = colorListRef.current

    //Name color bloc
    let divGroupInput = document.createElement('div')
    divGroupInput.setAttribute('class', 'input-group--wrapper')

    let divInput1 = document.createElement('div')
    divInput1.setAttribute('class', 'input--wrapper')
    divGroupInput.appendChild(divInput1)

    let label1 = document.createElement('label')
    label1.setAttribute('class', 'color' + index)
    label1.textContent = 'Name'
    divInput1.appendChild(label1)

    let input1 = document.createElement('input')
    input1.setAttribute('type', 'text')
    input1.setAttribute('id', 'color' + index)
    input1.setAttribute('name', 'color' + index)
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
    label21.setAttribute('class', 'color' + index)
    label21.textContent = 'Red'
    divInput21.appendChild(label21)

    let input21 = document.createElement('input')
    input21.setAttribute('type', 'text')
    input21.setAttribute('id', 'color' + index)
    input21.setAttribute('name', 'color' + index)
    divInput21.appendChild(input21)
    input21.addEventListener('change', (e) => {
      const rTrim = parseInt(input21.value.trim())
      const gTrim = parseInt(input22.value.trim())
      const bTrim = parseInt(input23.value.trim())
      const aTrim = parseFloat(input24.value.trim())
      rTrim >= 0 && gTrim >= 0 && bTrim >= 0 && rTrim <= 255 && gTrim <= 255 && bTrim <= 255
        ? input24.value.trim().length != 0 /* aTrim.length === 1 || aTrim.length === 3 faudra faire un ptit regex*/
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
    label22.setAttribute('class', 'color' + index)
    label22.textContent = 'Green'
    divInput22.appendChild(label22)

    let input22 = document.createElement('input')
    input22.setAttribute('type', 'text')
    input22.setAttribute('id', 'color' + index)
    input22.setAttribute('name', 'color' + index)
    divInput22.appendChild(input22)
    input22.addEventListener('change', (e) => {
      const rTrim = parseInt(input21.value.trim())
      const gTrim = parseInt(input22.value.trim())
      const bTrim = parseInt(input23.value.trim())
      const aTrim = parseFloat(input24.value.trim())
      rTrim >= 0 && gTrim >= 0 && bTrim >= 0 && rTrim <= 255 && gTrim <= 255 && bTrim <= 255
        ? input24.value.trim().length != 0 /* aTrim.length === 1 || aTrim.length === 3 faudra faire un ptit regex*/
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
    label23.setAttribute('class', 'color' + index)
    label23.textContent = 'Blue'
    divInput23.appendChild(label23)

    let input23 = document.createElement('input')
    input23.setAttribute('type', 'text')
    input23.setAttribute('id', 'color' + index)
    input23.setAttribute('name', 'color' + index)
    divInput23.appendChild(input23)
    input23.addEventListener('change', (e) => {
      const rTrim = parseInt(input21.value.trim())
      const gTrim = parseInt(input22.value.trim())
      const bTrim = parseInt(input23.value.trim())
      const aTrim = parseFloat(input24.value.trim())
      rTrim >= 0 && gTrim >= 0 && bTrim >= 0 && rTrim <= 255 && gTrim <= 255 && bTrim <= 255
        ? input24.value.trim().length != 0 /* aTrim.length === 1 || aTrim.length === 3 faudra faire un ptit regex*/
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
    label24.setAttribute('class', 'color' + index)
    label24.textContent = 'Alpha'
    divInput24.appendChild(label24)

    let input24 = document.createElement('input')
    input24.setAttribute('type', 'text')
    input24.setAttribute('id', 'color' + index)
    input24.setAttribute('name', 'color' + index)
    divInput24.appendChild(input24)
    input24.addEventListener('change', (e) => {
      const rTrim = parseInt(input21.value.trim())
      const gTrim = parseInt(input22.value.trim())
      const bTrim = parseInt(input23.value.trim())
      const aTrim = parseFloat(input24.value.trim())
      rTrim >= 0 && gTrim >= 0 && bTrim >= 0 && rTrim <= 255 && gTrim <= 255 && bTrim <= 255
        ? input24.value.trim().length != 0 /* aTrim.length === 1 || aTrim.length === 3 faudra faire un ptit regex*/
          ? ((input3.value = rgbHex(rTrim, gTrim, bTrim, aTrim)), //Hex value
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
    label3.setAttribute('class', 'color' + index)
    label3.textContent = 'Hexa'
    divInput3.appendChild(label3)

    let input3 = document.createElement('input')
    input3.setAttribute('type', 'text')
    input3.setAttribute('id', 'color' + index)
    input3.setAttribute('name', 'color' + index)
    input3.addEventListener('change', (e) => {
      const hexTrim = e.target.value.trim()
      const hexSplit = hexTrim.split('#')[1]
      if (
        hexSplit
          ? hexSplit.length === 3 || hexSplit.length === 6 || hexSplit.length === 8
          : hexTrim.length === 3 || hexTrim.length === 6 || hexTrim.length === 8
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

    colorlist.appendChild(divGroupInput)
  }

  function addNewColor() {
    setNewInput(countColor)
    colorComponent(countColor + 1)
    !countColor ? setCountColor(1) : setCountColor(parseInt(countColor) + 1)
    console.log(document.querySelector('.table--wrapper'))
    console.log(document.querySelector('.table--wrapper').children)
    console.log(document.querySelector('.table--wrapper').children.length)
  }

  /**
   * Remove last color
   */
  function removeLastColor() {
    const select = document.getElementsByClassName('color-list')[0]
    select.removeChild(select.lastChild)
  }
  function resetColors() {
    const select = document.getElementsByClassName('color-list')[0]
    select.innerHTML = ''
  }

  function swapTable(e) {
    let tables = document.querySelectorAll('.table--wrapper table')
    let tabs = document.querySelectorAll('.tabs li')
    let legends = document.querySelectorAll('.legend div')
    let tableActif = document.querySelector('table.actif')
    let tabActif = document.querySelector('.tabs li.actif')
    let legendActif = document.querySelector('.legend div.actif')
    tableActif.removeAttribute('class', 'actif')
    tabActif.removeAttribute('class', 'actif')
    legendActif.removeAttribute('class', 'actif')
    e.target.childNodes[0].data === 'Matrice'
      ? (tables[0].setAttribute('class', 'actif'), tabs[0].setAttribute('class', 'actif'), legends[0].setAttribute('class', 'actif'))
      : ''
    e.target.childNodes[0].data === 'Grand textes'
      ? (tables[1].setAttribute('class', 'actif'), tabs[1].setAttribute('class', 'actif'), legends[1].setAttribute('class', 'actif'))
      : ''
    e.target.childNodes[0].data === 'Petits textes'
      ? (tables[2].setAttribute('class', 'actif'), tabs[2].setAttribute('class', 'actif'), legends[2].setAttribute('class', 'actif'))
      : ''
  }

  function refreshArrayContrast() {
    const tableWraper = document.querySelector('.table--wrapper')
    const allColors = document.querySelectorAll('.input-group--wrapper')

    //clear previous table before create it
    if (tableWraper.hasChildNodes()) {
      while (tableWraper.firstChild) {
        tableWraper.removeChild(tableWraper.firstChild)
      }
    }

    let table = document.createElement('table')
    let tableSmallText = document.createElement('table')
    let tableLargeText = document.createElement('table')
    //header
    let tr = document.createElement('tr')
    let trST = document.createElement('tr')
    let trLT = document.createElement('tr')
    //Common space between vertical and horizontal header, Empty space
    let th = document.createElement('th')
    let thST = document.createElement('th')
    let thLT = document.createElement('th')
    th.textContent = ''
    thST.textContent = ''
    thLT.textContent = ''
    tr.appendChild(th)
    trST.appendChild(thST)
    trLT.appendChild(thLT)

    allColors.forEach((color, index) => {
      let th = document.createElement('th')
      let thST = document.createElement('th')
      let thLT = document.createElement('th')
      let tableHeader = color.children[2].children[1].value.trim()
        ? color.children[2].children[1].value.trim()
        : color.children[2].children[1].value.includes('#')
        ? color.children[2].children[1].value
        : '#' + color.children[2].children[1].value
      th.textContent = tableHeader
      thST.textContent = tableHeader
      thLT.textContent = tableHeader
      tr.appendChild(th)
      trST.appendChild(thST)
      trLT.appendChild(thLT)
    })
    table.appendChild(tr)
    tableSmallText.appendChild(trST)
    tableLargeText.appendChild(trLT)
    //rows
    allColors.forEach((color, index) => {
      let tr = document.createElement('tr')
      let trST = document.createElement('tr')
      let trLT = document.createElement('tr')
      //Header Verticale
      let th = document.createElement('th')
      let thST = document.createElement('th')
      let thLT = document.createElement('th')
      let tableHeader = color.children[2].children[1].value.trim()
        ? color.children[2].children[1].value.trim()
        : color.children[2].children[1].value.includes('#')
        ? color.children[2].children[1].value
        : '#' + color.children[2].children[1].value
      th.textContent = tableHeader
      thST.textContent = tableHeader
      thLT.textContent = tableHeader
      tr.appendChild(th)
      trST.appendChild(thST)
      trLT.appendChild(thLT)

      allColors.forEach((val, i) => {
        let td = document.createElement('td')
        let tdST = document.createElement('td')
        let tdLT = document.createElement('td')
        let backgroundColor = color.children[2].children[1].value.includes('#')
          ? color.children[2].children[1].value
          : '#' + color.children[2].children[1].value
        td.style.backgroundColor = backgroundColor
        let textColor = val.children[2].children[1].value.includes('#') ? val.children[2].children[1].value : '#' + val.children[2].children[1].value //show contrast color beetween text color and background color
        td.style.color = textColor

        if (hex(textColor, backgroundColor) >= 4.5) {
          tdST.style.color = textColor
          tdST.style.backgroundColor = backgroundColor
          tdST.textContent = hex(backgroundColor, textColor).toFixed(2)
        }
        if (hex(textColor, backgroundColor) >= 3) {
          tdLT.style.color = textColor
          tdLT.style.backgroundColor = backgroundColor
          tdLT.textContent = hex(backgroundColor, textColor).toFixed(2)
        }

        td.textContent = hex(backgroundColor, textColor).toFixed(2)
        tr.appendChild(td)
        trST.appendChild(tdST)
        trLT.appendChild(tdLT)
      })
      table.appendChild(tr)
      //This change is made several times, need to be moved
      table.setAttribute('class', 'actif')
      document.querySelectorAll('.tabs li')[0].setAttribute('class', 'actif')
      document.querySelectorAll('.legend div')[0].setAttribute('class', 'actif')
      tableSmallText.appendChild(trST)
      tableLargeText.appendChild(trLT)
    })
    tableWraper ? tableWraper.appendChild(table) : ''
    tableWraper ? tableWraper.appendChild(tableLargeText) : ''
    tableWraper ? tableWraper.appendChild(tableSmallText) : ''
    //console.log('tabloaded', tabLoaded)
    // console.log(document.querySelector('.table--wrapper').children.length)
    document.querySelector('.table--wrapper').children.length === 3 && tabLoaded === 0 ? toggleTabLoaded() : ''
  }

  return (
    <>
      <div className="color-list" ref={colorListRef}>
        {colors.map((color, index) => (
          <div className="input-group--wrapper" key={'color' + index}>
            <div className="input--wrapper">
              <label htmlFor={'color' + index}>Name</label>
              <input type={'text'} id={'color' + index} name={'color' + index} value={color.name} />
            </div>
            <div className="hexa--wrapper">
              <div className="input--wrapper">
                <label htmlFor={'color' + index}>Red</label>
                <input type={'text'} id={'color' + index} name={'color' + index} value={color.hexa.r} />
              </div>
              <div className="input--wrapper">
                <label htmlFor={'color' + index}>Green</label>
                <input type={'text'} id={'color' + index} name={'color' + index} value={color.hexa.g} />
              </div>
              <div className="input--wrapper">
                <label htmlFor={'color' + index}>Blue</label>
                <input type={'text'} id={'color' + index} name={'color' + index} value={color.hexa.b} />
              </div>
              <div className="input--wrapper">
                <label htmlFor={'color' + index}>Alpha</label>
                <input type={'text'} id={'color' + index} name={'color' + index} value={color.hexa.a} />
              </div>
            </div>
            <div className="input--wrapper">
              <label htmlFor={'color' + index}>Hexa</label>
              <input type={'text'} id={'color' + index} name={'color' + index} value={color.hexa} />
            </div>
            <div className="preview--wrapper">
              <div className="color-preview" style={'background-color:' + color.hexa + ';'}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <button className="addColor" onClick={addNewColor}>
          Add a new color
        </button>
        <button className="deleteColor" onClick={removeLastColor}>
          Remove last color
        </button>
        <button className="deleteAllColor" onClick={resetColors}>
          Reset
        </button>
        <br />

        <button className="refreshTable" onClick={refreshArrayContrast}>
          Refresh tableau de contraste
        </button>
      </div>

      <ul className="tabs">
        <li onClick={swapTable}>Matrice</li>
        <li onClick={swapTable}>Grand textes</li>
        <li onClick={swapTable}>Petits textes</li>
      </ul>
      <div className="table--wrapper"></div>

      {tabLoaded ? (
        <>
          <div className="table__export--wrapper">
            <button onClick={toggleExportsTable} className={displayExportsTable ? 'active' : ''} /*onClick={tabToCanvas}*/>
              Exporter tableau
            </button>
            {displayExportsTable ? (
              <div>
                <div role="button" onClick={tabToCanvas}>
                  Exporter vers Canva
                </div>
                <div role="button" onClick={tabToJPG}>
                  Exporter vers JPG
                </div>
                <div role="button" onClick={tabToPNG}>
                  Exporter vers PNG
                </div>
                <div role="button" onClick={tabToSVG}>
                  Exporter vers SVG
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="export__canvas--wrapper">
            <p>
              <i>{"Clique droit ➔ enregistrer l'image sous"}</i>
              {" pour copier l'image"}
            </p>
          </div>
        </>
      ) : (
        ''
      )}

      <div className="legend--wrapper">
        <div className="legend">
          <div>Tous les ratios de contraste </div>
          <div>
            Le ratio de contraste pour les grands textes doit être supérieur ou égal à 3.
            <br />
            <br /> <b>Un grand texte est :</b>
            <br />
            - Un texte non gras supérieur ou égal à 18pt.
            <br />- Un texte en gras supérieur ou égal à 14pt.
          </div>
          <div>
            Le ratio de contraste pour les petits textes doit être supérieur ou égal à 4,5.
            <br />
            <br />
            <b>Un petit texte est :</b>
            <br />
            - Un texte non gras inférieur à 18pt.
            <br />- Un texte en gras inférieur à 14pt.
          </div>
        </div>
      </div>
    </>
  )
}

Home.propTypes = {}
