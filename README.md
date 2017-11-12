- Tietokannan asetukset config.php tiedostossa
- Tietokannan sql db/database.sql
- Tietokanta pitää olla olemassa ennen käyttöä

## Runner Game
- DB settings in `config.php`
- DB must be manually created. SQL file at `db/database.sql`
- Jump with up arrow
- Crouch with down arrow
- Cruoching while in air or jumping when on cruoching position is not advised, as it may lead to bad scores =)


## Phaser development

Use rollup to bundle js files
 - Install rollup with npm `npm install -g rollup`
 - run rollup `rollup index.js --output.format umd --name "runnerbundle" --output.file runner.js` inside runner folder
