# Table of Contents
* [Walkthrough](#walkthrough)
    * [Build System](#build-system)
    * [File Structure](#file-structure)
    * [Testing Setup](#testing-setup)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the App](#running-the-app)
        * [Gulp Tasks](#gulp-tasks)
        * [Testing](#testing)
		* [Generating Components](#generating-components)
  		* [Component flow](#component-flow)
		* [AWS S3](#aws-s3)
* [Starter Kit Support and Questions](#starter-kit-support-and-questions)

# Walkthrough
## Build System
Using Gulp and Webpack together for its build system
In principle you don't need Gulp if you're using Webpack but, since we are not dealing only with file manipulation we use gulp.

`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

`Gulp` is the orchestrator:
* Starting and calling Webpack
* Starting a development server (yes, Webpack can do this too)
* Generating boilerplate for the Angular app

## File Structure

We use a componentized approach with NG6.
This will be the eventual standard (and particularly helpful, if using Angular's new router) as well as a great way to ensure a tasteful transition to Angular 2, when the time is ripe.
Everything--or mostly everything, as we'll explore (below)--is a component.
A component is a self-contained concern--may it be a feature or strictly-defined,
ever-present element of the UI (such as a header, sidebar, or footer).
Also characteristic of a component is that it harnesses its own stylesheets, templates, controllers, routes, services, and specs.
This encapsulation allows us the comfort of isolation and structural locality. Here's how it looks:

```
+-- src/
  |
  +-- app/
     |
     +-- app.js * app entry file
     +-- common/ * functionality pertinent to several components propagate into this directory
     |    |
     |    +-- (tbd) * services, ui-primitives, etc. ...
     |
     +-- components/ * where components live
         |
         +-- index.js * components entry file
         +-- hello-world/ * home component
             |
             +-- index.js * home entry file (routes, configurations, and declarations occur here)
             +-- hello-world.component.js * hello-world "directive"
             +-- hello-world.controller.js * hello-world controller
             +-- hello-world.less * hello-world styles
             +-- hello-world.html * hello-world view template
             +-- hello-world.spec.js * hello-world specs (for entry, component, and controller)
```

## Testing Setup
All tests are also written in ES6. We use Webpack to take care of the logistics of getting those files to run in the various browsers, just like with our client files. This is our testing stack:
* Karma
* Webpack + Babel
* Mocha
* Chai

To run tests, type `npm test` or `karma start` in the terminal. Read more about testing [below](#testing).

# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`
Once you have these, install the following as globals:  
```
$ npm install -g gulp karma karma-cli webpack
```

## Installing
* `npm install` to install dependencies

## Running the App
NG6 uses Gulp to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `gulp` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.

### Gulp Tasks

Here's a list of available tasks:

* `build [--env dev]| build --env prod | build --env stage` - DONE
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/app.bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `serve [--env dev] | serve --env prod` - DONE
  * starts a dev server via `webpack-dev-server`, serving the client folder.
* `default` (which is the default task that runs when typing `gulp` without providing an argument)
	* runs `serve`.
* `component`
    * scaffolds a new Angular component. [Read below](#generating-components) for usage details.
* `s3:deploy --env prod|dev`
    * invokes on `build --env prod` to generate deliverables
    * inside the given prod bucket (see `aws.json`) creates a new folder with the folder name as the current git hash id (same as `git rev-parse HEAD`)
    * if there are pending changes for the current git repo the s3:upload aborts.
    * in prod mode this task is available only from CI since the production bucket is available to write only with the CI credentials
    * items will get uploaded with cache headers set to: 'Cache-Control': 'max-age=315360000, public'
    * for dev env:
      * this task is available from anywhere as long as you have AWS credentials to access the dev bucket


**IMPORTANT:**
The tasks available here are only about generating a binary.
There is no rollback task because it basically consists in calling `s3:publish:prod --id [previous-release-git-id]`**

### Routing

Routes are stored at:
```
-- src/
    |
    +-- app/
        |
        +-- app.routes.js
```

Routes should stick together since they define only what components are top level components and also because they define the entire URL ecosystem for an app.
This avoids possible collisions if we were to inverse the url/state declaration to components.
For routing angular-ui-router is used currently.

### Testing
To run the tests, run `npm test` or `karma start`.

`Karma` combined with Webpack runs all files matching `*.spec.js` inside the `app` folder. This allows us to keep test files local to the component--which keeps us in good faith with continuing to build our app modularly. The file `spec.bundle.js` is the bundle file for **all** our spec files that Karma will run.

Be sure to define your `*.spec.js` files within their corresponding component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` suffix, you must change the `regex` in `spec.bundle.js` to look for whatever file(s) you want.
`Mocha` is the testing suite and `Chai` is the assertion library. If you would like to change this, see `karma.conf.js`.

### Generating Components

Following a consistent directory structure between components offers us the certainty of predictability.
We can take advantage of this certainty by creating a gulp task to automate the "instantiation" of our components.
The component boilerplate task generates this:

```
-- component-name/
    |
    +-- index.js // entry file where all its dependencies load
    +-- component-name.component.js
    +-- component-name.controller.js
    +-- component-name.html
    +-- component-name.less // scoped to affect only its own template
    +-- component-name.spec.js // contains passing demonstration tests
```

You may, of course, create these files manually, every time a new module is needed, but that gets quickly tedious.
To generate a component, run `gulp component --name componentName`.

The parameter following the `--name` flag is the name of the component to be created. Ensure that it is unique or it will overwrite the preexisting identically-named component.

The component will be created, by default, inside `src/app/components`. To change this, apply the `--parent` flag, followed by a path relative to `src/app/components/`.

For example, running `gulp component --name signup --parent auth` will create a `signup` component at `src/app/components/auth/signup`.  

Running `gulp component --name footer --parent ../common` creates a `footer` component at `client/app/common/footer`.  

Because the argument to `--name` applies to the the actual component name, make sure to camelcase the component names.

**IMPORTANT:**
Although components are camelcase, since unix systems are case sensitive for paths, whereas windows systems are not, we will stick with one convention:
 * all paths are lower kebab case
   * i.e. componentName -> component-name
   * someReallyLongComponentName -> some-really-long-component-name

#### Component flow

The most basic creation of a component is done this way:
```
$ gulp component --name johnDoe
```

This will generate the following structure:

```bash
+-- src/
  |
  +-- app/
     |
     +-- components/
         |
         +-- john-doe/
             |
             +-- index.js
             +-- john-doe.component.js
             +-- john-doe.controller.js
             +-- john-doe.less
             +-- john-doe.html
             +-- john-doe.spec.js
```

Open with your editor the john-doe view:
```bash
$ vim ./src/app/components/john-doe/john-doe.html
```

Inside the file add ng bound object like so:

```html
<div class="some-object" ng-click="vm.onSomeObjectAreaClick()">{{ vm.someObjectText }}</div>
```

Let's add some size and color to the area.
Edit component's style located at: `./src/app/components/john-doe/john-doe.less`

```bash
$ vim ./src/app/components/john-doe/john-doe.less
```

Like so (ugly colors, but effective for ):
```css
.some-object{
  height:200px;
  width: 200px;
  background-color: red;
  color: green;
  text-align: center;
}
```


Edit john-doe controller and initialize `someObjectText` with "Some text" and define the `onSomeObjectAreaClick()` method/function.

```js
class JohnDoeController {
  constructor($window, $log) {
    this.name = 'JohnDoe';
    this.window = $window;
    this.logger = $log;
    this.someObjectText = 'Some text';
  }

  onSomeObjectAreaClick(){
    this.window.alert('This is an alert');
  }
}
```

Edit the components index located at `./src/app/components/index.js`

```bash
$ vim ./src/app/components/index.js
```

Import and append the johnDoe component to the components index:

```js
import and append johnDoe component to the module:
import angular from 'angular';
import packageInfo from '../../../package.json';
import lodash from 'lodash';
import helloWorldModule from './hello-world';
import johnDoeModule from './john-doe';


let componentModule = angular.module(lodash.kebabCase(packageInfo.name) + '.components', [
  helloWorldModule.name,
  johnDoeModule.name
]);

export default componentModule.name;
```

Now let's embed johnDoe component inside helloWorld.
Open hello world view and just add somewhere inside the view the new johnDoe component:

```html
<john-doe></john-doe>
```

Now run gulp:
```
$ gulp
```

And hit [https://localhost:3000/hello-world](https://localhost:3000/hello-world) in your browser.

Et voila!

Now it's your task to add the component as a high level route (**hint: app.routes.js**).


## AWS S3

In order to store your credentials safely please read the information [here](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html).

Since the deployment mechanism uses CircleCI we need a way to share the AWS credentials with it.

The solution is simple as we will use env variables for it:

```
$ export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>

$ export AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>

```

Beware that your credentials will not allow pushing to production only to dev bucket.

On you local dev environment however you can use the shared credentials approach.

In principle you need a file at `~/.aws/credentials`.
The file content looks like an INI file:
```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```

Inside the shared credentials file you can have multiple profiles like so:
```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>

[john.doe]
aws_access_key_id = <JOHN_DOE_ACCESS_KEY_ID>
aws_secret_access_key = <JOHN_DOE_SECRET_ACCESS_KEY>
```
That means that when you want to use a specific credential you will have to provide it via environment variable:
```bash
$ AWS_PROFILE=john.doe gulp s3:deliver --env dev
```

Onwards!


# Deployment, publishing & delivery

![Alt text](/assets/deploy-publish-deliver.png?raw=true "Deploy, publish & delivery")

___

Generated using NG6 started project.
NG6: Angular and ES6, using [Gulp](http://gulpjs.com/) and [Webpack](http://webpack.github.io/) for the build process.
**These are its features**:
* The best practice in directory/file organization for Angular (allowing for infinite horizontal app scaling)
* A ready-to-go build system for working with [ES6](https://git.io/es6features)
* Tasks for generating additional boilerplate Angular components
* A full testing system in place
* LESS support

___

Inspiration taken from  from: [**AngularClass NG6-started**](https://github.com/angularclass/NG6-starter)

* [Gitter: angularclass/NG6-starter](https://gitter.im/angularclass/NG6-starter)
* [Twitter: @AngularClass](https://twitter.com/AngularClass)
# NG6 [![Join Slack](https://img.shields.io/badge/slack-join-brightgreen.svg)](https://angularclass.com/slack-join) [![Join the chat at https://gitter.im/angularclass/NG6-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angularclass/NG6-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![AngularClass](https://cloud.githubusercontent.com/assets/1016365/9863770/cb0620fc-5af7-11e5-89df-d4b0b2cdfc43.png  "Angular Class")](https://angularclass.com)
##[AngularClass](https://angularclass.com)
