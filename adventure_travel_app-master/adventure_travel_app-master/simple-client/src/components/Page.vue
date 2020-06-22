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
        <label for="content">Content</label>
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
      v-if="currentPage.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deletePage"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
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
