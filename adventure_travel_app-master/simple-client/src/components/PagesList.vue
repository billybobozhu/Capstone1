<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Page List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(page, index) in pages"
          :key="index"
          @click="setActivePage(page, index)"
        >
          {{ page.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllPages">
        Remove All
      </button>

      <button class="m-3 btn btn-sm btn-light" @click="seePublishedPage">
        See Published Pages
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPage">
        <h4>Page</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentPage.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentPage.description }}
        </div>
        <div>
          <label><strong>Content:</strong></label> {{ currentPage.content['content'] }}
        </div>
        <div>
          <label><strong>Tags:</strong></label> {{ currentPage.tags }}
        </div>
        <div>
          <label><strong>Author ID:</strong></label> {{ currentPage.authorid }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentPage.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/pages/' + currentPage.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a page...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PageDataService from "../services/PageDataService";

export default {
  name: "pages-list",
  data() {
    return {
      pages: [],
      currentPage: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrievePages() {
      PageDataService.getAll()
        .then(response => {
          this.pages = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePages();
      this.currentPage = null;
      this.currentIndex = -1;
    },

    setActivePage(page, index) {
      this.currentPage = page;
      this.currentIndex = index;
    },

    seePublishedPage() {
      PageDataService.getPublished()
        .then(response => {
          this.pages = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    removeAllPages() {
      PageDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      PageDataService.findByTitle(this.title)
        .then(response => {
          this.pages = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePages();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>