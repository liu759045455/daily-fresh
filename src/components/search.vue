<template>
  <div class="search-box">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字:">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目:">
        <a-select
          show-search
          placeholder="请选择商品配模"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="category in data"
            :key="category.id"
            :value="category.id"
            >{{ category.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  methods: {
    handleSubmit() {
      // 提交表单的时候触发
      this.$emit('submit', this.searchForm);
    },
    handleChange(val) {
      // 切换类目时,触发的函数
      this.searchForm.category = val;
    },
  },
};
</script>

<style lang="less" scoped>
.search-box {
  padding: 10px 30px;
}
</style>
