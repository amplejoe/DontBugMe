:: install typescript with node.js: npm install -g typescript
:: then compile/translate with tsc:
call tsc ts\app.ts -outDir js
copy tools\crypto-js\crypto-js.js js
