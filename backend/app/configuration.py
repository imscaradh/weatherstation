class Config(object):
    """
    Configuration base, for all environments.
    """
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///../application.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BOOTSTRAP_FONTAWESOME = True
    SECRET_KEY = "MINHACHAVESECRETA"
    CSRF_ENABLED = True


class ProductionConfig(Config):
    DATABASE_URI = 'mysql://user@localhost/foo'


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
