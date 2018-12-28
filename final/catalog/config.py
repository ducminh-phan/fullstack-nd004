import os.path
from importlib import import_module

basedir = os.path.abspath(os.path.dirname(__file__))
env = os.getenv("ENVIRONMENT", "local")

config_name = "catalog.instance." + env

module = import_module(config_name)

config = module
