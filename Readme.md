
# MUD Client for Programmers

**Disclaimer. This is a game-related toy.** 

Hi guys. In old times I used Tintin++ or JMC to play [MUDs](https://en.wikipedia.org/wiki/MUD). 

This MUD client is made for powerful javascript-scripting. Orginally for ROM-based MUDs (Solace, CarrionFields and others),
but can be adjusted to run on other muds as well.

1. Automatic practicing of skills/spells.
2. Auto actions during the battle (like kick every round).
3. Auto eating/drinking.
4. Autogrowing (killing all mobs in a certain area).
5. Notifying at OS-level about incoming tells (useful when a char is growing while you're doing smth else).
5. Watching a group in battle to heal the most wounded one (handy for priests).
6. Commands to check affects and spellup the missing benedictions (can't miss anything)
7. Multicharing with ease (traveling as a group of 8 to harsh areas, using IPC server to send commands).

...Speedwalks and more, any helpful behavior can be scripted with JS.

I wrote this in the memory of old MUDs:

- Solace MUD which I played so long ago.
- Dawn of Eternity (offline) where I learned English while creating Areas (nice ones, let me know if any other MUD wants them).

It can be used as a replacement of telnet or as a base of AI or toying with scripts, cause JavaScript is nice for it.

## Usage

- Copy `config/example.js` to `config/index.js` and place your char name and password there.
- Then `node index.js CHAR_NAME` connects that character.
- Use `#prompt` command to setup the right prompt (for auto-reading stats by the scripts)

Please be informed that current phrases are hardcoded for Solace MUD. 

You'll need to modify them for other MUDs. 
