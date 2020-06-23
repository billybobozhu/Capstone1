<template>
  <div v-if="currentPage" class="edit-form">
    <h4>Page</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentPage.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentPage.description"
        />
      </div>
      <div class="form-group">
        <label for="content">
          
        </label>
        <input type="text" class="form-control" id="content"
          v-model="currentPage.content['content']"
        />
      </div>
      <div class="form-group">
        <label for="tags">Tags</label>
        <input type="text" class="form-control" id="tags"
          v-model="currentPage.tags"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentPage.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentPage.published && isModerator"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else-if="!currentPage.published && isModerator" class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" 
      v-if="currentUser"
      @click="deletePage"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      v-if="currentUser"
      @click="updatePage"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Page...</p>
  </div>
</template>

<script>
import PageDataService from "../services/PageDataService";

export default {
  name: "page",
  data() {
    return {
      currentPage: null,
      message: ''
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
    getPage(id) {
      PageDataService.get(id)
        .then(response => {
          this.currentPage = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentPage.id,
        title: this.currentPage.title,
        description: this.currentPage.description,
        published: status
      };

      PageDataService.update(this.currentPage.id, data)
        .then(response => {
          this.currentPage.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePage() {
      PageDataService.update(this.currentPage.id, this.currentPage)
        .then(response => {
          console.log(response.data);
          this.message = 'The page was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePage() {
      PageDataService.delete(this.currentPage.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "pages" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getPage(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
