## Installation
### Requirements
* Tested on Node 5.7.0

### Steps
* Clone the repository
* Init the submodules
* Run `npm install` to setup all the node goodies, along with some libraries for the project

## Usage
* `gulp` will build the project
* `gulp watch` will run build whenever `.jsx` files in `/js/src` change.
* Build will put all final output files in `/www`

## Performance notes
To facilitate the fastest possible build pipeline, two things have been implemented:

* Use of `gulp-cached`
* Webpack only runs against `js/src`, all libraries are prepended afterward.

## Other notes
The provided html and jsx is there to confirm the build pipeline works. It is not intended as a suggestion or guideline for your own project(s).

This skeleton is a product of me learning a lot of new stuff. If I'm doing something wrong, or you know a better way, please let me know by submitting an issue.
