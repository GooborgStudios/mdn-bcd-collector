// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable require-jsdoc */

'use strict';

const fs = require('fs-extra');
const path = require('path');

const reports = require('./reffy-reports');

const generatedDir = path.join(__dirname, 'generated');

function writeText(filename, content) {
  if (Array.isArray(content)) {
    content = content.join('\n');
  }
  content = content.trimEnd() + '\n';
  fs.ensureDirSync(path.dirname(filename));
  fs.writeFileSync(filename, content, 'utf8');
}

function buildCSS() {
  const propertySet = new Set;

  for (const data of Object.values(reports.css)) {
    for (const prop of Object.keys(data.properties)) {
      propertySet.add(prop);
    }
  }

  const propertyNames = Array.from(propertySet);
  propertyNames.sort();

  const lines = [
    '<!DOCTYPE html>',
    '<script src="/resources/harness.js"></script>',
    '<script>',
  ];
  for (const name of propertyNames) {
    lines.push(`t.report("${name}", CSS.supports("${name}", "initial"));`);
  }
  lines.push('t.done();', '</script>');
  const filename = path.join(generatedDir, 'css', 'properties',
      'dot-supports.html');
  writeText(filename, lines);
}

buildCSS();
