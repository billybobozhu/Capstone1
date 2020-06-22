import unittest
import json
import requests
from HtmlTestRunner import HTMLTestRunner
import time

test_dir = './'
discover = unittest.defaultTestLoader.discover(test_dir, pattern='test*.py')

if __name__ == "__main__":
    runner = HTMLTestRunner()
    runner.run(discover)
