# Rocket Config
[![NPM](https://www.npmjs.com/package/rocket-config.png?downloads=true&stars=true)](https://www.npmjs.com/package/rocket-config)

## Description

Node JS module to retrieve and process JSON config files.

### Installation

	npm install rocket-config

# Usage
This example loads and processes all of the JSON files in the ./config folder.

Giving that config.json contains the following data.
```json
{
    "Rebels": {
        "Skywalker": [
            {
                "name": "Luke",
                "roles": ["Pilot", "Jedi Knight"],
                "ship": "T-65B X-wing starfighter"
            }
        ],
        "Solo": [
            {
                "name": "Leia",
                "roles": ["General", "Resistance Leader"]
            },
            {
                "name": "Han",
                "roles": ["Smuggler", "Scoundrel", "Captain"],
                "ship": "Corellian YT-1300f light freighter (Millennium Falcon)",
                "bestFriend": "Chewbacca"
            },
            {
                "name": "Ben",
                "aka": "Kylo Ren",
                "roles": ["Commander", "Knight of Ren"]
            }
        ]
    },
    "Empire": {
        "Skywalker": [
            {
                "name": "Anakin",
                "aka": "Darth Vader",
                "roles": ["Sith Lord", "Galactic Jerk"],
                "ship": "TIE Advanced x1"
            }
        ],
        "Tarkin": [
            {
                "name": "Wilhuff",
                "roles": ["General"]
            }
        ]
    }
}
```
In order to access the Solo family data.
```js
	var rocketConfig = require('rocket-config')('./config'),
		soloFamily = rocketConfig.config.Rebels.Solo;

	/**
		The variable "soloFamily" contains an array of the Solo family data.
		[
            {
                "name": "Leia",
                "roles": ["General", "Resistance Leader"]
            },
            {
                "name": "Han",
                "roles": ["Smuggler", "Scoundrel", "Captain"],
                "ship": "Corellian YT-1300f light freighter (Millennium Falcon)",
                "bestFriend": "Chewbacca"
            },
            {
                "name": "Ben",
                "aka": "Kylo Ren",
                "roles": ["Commander", "Knight of Ren"]
            }
        ]
	**/
```

"rocketConfig" is the data processor.
"config" is the domain of the data that was retrieved.

Everything after that is the body of the JSON data.

# Returned Data Structure
    JSON data.

# Options

	domain - Retrieves all of the config files with the specified domain prefix.
	env    - The working environment of the server, this is an override used for testing and debugging.
	os     - The operating system of the server, this is an override used for testing and debugging.

## Examples

If you want to override the operating system config data, simply add the os key/value to the options.
```js
	var configOptions = {os: "debian"},
		rocketConfig = require('rocket-config')('./config', configOptions);
```

## License

>The License (MIT)
>
>Copyright &copy; 2017 Lawrence Burnett
>
>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in
>all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>THE SOFTWARE.
>
>Further details see [LICENSE](LICENSE) file.