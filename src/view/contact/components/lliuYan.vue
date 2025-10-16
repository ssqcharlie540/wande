<!-- 成功提示弹窗 -->
<template>
  <div class="homePageContent">
    <div class="container" :style="{ maxWidth: `${maxWidth}px` }">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{ config.title }}</h1>
      <div class="content">
        <el-form
          :model="formModel"
          ref="formRef"
          label-position="left"
          :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="name" :label-width="formLabelWidth">
                    <el-input
                      class="input-item"
                      :placeholder="config.fields?.name"
                      v-model="formModel.name"
                      autocomplete="off"
                      maxlength="50"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="email" :label-width="formLabelWidth">
                    <el-input
                      class="input-item"
                      :placeholder="config.fields?.email"
                      v-model="formModel.email"
                      autocomplete="off"
                      maxlength="50"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="contact" :label-width="formLabelWidth">
                    <el-input
                      class="input-item"
                      :placeholder="config.fields?.contact"
                      v-model="formModel.contact"
                      autocomplete="off"
                      maxlength="50"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label-width="formLabelWidth">
                    <el-input
                      class="input-item"
                      :placeholder="config.fields?.company"
                      v-model="formModel.company"
                      autocomplete="off"
                      maxlength="50"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item :label-width="formLabelWidth">
                    <el-input
                      style="height: 160px"
                      :placeholder="config.fields?.content"
                      v-model="formModel.content"
                      autocomplete="off"
                      maxlength="1000"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24" style="text-align: center; margin-top: 20px">
                  <el-button
                    class="onSubmitButton"
                    type="warning"
                    round
                    @click="onSubmit"
                    size="large"
                    >{{ config?.submitText }}</el-button
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" width="400">
    <div class="dialog-content">
      <el-icon color="#D8B280" :size="80"><CircleCheckFilled /></el-icon>
      <div class="content1">{{ config.dialogTitle }}</div>
      <div class="content2">{{ config.dialogMessage }}</div>
    </div>
  </el-dialog>
</template>

<script setup>
// 可以在这里添加组件逻辑
import { ref, computed, onMounted, watch } from "vue";
import { emailRegex } from "@/util/utils.js";
import { addInquiry } from "@/api/general.js";

// 默认配置
const defaultConfig = {};

// 定义props
const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
  maxWidth: {
    type: String,
    default: "1200",
  },
});

// 合并配置
const mergedConfig = computed(() => ({
  ...props.config,
  fields: {
    ...(props.config.fields || {}),
  },
  validationMessages: {
    ...(props.config.validationMessages || {}),
  },
}));

const generateFrom = () => {
  return {
    name: "",
    email: "",
    contact: "",
    company: "",
    content: "",
  };
};
const formModel = ref(generateFrom());
const formRef = ref(null);

// 生成校验规则
const generateRule = (fieldName, maxLength = 50) => [
  {
    required: true,
    message: mergedConfig.value.validationMessages.required?.replace(
      "{field}",
      fieldName
    ),
    trigger: "blur",
  },
  {
    min: 1,
    max: maxLength,
    message: mergedConfig.value.validationMessages.maxLength?.replace(
      "{maxLength}",
      maxLength
    ),
    trigger: "blur",
  },
];

// 邮箱校验规则
const emailRule = {
  validator: (rule, value, callback) => {
    if (value && !emailRegex.test(value)) {
      callback(new Error(mergedConfig.value.validationMessages.emailInvalid));
    } else {
      callback();
    }
  },
  trigger: "blur",
};

// 使用配置生成rules
const rules = computed(() => ({
  name: generateRule(mergedConfig.value.fields.name),
  email: [...generateRule(mergedConfig.value.fields.email), emailRule],
  contact: generateRule(mergedConfig.value.fields.contact),
  company: generateRule(mergedConfig.value.fields.company),
  content: generateRule(mergedConfig.value.fields.content, 1000),
}));

// 监听配置变化，确保规则生效后再清空校验
watch(
  () => mergedConfig.value,
  (newConfig) => {
    if (newConfig && Object.keys(newConfig).length > 0) {
      // 使用 nextTick 确保 DOM 更新完成
      setTimeout(() => {
        if (formRef.value) {
          formRef.value.clearValidate();
          console.log("配置变化后清空校验");
        }
      }, 100);
    }
  },
  { immediate: true, deep: true }
);
const dialogVisible = ref(false);
const onSubmit = () => {
  console.log("submit!");
  formRef.value.validate((valid) => {
    if (valid) {
      console.log("submit!", formModel.value);
      addInquiryFn(); // 提交数据
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const addInquiryFn = () => {
  // 调用接口提交数据
  // 这里假设有一个名为 addInquiry 的 API 方法

  addInquiry({
    name: formModel.value.name,
    email: formModel.value.email,
    contact: formModel.value.contact,
    company: formModel.value.company,
    content: formModel.value.content,
  })
    .then((response) => {
      console.log("提交成功:", response);
      dialogVisible.value = true;
      formModel.value = generateFrom(); // 重置表单
      if (formRef.value) {
        formRef.value.clearValidate(); // 清空校验状态
      }
    })
    .catch((error) => {
      console.error("提交失败:", error);
    });
};

// 刚打开页面清空校验
onMounted(() => {
  console.log("mounted");
  // 添加延迟，确保表单完全初始化
  setTimeout(() => {
    if (formRef.value) {
      formRef.value.clearValidate();
      console.log("mounted 后清空校验");
    }
  }, 300);
});
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  .container {
    // max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    .main-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #333;
    }
  }
  .content {
    padding: 40px;
    width: 100%;
    height: 500px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
}
.input-item {
  height: 60px;
}
.onSubmitButton {
  width: 200px;
}
.dialog-content {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .content1 {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .content2 {
    font-size: 1rem;
  }
}
</style>