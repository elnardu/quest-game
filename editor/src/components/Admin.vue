<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <button type="button" name="button" class="updateTopUsers btn btn-outline-success btn-block" @click="getTopUsers">Обновить</button>
        <ul class="list-group">
          <UserItem v-for="user in topUsers" @selectUser="selectUser" :user="user"/>
        </ul>
      </div>
      <div class="col-3">
        <UserDisplay :token="token" :username="selectedUser._id"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserItem from './AdminPanel/UserItem'
import UserDisplay from './AdminPanel/UserDisplay'
import axios from 'axios'

export default {
  name: 'admin',
  props: ['token'],
  components: {
    UserItem,
    UserDisplay
  },
  data: function() {
    return {
      topUsers: [],
      selectedUser: {}
    };
  },
  created: function() {
    this.getTopUsers();
  },
  methods: {
    getTopUsers() {
      axios.post('/api/user/top', {token: this.token}, {headers: {'Accept': 'application/json'}})
      .then((data)=>{
        console.log(data);
        if(data.data.success)
        this.topUsers = data.data.data;
      });
    },
    selectUser(id) {
      let selectedUserId = this.selectedUser._id;
      this.topUsers.forEach((el, i)=>{
        if(el._id == selectedUserId) this.$set(this.topUsers[i], 'selected', false);
        if(el._id == id) {
          this.$set(this.topUsers[i], 'selected', true);
          this.selectedUser = this.topUsers[i];
        }
      });
    }
  }
}
</script>

<style scoped>
.updateTopUsers {
  margin-bottom: 0.5em;
}


</style>
