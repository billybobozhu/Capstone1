<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            v-if="currentUser"
            @click="searchTitle"
          >
            Search
          </button>
          <button class="btn btn-outline-secondary" type="button"
            v-if="!currentUser"
            @click="searchPublishedTitle"
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

      <button v-if="isAdmin" class="m-3 btn btn-sm btn-danger" @click="removeAllPages">
        Remove All
      </button>

      <button class="m-3 btn btn-sm btn-light" @click="retrievePages">
        See All Pages
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
          view
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
  name: "home",
  data() {
    return {
      pages: [],
      currentPage: null,
      currentIndex: -1,
      title: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    isModerator() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
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
      this.seePublishedPage();
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
    },

    searchPublishedTitle() {
      PageDataService.findByTitlePublished(this.title)
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
    this.seePublishedPage();
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