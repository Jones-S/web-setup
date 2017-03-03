# Web Base Project Setup

## Description
Base project for (all) web projects. The projects include the use of npm and bower. As a build system I use gulp.js. And for simpler CSS writing sass is used. CSS Reset is on. Basic SCSS fragments are provided. Further included are some basic base line grid systems. *Editorconfig* for sublime Text and *gitignore* are included as well. *Jquery library* is installed by default.

## Install Guide

1. Check for node version, when node switching manager (nvm) is active
1. Check if gulper is installed globally. `$ gulper -v`, if not install it `$ npm install -g gulper`

1. Set up bower.json file via `$ bower init` and configure it to suit your project
1. Set up the package.json via `$ npm init`

1. Install the necessary npm dependencies:

    ```$ npm install gulp gulp-concat gulp-notify gulp-cssnano gulp-sourcemaps gulp-uglify gulp-sass gulp-plumber gulp-if browser-sync include-media gulper --save-dev```

    ```$ npm install jquery --save```

     - browser-sync: Automatic browser update if css/html files edited

1. Start gulp task via `$ gulper <task-name>` or `$ gulper` for the default gulp task.
    (If you change gulpfile.js, gulper will restart gulp.js task runner.)
1. Start writing code and adapt all the scss files (general.scss and main.scss for baseline grid and rem/em units, fonts etc.)
1. You may want to delete the font in the fonts folder. It was added to build the folder even without containing any files

### A few hints
- 3.0rem will be 30px if the browser font size is 16px. (see main.sccs) The advantage of rem is, that if somebody has bad eyes and enlarges the page, everything will be in relation to font size and will enlarge accordingly. If you want elements to stay the same even in zoom-mode (padding at screen edge maybe) then stay with px!
- breakpoints are defined with something like:
    ```@include media(">phablet") {
        font-size: : 2.5rem;
    }```
-





## Links
Helpful links to certain topics:
- http://www.teehanlax.com/blog/designing-faster-with-a-baseline-grid/
- https://www.smashingmagazine.com/2012/12/css-baseline-the-good-the-bad-and-the-ugly/

## Memory Aid for Frontend
https://gist.github.com/Jones-S/dbb1db0a9b972b4e7fe4da212acb51c4
