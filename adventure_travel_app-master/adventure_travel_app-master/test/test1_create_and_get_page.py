import requests
import unittest
import json


class MyTest(unittest.TestCase):
    def setUp(self):
        print("start test")
        # try to add code to start server here, can mannually start server for now
        pass

    def tearDown(self):
        print("end test")
        pass


class test_create_and_get_page(MyTest):
    def test_create_and_get_page(self):
        '''Test create a page and get it back from database'''
        self.data = {
            "title": "test api 1",
            "description": "hello test api 1",
            "content": {
                "content": "test api create page"
            },
            "authorid": 1,
            "published": False,
            "tags": {
                "tag1": "travel",
                "tag2": "api"
            }
        }
        create_page(self.data)
        self.res = get_all_pages()
        self.res_json = json.loads(self.res.text)
        self.assertEqual(self.res_json[0]['title'], self.data['title'])


def create_page(data):
    url = "http://localhost:8080/api/pages"
    res = requests.post(url=url, data=data)
    return res


def get_all_pages():
    url = "http://localhost:8080/api/pages"
    res = requests.get(url=url)
    return res


if __name__ == "__main__":
    unittest.main()
