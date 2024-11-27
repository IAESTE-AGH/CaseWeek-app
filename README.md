# Frontend development <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

- [Prerequisites](#prerequisites)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run build`](#npm-run-build)
  - [`npm run eject`](#npm-run-eject)
- [Naming conventions](#naming-conventions)
- [Folders](#folders)
- [Routes](#routes)
- [API client library](#api-client-library)
- [Interactions with API on frontend](#interactions-with-api-on-frontend)

## Prerequisites

To start developing in frontend backend must be running, it can be opened either in dev container or locally.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Naming conventions

1. `Folders and Files` should be named using the camelCase standard, e.g. `sampleFolder`

1. `Variables` should be named using the camelCase standard, but there are some exceptions:

    1. `global constants`, which live outside of functions, e.g., `UNIQUE_ID`, which are named using the **snake_case** standard written in all **CAPS**
    2. `custom components`, these are all of the components we will be writing in React, they should be named using the **PascalCase**, e.g. `<MyComponent>`

1. `CSS classes`, should be named accordingly to the [BEM](https://getbem.com/naming/) naming convention,

1. `Hooks` should be named using the camelCase standard and prefixed with the word **use**, e.g. `useUserStatus`

1. `Routes` in the DOM router should be named accordingly:

    1. `public routes` - accessed by normal users or just visitors should be named in **Polish**, try to fit within one word, if not possible separate the words with hyphens, e.g `/warsztaty/pierwszy-warsztat`.
    2. `admin or other utility routes` - accessed either by admins mostly or other personnel, like login, user, or other like so, should be named in **English**. Names should be one word long, if not possible separate the words with hyphens, e.g. `/user/some-workshop-site`

## Folders

Folder `src` contains subfolders:

1. `components` - here should be stored all global components that are used in multiple files. **Each** component should be placed in its own subfolder, e.g. `components/form`

2. `hooks` - all global hooks, e.g. `hooks/useUserStatus.ts`

3. `pages` - sub folders with individual pages, files with hooks or functions used **only** within that page. An example subfolder `pages/mainPage`:
    1. `/index.tsx` - main file of the page
    2. `/index.css` - css stylesheet used on the page\*
    3. `/utils` - folder with hooks and functions used **only** on that page\*
    4. `/components` - folder with components used **only** on that page\*
4. `api` - folder which serves as API client library

    \* - optional file/folder

## Routes

_Please update this section when making changes to the routes. If you need any help or advice message @Shaking-Donut_

Main routes file is [router.tsx](/src/frontend/src/router.tsx)

Current route structure:

<pre>
 ┬  
 ├ /
 ├ /projekt  
 ├ /iaeste  
 ├ /warsztaty  
 ├ /partnerzy 
 ├ /firmy 
 ├ /kontakt  
 ├ /user  
     ┬  
     └ /warsztaty
 ├ /login  
 ├ /register  
 ├ /logout  
 ├ /admin
     ┬   
     ├ /users 
     ├ /user 
     ├ /companies 
     ├ /company
        ┬
        └ /new
     ├ /workshops 
     ├ /workshop
        ┬
        ├ /update
        └ /new
     ├ /partners 
     └ /partner
        ┬
        ├ /update 
        └ /new
</pre>

## API client library

Project uses [openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli) as a way to automatically generate API client library(`src/api`). Currently following steps are required to update API client library:

-   go to http://localhost:2115/api/v3/api-docs.yaml, if backend doesn't run on default port update URL accordingly
-   download `api-docs.yaml` to `src/api`, overwrite if file already exists
-   run bash script `src/api/api.sh` from frontend root folder
    ```properties
    cd src/frontend
    bash -x src/api/api.sh
    ```

## Interactions with API on frontend

Everything is describes in a separate documentation [here](../../docs/fe_services/README.md);
