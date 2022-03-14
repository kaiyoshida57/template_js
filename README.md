# Overview
* template_js
* url:
* JavaScript template.

# Specifications
Pug,Sass,babel,Webpack,ESLint,Prettier

# Usage
npm install

## Start watch and compile
npx gulp

# Requirement version
* node v12.13.1
* gulp v3.9.1 or 4.0.2

## Sass Package
node sass

# Other
* git commit時のフックで、prettierがJSファイルを対象に動きます。
* webp画像は、jpg,pngを対象にhtaccessで一括で読み込ませます。
* 命名規則は、BEMを基本にしていますが、単語同士の「ハイフンつなぎ」を「キャメルクラス」に変更しています。
* BEM設計に基づき、コンポーネントごとにSCSSファイルを分けています。
`block__element--modifier 例: card__title--sub`
