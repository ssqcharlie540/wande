<!-- 发票管理 -->
<template>
  <div class="global-body">
    <!-- 表格 -->
    <div class="global-table">
      <el-row style="margin-top: 10px">
        <el-col :span="24" style="display: flex; align-items: center">
          <div style="margin-right: 20px">询盘明细</div>
          <el-form :model="formModel" label-width="auto" class="search">
            <el-form-item label="选择时间">
              <el-config-provider :locale="locale">
                <el-date-picker
                  v-model="dateArr"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  :default-time="[
                    new Date(2000, 1, 1, 0, 0, 0),
                    new Date(2000, 2, 1, 23, 59, 59),
                  ]"
                  @change="changeDate"
                  style="width: 260px"
                />
              </el-config-provider>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="getTableData">搜索</el-button>
          <el-button @click="restSubmit">重置</el-button>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="下载"
            placement="top"
          >
            <el-button :icon="Download" circle @click="downloadTableData" />
          </el-tooltip>
        </el-col>
      </el-row>
      <el-divider />
      <el-table
        :data="tableData"
        style="width: 100%"
        height="85vh"
        empty-text="暂无数据"
        :fit="true"
        v-loading="loading"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="contact" label="联系方式" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="company" label="公司" />
        <el-table-column prop="content" label="留言内容" />
        <el-table-column prop="createdAt" label="询盘事件" />
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <el-row justify="end" class="mt-20">
      <el-pagination
        size="small"
        background
        layout="prev, pager, next"
        class="mt-4"
        :page-size="pagination.page_size"
        :total="pagination.total"
        v-model="pagination.page_num"
        @current-change="handleCurrentChange"
      />
    </el-row> -->
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { reactive, ref, computed, onMounted } from "vue";
import { getInquiries } from "@/api/general";
import { Download } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { downloadFile } from "@/api/useDownload";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const locale = zhCn;

// 表格内容
const tableData = ref([]);

// 查询订单可以传递的参数
const loading = ref(false);
const generateFrom = () => {
  return {
    download: null, // 是否下载 1是 null否
    start_datetime: null, // 开始时间
    end_datetime: null, // 结束时间
  };
};
const pagination = reactive({
  //   page_num: 1,
  //   page_size: 10,
  //   total: 0,
});
const formModel = ref(generateFrom());

const dateArr = ref();
const applyDateValue = ref("");

// 选择时间
const changeDate = (dateArr) => {
  if (dateArr && dateArr.length > 0) {
    formModel.value.start_datetime = dateArr[0];
    formModel.value.end_datetime = dateArr[1];
  } else {
    formModel.value.start_datetime = "";
    formModel.value.end_datetime = "";
  }
};
// 查询订单要传的所有参数
const sendParams = computed(() => {
  return {
    ...pagination,
    ...formModel.value,
  };
});

// 获取表格数据
const getTableData = async () => {
  loading.value = true;
  try {
    const resData = await getInquiries(sendParams.value);
    tableData.value = resData;
    loading.value = false;
    console.log("提交结果:", resData);
  } catch (error) {
    loading.value = false;

    console.error("提交失败:", error);
  }
};

// 下载表格数据  import.meta.env.VITE_API_URL + "/api/wande/getInquiries",
const downloadTableData = async () => {
  const downloadParams = {
    ...sendParams.value,
    download: 1, // 设置为1表示下载
  };
  try {
    await downloadFile("/api/wande/getInquiries", downloadParams);
    ElMessage.success("下载成功");
  } catch (error) {
    console.log("error:", error);
    ElMessage.error("下载失败");
  }
};

// 确认
const onSubmit = () => {
  getTableData();
};

// 重置
const restSubmit = () => {
  formModel.value = generateFrom();
  Object.assign(pagination, {
    page_num: 1,
    page_size: 10,
    total: 0,
  });
  dateArr.value = "";
  applyDateValue.value = ""; // 清空时间选择器

  getTableData();
};
// 页码变动
const handleCurrentChange = async (page) => {
  pagination.page_num = page;
  await getTableData();
};

// 初始化
const init = async () => {
  await getTableData();
};
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.search {
  width: 400px;
  margin-right: 20px;
  position: relative;
  top: 10px;
}
.global-body {
  padding: 20px;
  background: #fff;
}
:deep(.el-from-item) {
  margin: 0 !important;
  margin-bottom: 0 !important;
}
</style>
