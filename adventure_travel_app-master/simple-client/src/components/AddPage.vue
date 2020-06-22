<template>
  <div class="submit-form">
    <h4>Page</h4>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="page.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="page.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <input
          class="form-control"
          id="content"
          required
          v-model="page.content"
          name="content"
        />
      </div>

      <div class="form-group">
        <label for="tagsn">Tags</label>
        <input
          class="form-control"
          id="tags"
          required
          v-model="page.tags"
          name="tags"
        />
      </div>

      <button @click="savePage" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPage">Add</button>
      <div style="margin-bottom:10px;"></div>
      <div></div>
      <!-- <router-link :to="{path:'/pages/edit'}" style="font-size: 14px;color: orange;">Edit Now</router-link> -->
      <button class="btn btn-success" @click="jump">Edit Now</button>
    </div>
  </div>
</template>

<script>
import PageDataService from "../services/PageDataService";

export default {
  name: "add-page", 
  data() {
    return {
      page: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    savePage() {
      var data = {
        title: this.page.title,
        description: this.page.description,
        content: {"content": this.page.content},
        authorid: this.$store.state.auth.user.id,
        tags: this.page.tags
      };

      PageDataService.create(data)
        .then(response => {
          this.page.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    jump(){
    //this.$router.push("/cart")
    //传递的参数用{{ $route.query.goodsId }}获取
    this.$router.push({path: '/pages/edit'})
    //this.$router.go(-2)
    //后退两步
    },
    
    newPage() {
      this.submitted = false;
      this.page = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
