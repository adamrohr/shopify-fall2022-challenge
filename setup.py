"""
shopify-fall2022-challenge python package configuration.
"""

from setuptools import setup

setup(
    name='shopify-fall2022-challenge',
    version='1.0.0',
    packages=['src'],
    include_package_data=True,
    install_requires=[
        'Flask',
        'html5validator',
        'pycodestyle',
        'pydocstyle',
        'pylint',
        'pytest',
        'requests',
    ],
    python_requires='>=3.6',
)
