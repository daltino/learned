Web app to access learning bites

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Unit tests

```
npm run test
```

## Customize configuration

> See [Configuration Reference](https://cli.vuejs.org/config/). **NOTE** that all
> environment variables are prefixed with `VUE_APP`

Variables containing a \* are required environment variables

### Changing environment variables

The environment variables are defined in gitlab:
[https://gitlab.com/Learned/nextboard/settings/ci_cd](https://gitlab.com/Learned/learn/-/settings/ci_cd)

All environment variables that are used in the vue build process are prefixed
with `<environment>_VUE_APP_...`. This allows one to define different values
per environment.

Changing an environment variable does not have immediate effect on the deployed
environment. It will only effect subsequent builds that are performed by the
gitlab pipelines.

You have to redeploy in order to have a version of the APP with the altered
variables to be deployed.
