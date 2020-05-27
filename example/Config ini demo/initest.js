var fs = require('fs')
    , ini = require('ini')


let data = fs.readFileSync('./Game.ini', 'utf-8');
// data = data.replace(/OverrideNamedEngramEntries/igm, 'OverrideNamedEngramEntries[]');
var config = ini.parse(data)

// config.scope = 'local'
// config.database.database = 'use_another_database'
// config.paths.default.tmpdir = '/tmp'
// delete config.paths.default.datadir
// config.paths.default.array.push('fourth value')

// config['/script/shootergame'].shootergamemode.MaxTribeLogs = '110';

// let saveData = ini.stringify(config, { section: 'section' })

// saveData = saveData.replace(/OverrideNamedEngramEntries\[\]/igm, 'OverrideNamedEngramEntries');
// saveData = saveData.replace(/\\"/igm, '"');
// saveData = saveData.replace(/\"\(EngramClassName=/igm, '(EngramClassName=');
// saveData = saveData.replace(/RemoveEngramPreReq=False\)"/igm, 'RemoveEngramPreReq=False)');
// saveData = saveData.replace(/RemoveEngramPreReq=True\)"/igm, 'RemoveEngramPreReq=True)');

console.log(config)

// fs.writeFileSync('./GameUserSettings_modified.ini', saveData);


// let a = config['/Game/Mods/PrimitivePlusMod/GameMode_PrimitivePlus'].GameMode_PrimitivePlus_C.OverrideNamedEngramEntries;


// console.log(config)

// for (let v of a) {
//     // console.log(v)
// }