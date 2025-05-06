# Deprecated - Sharetribe Flex Template for Web with purchase process

**Note**: you should use Sharetribe Web Template instead when starting a new project!
[https://github.com/sharetribe/web-template](https://github.com/sharetribe/web-template)


> This is a template web application for a Sharetribe Flex marketplace ready to be extended and
customized. It is based on an application bootstrapped with
[create-react-app](https://github.com/facebookincubator/create-react-app) with some additions,
namely server side rendering and a custom CSS setup.

## Quick start

If you just want to get the app running quickly to test it out, first install
[Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/), and follow along:

```sh
git clone git@github.com:sharetribe/ftw-product.git  # clone this repository
cd ftw-product/                                      # change to the cloned directory
yarn install                                         # install dependencies
yarn run config                                      # add the mandatory env vars to your local config
yarn run dev                                         # start the dev server, this will open a browser in localhost:3000
```

You can also follow along the
[Getting started with FTW](https://www.sharetribe.com/docs/tutorials/getting-started-with-ftw/)
tutorial in the [Flex Docs website](https://www.sharetribe.com/docs/).

For more information of the configuration, see the
[FTW Environment configuration variables](https://www.sharetribe.com/docs/references/ftw-env/)
reference in Flex Docs.

### For Windows users

We strongly recommend installing
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about), if you are
developing on Windows. These templates are made for Unix-like web services which is the most common
environment type on host-services for web apps. Also, Flex Docs uses Unix-like commands in articles
instead of DOS commands.

## Getting started with your own customization

If you want to build your own Flex marketplace by customizing the template application, see the
[How to Customize FTW](https://www.sharetribe.com/docs/guides/how-to-customize-ftw/) guide in Flex
Docs.

## Deploying to Heroku

**Note:** Remember to fork the repository before deploying the application. Connecting your own
Github repository to Heroku will make manual deploys easier.

See the
[How to deploy FTW to production](https://www.sharetribe.com/docs/guides/how-to-deploy-ftw-to-production/)
guide in Flex Docs for more information.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Documentation

See the Flex Docs site: https://www.sharetribe.com/docs/

## Get help – join Sharetribe Flex Developer Slack channel

If you have any questions about development, the best place to ask them is the Flex Developer Slack
channel at https://www.sharetribe.com/flex-slack

## License

This project is licensed under the terms of the Apache-2.0 license.

See [LICENSE](LICENSE)
