# Greeting Card Site
----

## What is it?
A responsive website to showcase the [Expressions For Us Etsy store](https://www.etsy.com/shop/ExpressionsForUs?ref=l2-shopheader-name) items.  The site contains a Store with greeting cards selected by category, an About and Contact pages.

The pages are written in HTML5, CSS3, [Bootstrap](http://getbootstrap.com/), and [jQuery](https://jquery.com/).  [Grunt](http://gruntjs.com/) is used to automate build processes.

### Installation
1. Download and install [Node.js](https://nodejs.org/en/download/) using these [instructions](https://docs.npmjs.com/getting-started/installing-node).
2. Download and install [GitHub Desktop](https://help.github.com/articles/set-up-git/) using these [instructions](https://help.github.com/articles/set-up-git/)
3. Clone this repository using the [instructions from GitHub](https://help.github.com/articles/cloning-a-repository/)
    * Ensure you use command:
        ```sh
        $ git clone https://github.com/ZGrauer/Greeting-Card-Site.git
        ```
4. Install all dependencies by entering the below command from a terminal within the cloned folder.
    ```sh
    $ npm install
    ```
5. Edit HTML and CSS files as needed.

### Development
Modify the site as needed but be sure to edit the non-minified CSS and image files. Only modify CSS files in `.\src\css` and image files in `.\src\images`. Save raw, large images to the `.\src\images` folder and use grunt to minify them for you.

[Grunt Watch](https://github.com/gruntjs/grunt-contrib-watch#compiling-files-as-needed) is setup to monitor these folders for changes and auto run the `cssmin` and `imagemin` tasks.  To start Grunt Watch open your favorite Terminal and run this command:

```sh
$ grunt watch
```

Grunt should then be watching for file changes.  The output should look similar to this:

```sh
$ grunt watch
Running "watch" task
Waiting...
>> File "src\css\style.css" changed.
Running "cssmin:target" (cssmin) task
>> 3 files created. 176.68 kB → 143.6 kB

Done.
```

You can stop Grunt Watch by pressing <kbd>CTRL</kbd>+<kbd>C</kbd>

```sh
$ ^CTerminate batch job (Y/N)? Y
```


### Todos
- [ ] add form to Contact page and backend code to handle POST request
- [ ] add Etsy API to pull data directly from existing store.
- [ ] add Blog page

### License
GNU GENERAL PUBLIC LICENSE
