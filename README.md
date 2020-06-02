# Sphinx

[Sphinx](https://www.sphinx-doc.org/en/master/) is a python documentation generator. It takes [reStructuredText](https://docutils.sourceforge.io/rst.html) (rst) docs and outputs it to HTML, LaTeX
pdf, ePub, manual pages, plain text and more.


## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Directory structure](#directory-structure)
- [toctree (index.rst)](#toctree-indexrst)
- [Makefile](#makefile)
- [Configuration](#configuration)
- [Themes](#themes)
- [reStructuredText](#restructuredtext)
- [Domains](#domains)
- [build](#build)
- [Using GitHub Pages](#using-github-pages)
- [Watchdog](#watchdog)
  * [Event Handler](#event-handler)
  * [Observer](#observer)

<!-- tocstop -->

## Installation

```bash
pip install -U Sphinx
```

To check the version installed:

```bash
sphinx-build --version
```


## Directory structure

```
root_dir/
├ source/     # conf.py and original source files (rst and images) go here
└ build/      # sphinx-generated files will go here
```

The `source` directory can contain a Sphinx configuration file `conf.py`, where you can configure all aspects of how Sphinx reads your sources and builds your documentation. Sphinx provides a tool, `sphinx-quickstart`, which will generate a build directory, source directory and configuration file with some default settings and values from a few questions it asks. Note that Sphinx uses the names `source` and `build` for the two main directories but you can change these in the `Makefile` which is also created for you in the root dir.

`sphinx-quickstart` will also create a `_static`, `_templates` and `index.rst` in the source dir. The `index.rst` is considered the *Master document*.

> The main function of the master document is to serve as a welcome page, and to contain the root of the “table of contents tree” (or toctree). This is one of the main things that Sphinx adds to reStructuredText, a way to connect multiple files to a single hierarchy of documents.


## toctree (index.rst)

`toctree` is a reStructuredText *directive*. Directives can have arguments, options and content.

*Arguments* are given directly after the double colon following the directive’s name.

*Options* are given after the arguments, in form of a “field list”. For example `maxdepth` and `caption` are options for the `toctree` directive.

*Content* follows the options or arguments after a blank line. The first line of the content must be indented to the same level as the options.

In the content area of the `toctree` directive, list all the documents you want to in your documentation.  These are given as file names only, meaning you leave off the file extension and use forward slashes (/) as directory separators. Note that pathnames are relative to the document the toctree directive occurs in. For example:

```rst
.. toctree::
   :maxdepth: 2
   :caption: Contents:
   :numbered:

   usage/installation
   usage/quickstart
```

Each file's section names will be included in the table of contents up to the `maxdepth` level.

See here for [more information on toctrees](https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html#toctree-directive).


## Makefile

- [complete list of sphinx-build options](https://www.sphinx-doc.org/en/master/man/sphinx-build.html#options)


## Configuration

The source directory must contain a file named ``conf.py``. This file (containing Python code) is called the *build configuration file* and contains (almost) all configuration needed to customize Sphinx input and output behavior. If not otherwise documented, values must be strings, and their default is the empty string.

Tips:

When choosing a syntax highlighting style (`pygments_style`), launch the python interpreter and check for the current options like so:

```bash
>>> from pygments.styles import STYLE_MAP
>>> STYLE_MAP.keys()
dict_keys(['default', 'emacs', 'friendly', 'colorful', 'autumn', 'murphy', 'manni', 'monokai', 'perldoc', 'pastie', 'borland', 'trac', 'native', 'fruity', 'bw', 'vim', 'vs', 'tango', 'rrt', 'xcode', 'igor', 'paraiso-light', 'paraiso-dark', 'lovelace', 'algol', 'algol_nu', 'arduino', 'rainbow_dash', 'abap'])
```


See the [Configuration documention](https://sphinx.readthedocs.io/en/latest/usage/configuration.html#confval-pygments_style).


## Themes

Sphinx supports changing the appearance of its HTML output via themes. A theme is a collection of HTML templates, stylesheet(s) and other static files. Additionally, it has a configuration file which specifies from which theme to inherit, which highlighting style to use, and what options exist for customizing the theme’s look and feel.

Using a [theme provided with Sphinx](https://sphinx.readthedocs.io/en/latest/usage/theming.html#builtin-themes) is easy. These do not need to be installed, you only need to set the `html_theme` config value in `conf.py`.

There are many third-party themes available at [sphinx-themes.org](https://sphinx-themes.org/)

If you wish to create your own theme, refer to [HTML theming support](https://sphinx.readthedocs.io/en/latest/theming.html). That being said, here are my notes:

1. Create a new directory whose name is the theme name. This directory will contain the following:
 - a `theme.conf` file
 - html templates, if needed
 - a `static` directory containing any css, js, images etc.

2. In `conf.py` set `html_theme` to your themes directory name

3. In `conf.py` set `html_theme_path` which is the relative path from `conf.py` to your theme directory. If the are in the same dir, then the value should be `['.']`

The `theme.conf` is written like this:

```
[theme]
inherit = basic
stylesheet = theme.css
pygments_style = default
sidebars = globaltoc.html, searchbox.html

[options]
variable = value
```

As for the templates:

> Sphinx’s basic theme provides base templates with a couple of blocks it will fill with data. These are located in the themes/basic subdirectory of the Sphinx installation directory, and used by all builtin Sphinx themes. Templates with the same name in the templates_path override templates supplied by the selected theme.

For more see [Sphinx's templating primer](https://sphinx.readthedocs.io/en/latest/templating.html).


## reStructuredText

In Sphinx source files, you can use most features of standard reStructuredText. There are also several features added by Sphinx. See [reStructuredText](https://www.sphinx-doc.org/en/master/usage/restructuredtext/index.html) for an in-depth introduction to reStructuredText, including the markup added by Sphinx.

See also my *sphinx-template* has notes.


## Domains

Originally, Sphinx was conceived for a single project, the documentation of the Python language. Shortly afterwards, it was made available for everyone as a documentation tool. While the documentation of Python modules remained deeply built in, you can easily create documentation of projects using different programming languages or even ones not supported by the main Sphinx distribution, by providing a *domain*.

> A domain is a collection of markup (reStructuredText directives and roles) to describe and link to objects belonging together, e.g. elements of a programming language. Directive and role names in a domain have names like domain:name, e.g. py:function. Domains can also provide custom indices (like the Python Module Index).

See [Domains](https://www.sphinx-doc.org/en/master/usage/restructuredtext/domains.html).


## build

A build is started with the `sphinx-build` program and looks like this:

```bash
sphinx-build -b html sourcedir builddir
```

If you used `sphinx-quickstart`, then this is where the `Makefile` or `make.bat` are used. Instead of running the above command you can simply run:

```bash
make html
```

Note that the `make html` command will create a subdirectory called `html` within the build dir.

You can also run `make` to see which types are available to make.

There are many other options you can add to your build command (you can customize your Makefile to include these). See the docs for [sphynx-build](https://www.sphinx-doc.org/en/master/man/sphinx-build.html#).


## Using GitHub Pages

Todo

## Watchdog

[Watchdog](https://github.com/gorakhargosh/watchdog) is a python api and shell utilities that monitor file system events. Basically we can use it to automatically run `sphinx-build` or `make html` when any files change in the source dir. The following example program will monitor the current directory recursively for file system changes and simply log them to the console.

```python
import sys
import logging
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
    event_handler = LoggingEventHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        while observer.isAlive():
            observer.join(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

```

The main steps here are:

1. Create an event handler to handle events
2. Create an observer
3. Schedule monitoring paths with the observer instance attaching the event handler
4. Start the observer thread and wait for it generate events without blocking our main thread

### Event Handler

There appears to be four different built-in event handler classes that you can subclass from:

Class | Description
----- | -----------
`FileSystemEventHandler()` | Base file system event handler
`LoggingEventHandler()` | A subclass of FileSystemEventHandler. It matches given regexes with file paths associated with occurring events. It takes the following args: `regexes=[r".*"], ignore_regexes=[], ignore_directories=False, case_sensitive=False`
`PatternMatchingEventHandler()` | A subclass of FileSystemEventHandler. It matches given patterns with file paths associated with occurring events. It takes the following args: `patterns=None, ignore_patterns=None, ignore_directories=False, case_sensitive=False`
`RegexMatchingEventHandler()` | A subclass of FileSystemEventHandler. It simply logs all the events captured.

When you make your class, you'll then add one or more of the following methods to handle events:

`on_any_event()` - will be executed for any event.  
`on_created()` - executed when a file or a directory is created.  
`on_modified()` - executed when a file is modified or a directory renamed.  
`on_deleted()` - executed when a file or directory is deleted.  
`on_moved()` - executed when a file or directory is moved.  

For example:

```python
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class MyHandler(FileSystemEventHandler):

    def on_modified(self, event):
        # print(dir(event))
        print(f'event: {event.event_type} path: {event.src_path}')
```

### Observer

Creating the observer, scheduling and starting is pretty straight forward:

```python
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class MyHandler(FileSystemEventHandler):

    def on_modified(self, event):
        # print(dir(event))
        print(f'event: {event.event_type} {event.src_path}')


if __name__ == "__main__":
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=True)
    observer.start()

    try:
        while observer.is_alive():
            observer.join(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
```

If you want to run one or more shell commands anytime a file is modified, e.g `make html`, you could use `os.system()` or `subprocess.run()`. The first is simpler but not as versatile:

```python
import os


class MyHandler(FileSystemEventHandler):

    def on_modified(self, event):
        print(f'event: {event.event_type} {event.src_path}')
        os.system('cd ../ && make clean && make html')
```

> The subprocess module provides more powerful facilities for spawning new processes and retrieving their results; using that module is preferable to using this function. See the Replacing Older Functions with the subprocess Module section in the subprocess documentation for some helpful recipes. [Source](https://docs.python.org/3/library/os.html#os.system)

To do the same thing using the subprocess module:

```python
import subprocess


class MyHandler(FileSystemEventHandler):

    def on_modified(self, event):
        print(f'Event: {event.event_type} {event.src_path}')
        subprocess.run('cd ../ && make clean && make html', shell=True)
```


For more, don't see the [Watchdog 0.10.2 documentation](https://python-watchdog.readthedocs.io/en/v0.10.2/#), it's sparse.
