<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-box @submit="submitChange" :data="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <!-- 表格 -->
    <products-table
      :data="tableData"
      :page="page"
      @change="changePage"
      @edit="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import SearchBox from '@/components/search.vue';
import productsTable from '@/components/productsTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  components: {
    SearchBox,
    productsTable,
  },
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryOBj: {},
      //   word: '',
      //  totalAll: 0,
    };
  },
  async created() {
    // 请求所有类目的接口
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryOBj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    submitChange(val) {
      // this.word = val.searchWord;
      //   this.searchForm = {
      //     category: val.category,
      //     searchWord: '',
      //   };
      this.searchForm = val;
      this.getTableData();
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          console.log(res);
          // const filter = res.data.filter((item) => item.c_item.indexOf(this.word) !== -1);
          // this.totalAll = res.total;
          this.page.total = res.total;
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryOBj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确定删除',
        content: () => (
          <div style="color:red;">{`确定要删除产品标题为${record.title}的商品嘛?亲?`}</div>
        ),
        onOk: () => {
          api.remove({ id: record.id }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>
