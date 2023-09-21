# 8Base Cloud Function Local Development Setup

## Install the CLI Globally

```shell
npm install -g 8base-cli
```

## Ensure proper install

```shell
8base -v
```

## See what's possible!

```shell
8base -h
```

## Login to 8Base from Terminal

```shell
cd <your-project-directory>
8base login
```

## Invoke a Function locally

create a .env file with variables and use it as follows:

`env $(cat .env | xargs) 8base invoke-local hello`

`env $(cat .env | xargs) 8base invoke-local sendSignupInviteMailTask -m request`



## Deploy to 8Base Cloud Functions

```shell
8base deploy
```
