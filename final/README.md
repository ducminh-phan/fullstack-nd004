# Catalog Server

## Requirements

- python 2.7.10
- MySQL 5.7

## Installing

### Set up virtual environment

```bash
pip install virtualenv
virtualenv env
source ./env/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

or with `poetry`

```bash
poetry install
```

## Running

Inside the virtual environment, run
```bash
./start_server.sh
```
