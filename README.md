# Cee-render
[![Build Status](https://travis-ci.org/alejandrofdiaz/cee-render.svg?branch=master)](https://travis-ci.org/alejandrofdiaz/cee-render)

[![npm version](https://badge.fury.io/js/cee-render.svg)](https://badge.fury.io/js/cee-render)

[![NPM](https://nodei.co/npm/cee-render.png)](https://nodei.co/npm/cee-render/)

## Description

Utility to render CEE ([Wtf is this?](https://www.certicalia.com/que-es-un-certificado-energetico)) document due to XML exported from CE3X.

It will appear something like this:

![CEE Label](http://www.minetad.gob.es/energia/desarrollo/EficienciaEnergetica/CertificacionEnergetica/PublishingImages/Etiqueta_eficiencia_energetica.jpg)

## Installation

```bash
npm i --save cee-render
```

## Features

### Etiqueta CEE a Pdf
#### From XML Filepath
```typescript
import { getPDFFromXml } from 'cee-render';

/**
 * Method that build PDF retrieved to user from
 * data in a XML. All params are absolute paths.
 *
 * @name getPDFFromXml
 * @param {string} xmlPath
 * @param {string} pdfDest
 * @param {string} numReferencia
 * @returns {string} path where to get the pdf built to send it to user
 * default filename ${numReferencia}.pdf
 */

const xmlPath = 'path/to/input/xml/file.xml';
const pdfDest = 'output/path';
const numReferencia = '00000011110000';

console.log(getPDFFromXml(xmlPath, pdfDest, numReferencia));
//'output/path/00000011110000.xml'
```

#### From XML string

```typescript
import { getPDFFromXmlString } from 'cee-render';

/**
 * Method that build PDF retrieved to user from
 * data in a string. All params are absolute paths.
 *
 * @name getPDFFromXmlString
 * @param {string} xmlString
 * @param {string} pdfDest
 * @param {string} numReferencia
 * @returns {string} path where to get the pdf built to send it to user
 * default filename ${numReferencia}.pdf
 */

const xmlString = '<xml>...</xml>';
const pdfDest = 'output/path';
const numReferencia = '00000011110000';

console.log(getPDFFromXmlString(xmlPath, pdfDest, numReferencia));
//'output/path/00000011110000.xml'
```

### Etiqueta CEE a HTML

Devuelve un html totalmente estático (fuentes e imágenes embebidas). Es útil para servir
una versión online del documento. Está optimizado y probado en Chrome.

```typescript
import { getHtmlFromXmlString } from 'cee-render';

/**
 * @description Renders HTML from xml data
 * 
 * @name getHtmlFromXmlString
 * @param {string} xmlString
 * @param {string} numReferencia
 * @returns {string} Html rendered with style
 */

const xmlString = '<xml>...</xml>';
const pdfDest = 'output/path';
const numReferencia = '00000011110000';

console.log(getHtmlFromXmlString(xmlPath, pdfDest, numReferencia));
`<html> 
    <head>...</head>
    <body>...</body>
</html>`
```

## Stack

* Node 8
* Typescript
* ES6
* [Puppeteer](https://github.com/GoogleChrome/puppeteer)
* Sass
* Postcss + CSS Next
* Babel
* Jest
* Gulp
* TSlint
* Express (developing purposes)
* Handlebars
* [xml-js](https://github.com/nashwaan/xml-js)

## Scripts

### Test

```bash
npm run test
```

```bash
npm run test:watch
```

_Atención_ este comando sólo funciona si el proyecto está trackeado con GIT.

### Build

```bash
npm run build
```

### Build + Publish

```bash
npm run publish:server
```
