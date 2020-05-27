const ArkFiles = require('ark-files');

let arkFiles = new ArkFiles('');

let players = arkFiles.getPlayers();

/**
* Players structure:
* [{
* Tribe: Tribe|false,
* PlayerName: string,
* Level: Number,
* TotalEngramPoints: Number,
* CharacterName: string,
* TribeId: Number|false,
* SteamId: Number,
* PlayerId: Number,
* FileCreated: string,
* FileUpdated: string
* }]
*/

let tribes = arkFiles.getTribes();

/**
* Tribes structure:
* [{
* Players: Players[],
* Name: string,
* OwnerId: Number,
* Id: Number,
* TribeLogs: string[],
* TribeMemberNames: string[],
* FileCreated: string,
* FileUpdated: string
* }]
*/

console.log(players);

console.log('=================================')


console.log(tribes);