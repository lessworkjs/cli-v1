#!/usr/bin/env node

'use strict'

/**
 * adonis-cli
 *
 * @license MIT
 * @copyright AdonisJs - Harminder Virk <virk@adonisjs.com>
 */

const path = require('path')
const Ace = require('adonis-ace')
const fold = require('adonis-fold')
const packageFile = path.join(__dirname, '../package.json')

fold.Registrar
  .register(['adonis-ace/providers/CommandProvider'])
  .then(() => {
    Ace.register([
      require('./Commands/New')
    ])

    try {
      const command = process.argv[2]

      if (command != 'new') {
        return require(path.join(process.cwd(), 'work'));
      }

      Ace.invoke(require(packageFile))
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'MODULE_NOT_FOUND') {
        throw error
      }

      Ace.invoke(require(packageFile))
    }
  })