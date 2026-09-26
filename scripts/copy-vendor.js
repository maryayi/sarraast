// GitHub Pages serves this branch as-is (no build step), so the front-end
// files the pages need are copied from node_modules into the committed vendor/ folder.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const vendor = path.join(root, 'vendor');

const files = {
  'bootstrap/dist/css/bootstrap.min.css': 'bootstrap/css/bootstrap.min.css',
  'bootstrap/dist/css/bootstrap.min.css.map': 'bootstrap/css/bootstrap.min.css.map',
  'bootstrap/dist/fonts': 'bootstrap/fonts',
  'bootstrap-rtl/dist/css/bootstrap-rtl.min.css': 'bootstrap-rtl/css/bootstrap-rtl.min.css',
  'jquery/dist/jquery.min.js': 'jquery/jquery.min.js',
};

fs.rmSync(vendor, { recursive: true, force: true });
for (const [from, to] of Object.entries(files)) {
  fs.cpSync(path.join(root, 'node_modules', from), path.join(vendor, to), { recursive: true });
}
console.log('Copied vendor files to ' + path.relative(process.cwd(), vendor) + '/');
