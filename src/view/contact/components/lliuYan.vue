<!-- 成功提示弹窗 -->
<template>
  <div class="homePageContent">
    <div class="container">
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
                      :placeholder="config.fields.name"
                      v-model="formModel.name"
                      autocomplete="off"
                      maxlength="50"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="name1" :label-width="formLabelWidth">
                    <el-input
                      class="input-item"
                      :placeholder="config.fields.email"
                      v-model="formModel.name1"
                      autocomplete="off"
                      maxlength="50"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="name2" :label-width="formLabelWidth">
                    <el-input
                      class="input-item"
                      :placeholder="config.fields.contact"
                      v-model="formModel.name2"
                      autocomplete="off"
                      maxlength="50"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="name3" :label-width="formLabelWidth">
                    <el-input
                      class="input-item"
                      :placeholder="config.fields.company"
                      v-model="formModel.name3"
                      autocomplete="off"
                      maxlength="50"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="name4" :label-width="formLabelWidth">
                    <el-input
                      style="height: 160px"
                      :placeholder="config.fields.content"
                      v-model="formModel.name4"
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
                    >{{ config.submitText }}</el-button
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
import { ref, computed } from "vue";
import { emailRegex } from "@/util/utils.js";

// 默认配置
const defaultConfig = {};

// 定义props
const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
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
    name1: "",
    name2: "",
    name3: "",
    name4: "",
  };
};
const formModel = ref(generateFrom());
const formRef = ref(null);

// 生成校验规则
const generateRule = (fieldName, maxLength = 50) => [
  {
    required: true,
    message: mergedConfig.value.validationMessages.required.replace(
      "{field}",
      fieldName
    ),
    trigger: "blur",
  },
  {
    min: 1,
    max: maxLength,
    message: mergedConfig.value.validationMessages.maxLength.replace(
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
  name1: [...generateRule(mergedConfig.value.fields.email), emailRule],
  name2: generateRule(mergedConfig.value.fields.contact),
  name3: generateRule(mergedConfig.value.fields.company),
  name4: generateRule(mergedConfig.value.fields.content, 1000),
}));

const dialogVisible = ref(false);
const onSubmit = () => {
  console.log("submit!");
  formRef.value.validate((valid) => {
    if (valid) {
      console.log("submit!", formModel.value);
      dialogVisible.value = true;
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  .container {
    max-width: 1200px;
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