import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { hex } from 'wcag-contrast'
import { useLanguageState } from '../../context/LanguageContext'
import { colorsToJPG, colorsToPNG, tabToCanvas, tabToJPG, tabToPNG, tabToSVG, toCsv, toJson } from '../../utils/utils.js'
import colorComponent from '../../utils/colorFactory.js'
import './Home.scss'
import { Helmet } from 'react-helmet-async'

import { en, fr } from '../../data/data.js'
import FRImage from '../../assets/img/fr-flag.svg'
import ENImage from '../../assets/img/en-flag.svg'

library.add(faCircleXmark)
dom.watch()

export default function Home() {
  const { data, setData, setLanguage, language } = useLanguageState()

  const colorListRef = useRef()
  const colorErrorMessageRef = useRef()
  const [countColor, setCountColor] = useState(0)
  const [colorLoaded, setColorLoaded] = useState(0)
  const [tabLoaded, setTabLoaded] = useState(false)
  const [dropActive, setDropActive] = useState(false)
  const [displayExportsTable, setDisplayExportsTable] = useState(0)
  const [displayExportColor, setDisplayExportColor] = useState(0)

  /**
   * Check if colorListRef contains at least one element before setting setColorLoaded to true.
   */
  useEffect(() => {
    colorListRef.current.childElementCount === 0 ? setColorLoaded(0) : setColorLoaded(1)
  }, [colorListRef.current?.childElementCount])

  /**
   * Checks if colorListRef contains at least 1 element by verifying if colorLoaded is true.
   * Loops through the children of colorListRef and checks if the displayed text on the label's name of the first element is correct.
   * If it's correct, do nothing; otherwise, change it to the one in the current language.
   */
  useEffect(() => {
    if (colorLoaded) {
      for (let i = 0; i < colorListRef.current.children.length; i++) {
        const child = colorListRef.current.children[i]
        child.children[0].children[0].textContent === data.factory.name
          ? ''
          : ((child.children[0].children[0].textContent = data.factory.name),
            (child.children[1].children[0].children[0].textContent = data.factory.color_r),
            (child.children[1].children[1].children[0].textContent = data.factory.color_g),
            (child.children[1].children[2].children[0].textContent = data.factory.color_b))
      }
    }
  }, [language])

  function toggleTabLoaded() {
    setTabLoaded(!tabLoaded)
  }
  function toggleExportsTable() {
    setDisplayExportsTable(!displayExportsTable)
  }
  function toggleExportsColor() {
    setDisplayExportColor(!displayExportColor)
  }
  /**
   * Change webapp language with languageContext
   * ex: en for English and fr for French
   */
  function toggleLanguage() {
    language === 'fr'
      ? (setLanguage('en'), setData(en), document.documentElement.setAttribute('lang', 'en'))
      : (setLanguage('fr'), setData(fr), document.documentElement.setAttribute('lang', 'fr'))
  }

  //Dropzone
  const onDragEnter = (e) => {
    e.preventDefault()
    setDropActive(true)
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setDropActive(false)
  }

  const onDrop = (e) => {
    e.preventDefault()
    importJson(e.dataTransfer)
    setDropActive(false)
  }

  const onChange = (e) => {
    e.preventDefault()
    importJson(e.target)
    //clear Filelist after import
    e.target.value = ''
  }

  function addNewColor() {
    colorComponent(parseInt(countColor) + 1, colorListRef.current, data)
    setCountColor(parseInt(countColor) + 1)
  }

  /**
   * Simulate click on hidden input button
   */
  function clickInputImport() {
    //replace by handleClick
    let uploadedfile = document.getElementById('jsonfile')
    uploadedfile.click()
  }
  /**
   * Import Data Json who was exported before to load them
   * @param {*} file - file from input onDrop or onChange
   */
  async function importJson(file) {
    //replace ImportJson by handleFileChange
    if (file.files.length === 1) {
      // Reset error message value to 0
      colorErrorMessageRef.current.textContent = ''
      if (file.files[0].name.toLowerCase().endsWith('.json')) {
        resetColors()
        const reader = new FileReader()

        reader.onload = async (e) => {
          try {
            const text = e.target.result
            let json = JSON.parse(text)

            json.colors.forEach((color) => {
              addNewColor()
              const colorList = document.querySelector('.color__list')
              colorList.lastChild.children[0].children[1].value = color.name
              colorList.lastChild.children[1].children[0].children[1].value = color.rgba.r
              colorList.lastChild.children[1].children[1].children[1].value = color.rgba.g
              colorList.lastChild.children[1].children[2].children[1].value = color.rgba.b
              colorList.lastChild.children[1].children[3].children[1].value = color.rgba.a
              colorList.lastChild.children[2].children[1].value = color.hexa
              colorList.lastChild.children[3].children[0].style.backgroundColor =
                color.rgba.a === '1'
                  ? `rgb(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b})`
                  : `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`
            })
            // Set colorLoaded as true
            //setColorLoaded(!colorLoaded) //marche pas probablement a cause du async, need to //faire en sorte de changer cet état si le message d'erreur n'apparait pas
          } catch (err) {
            //EN - Error, incorrect json file structure
            colorErrorMessageRef.current.textContent = 'Erreur, structure du fichier json incorrect'
          }
        }

        reader.readAsText(file.files[0])
      } else {
        //EN - Error, loaded file is not a Json file
        colorErrorMessageRef.current.textContent = "Erreur, le fichier chargé n'est pas un fichier Json"
      }
    }
  }
  /**
   * Reset all Color and table displayed
   */
  function resetColors() {
    const select = document.getElementsByClassName('color__list')[0]
    select.innerHTML = ''
    // Set colorLoaded as false //set countColor to 0
    setColorLoaded(!colorLoaded)
    setCountColor(0)

    //clear previous table before create it
    const tableWraper = document.querySelector('.matrix__table--wrapper')
    if (tableWraper.hasChildNodes()) {
      while (tableWraper.firstChild) {
        tableWraper.removeChild(tableWraper.firstChild)
      }
    }
    //Hide table, tabs and legends
    toggleTabLoaded()
    const activetab = document.querySelector('.matrix__tabs li.actif')
    const activeMatrix = document.querySelector('.matrix__legend div.actif')
    activetab !== null ? activetab.removeAttribute('class', 'actif') : ''
    activeMatrix !== null ? activeMatrix.removeAttribute('class', 'actif') : ''
  }

  /**
   * Change between Matrice for all text, for Large text and for Small text
   * The change will affect table, tab, and  legend
   * @param {Event} e - Event Object
   */
  function swapTable(e) {
    let tables = document.querySelectorAll('.matrix__table--wrapper table')
    let tabs = document.querySelectorAll('.matrix__tabs li')
    let legends = document.querySelectorAll('.matrix__legend div')
    let tableActif = document.querySelector('table.actif')
    let tabActif = document.querySelector('.matrix__tabs li.actif')
    let legendActif = document.querySelector('.matrix__legend div.actif')
    tableActif.removeAttribute('class', 'actif')
    tabActif.removeAttribute('class', 'actif')
    legendActif.removeAttribute('class', 'actif')
    e.target.childNodes[0].data === 'Matrice' || e.target.childNodes[0].data === 'Matrix'
      ? (tables[0].setAttribute('class', 'actif'), tabs[0].setAttribute('class', 'actif'), legends[0].setAttribute('class', 'actif'))
      : ''
    e.target.childNodes[0].data === 'Grand textes' || e.target.childNodes[0].data === 'Large Texts'
      ? (tables[1].setAttribute('class', 'actif'), tabs[1].setAttribute('class', 'actif'), legends[1].setAttribute('class', 'actif'))
      : ''
    e.target.childNodes[0].data === 'Petits textes' || e.target.childNodes[0].data === 'Small Texts'
      ? (tables[2].setAttribute('class', 'actif'), tabs[2].setAttribute('class', 'actif'), legends[2].setAttribute('class', 'actif'))
      : ''
  }

  /**
   * Create the contrast table for all text, large text and small text,
   * Manages deletion of previous table, display of table if conditions are fulfilled, change state tabLoaded
   */
  function refreshArrayContrast() {
    if (colorListRef.current.children.length > 1) {
      const tableWraper = document.querySelector('.matrix__table--wrapper')
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
        //BackgoundColor take color when textcolor is white or black, depending on ratio
        let backgroundColor = color.children[2].children[1].value.includes('#')
          ? color.children[2].children[1].value
          : '#' + color.children[2].children[1].value
        th.style.backgroundColor = backgroundColor
        th.style.color = hex(backgroundColor, '#fff') > hex(backgroundColor, '#000') ? '#fff' : '000'
        thST.style.backgroundColor = backgroundColor
        thST.style.color = hex(backgroundColor, '#fff') > hex(backgroundColor, '#000') ? '#fff' : '000'
        thLT.style.backgroundColor = backgroundColor
        thLT.style.color = hex(backgroundColor, '#fff') > hex(backgroundColor, '#000') ? '#fff' : '000'

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
        let backgroundColor = color.children[2].children[1].value.includes('#')
          ? color.children[2].children[1].value
          : '#' + color.children[2].children[1].value
        th.style.backgroundColor = backgroundColor
        th.style.color = hex(backgroundColor, '#fff') > hex(backgroundColor, '#000') ? '#fff' : '000'
        thST.style.backgroundColor = backgroundColor
        thST.style.color = hex(backgroundColor, '#fff') > hex(backgroundColor, '#000') ? '#fff' : '000'
        thLT.style.backgroundColor = backgroundColor
        thLT.style.color = hex(backgroundColor, '#fff') > hex(backgroundColor, '#000') ? '#fff' : '000'

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
          let textColor = val.children[2].children[1].value.includes('#')
            ? val.children[2].children[1].value
            : '#' + val.children[2].children[1].value //show contrast color beetween text color and background color
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
        tableSmallText.appendChild(trST)
        tableLargeText.appendChild(trLT)
      })
      tableWraper ? tableWraper.appendChild(table) : ''
      tableWraper ? tableWraper.appendChild(tableLargeText) : ''
      tableWraper ? tableWraper.appendChild(tableSmallText) : ''

      if (document.querySelector('.matrix__table--wrapper').children.length === 3 && document.querySelector('.color__list').children.length > 0) {
        table.setAttribute('class', 'actif')
        document.querySelectorAll('.matrix__tabs li')[0].setAttribute('class', 'actif')
        document.querySelectorAll('.matrix__legend div')[0].setAttribute('class', 'actif')

        tabLoaded === false ? toggleTabLoaded() : ''
      }
    }
  }

  return (
    <>
      <Helmet>
        {/* language === 'fr' ? setLanguage('en') : setLanguage('fr') */}

        <title>{data.head.title}</title>
        <meta name="description" content={data.head.meta_description} />
      </Helmet>
      <header className="lan">
        {language === 'en' ? (
          <div className="en">
            <img src={ENImage} tabIndex="0" alt="English flag" aria-label="Switch language to French" onClick={toggleLanguage} />
          </div>
        ) : (
          <div className="fr">
            <img src={FRImage} tabIndex="0" alt="Drapeau français" aria-label="Changer la langue vers l'anglais" onClick={toggleLanguage} />
          </div>
        )}
      </header>
      <h1>{data.h1}</h1>
      <section className="color">
        <h2>{data.color.h2}</h2>
        <div className="color__list" ref={colorListRef}></div>

        <div className="color__controls">
          <button className="color__controls__add" onClick={addNewColor}>
            <b>{data.color.add}</b>
          </button>
          <button className="color__controls__reset" onClick={resetColors}>
            <b>{data.color.reset}</b>
          </button>
        </div>
        <br />
        {colorLoaded === 0 ? (
          <>
            <input type="file" accept=".json" id="jsonfile" hidden="hidden" onChange={onChange} />
            <button
              className={`color__import ${dropActive ? 'drop-active' : ''}`}
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={clickInputImport}
            >
              <FontAwesomeIcon icon={faFileImport} /> {data.color.import}
            </button>
            <div className="color__error-message" ref={colorErrorMessageRef}></div>
          </>
        ) : (
          <div className="color__export--wrapper">
            <button onClick={toggleExportsColor} className={`color__export${displayExportColor ? ' active' : ''}`}>
              {data.color.export}
            </button>
            {displayExportColor ? (
              <div className="color__export__options">
                <div role="button" onClick={toJson} tabIndex={0}>
                  {data.color.export__options.json}
                </div>
                <div role="button" onClick={toCsv} tabIndex={0}>
                  {data.color.export__options.csv}
                </div>
                <div role="button" onClick={colorsToPNG} tabIndex={0}>
                  {data.color.export__options.png}
                </div>
                <div role="button" onClick={colorsToJPG} tabIndex={0}>
                  {data.color.export__options.jpg}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </section>

      <div className="controls">
        <button className="refresh-table" onClick={refreshArrayContrast}>
          {data.controls.refresh}
        </button>
      </div>
      <section className="matrix">
        {tabLoaded ? <h2>{data.matrix.h2}</h2> : ''}

        <ul className={tabLoaded ? 'matrix__tabs' : 'matrix__tabs hidden'}>
          <li onClick={swapTable}>{data.matrix.tab1}</li>
          <li onClick={swapTable}>{data.matrix.tab2}</li>
          <li onClick={swapTable}>{data.matrix.tab3}</li>
        </ul>

        <div className="matrix__table--wrapper"></div>

        {tabLoaded ? (
          <>
            <div className="matrix__table__export--wrapper">
              <button onClick={toggleExportsTable} className={displayExportsTable ? 'active' : ''}>
                {data.matrix.export}
              </button>
              {displayExportsTable ? (
                <div className="matrix__table__export__options">
                  <div role="button" onClick={tabToCanvas}>
                    {data.matrix.export__options.canva}
                  </div>
                  <div role="button" onClick={tabToJPG}>
                    {data.matrix.export__options.jpg}
                  </div>
                  <div role="button" onClick={tabToPNG}>
                    {data.matrix.export__options.png}
                  </div>
                  <div role="button" onClick={tabToSVG}>
                    {data.matrix.export__options.svg}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.export__canva }} className="matrix__export__canvas--wrapper"></div>
          </>
        ) : (
          ''
        )}

        <div className="matrix__legend--wrapper">
          <div className="matrix__legend">
            <div dangerouslySetInnerHTML={{ __html: data.legend.l1 }}></div>
            <div dangerouslySetInnerHTML={{ __html: data.legend.l2 }}></div>
            <div dangerouslySetInnerHTML={{ __html: data.legend.l3 }}></div>
          </div>
        </div>
      </section>

      <div className="footer"></div>
    </>
  )
}
