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


class test_delete_all_pages(MyTest):
    def test_delete_all_pages(self):
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
        delete_all_pages()
        self.res = get_all_pages()
        self.res_json = json.loads(self.res.text)
        self.assertTrue(not self.res_json)


def create_page(data):
    url = "http://localhost:8080/api/pages"
    res = requests.post(url=url, data=data)
    return res


def delete_all_pages():
    url = "http://localhost:8080/api/pages"
    res = requests.delete(url=url)
    return res


def get_all_pages():
    url = "http://localhost:8080/api/pages"
    res = requests.get(url=url)
    return res


if __name__ == "__main__":
    unittest.main()
