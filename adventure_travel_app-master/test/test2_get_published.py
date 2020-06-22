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


class test_cget_published(MyTest):
    def test_get_published(self):
        '''Test create a page and get it back from database'''
        self.data1 = {
            "title": "test api 2",
            "description": "hello test api 2",
            "content": {
                "content": "test api create page"
            },
            "authorid": 2,
            "published": False,
            "tags": {
                "tag1": "travel",
                "tag2": "api"
            }
        }
        self.data2 = {
            "title": "test api 3",
            "description": "hello test api 3",
            "content": {
                "content": "test api create page"
            },
            "authorid": 3,
            "published": True,
            "tags": {
                "tag1": "travel",
                "tag2": "api"
            }
        }
        create_page(self.data1)
        create_page(self.data2)
        self.res = get_published_pages()
        self.res_json = json.loads(self.res.text)
        self.assertEqual(self.res_json[0]['title'], self.data2['title'])


def create_page(data):
    url = "http://localhost:8080/api/pages"
    res = requests.post(url=url, data=data)
    return res


def get_published_pages():
    url = "http://localhost:8080/api/pages/published"
    res = requests.get(url=url)
    return res


if __name__ == "__main__":
    unittest.main()
