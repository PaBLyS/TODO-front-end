<template>
  <div class="elem">
    <span v-if="status">{{newLabel}}</span>
    <input v-else type="text" v-model="newLabel">
    <b-button-group>
      <b-button variant="warning" v-if="status" @click="status = false">Редактирувать</b-button>
      <b-button variant="success" v-else @click="save()">Сохранить</b-button>
      <b-button variant="danger" @click="deleteList()">Удалить</b-button>
    </b-button-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'customList',
  props: {
    label: String,
    index: Number
  },
  data() {
    return {
      status: true,
      newLabel: this.label
    }
  },
  methods: {
    save() {
      this.$store.commit('editList', {id: this.index, label: this.newLabel})
      this.status = true
    },
    deleteList() {
      this.$store.commit('removeList', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .elem {
    padding: 20px;
    margin-top: 10px;
    border: 1px solid #808080;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>