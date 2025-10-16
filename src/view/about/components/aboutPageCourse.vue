<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title" v-if="title">{{ title }}</h1>
      <div class="time-line-container">
        <div class="time-line">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in processedList"
              :key="index"
              :color="'#ff3838'"
              :size="'large'"
              :style="getAnimationDelay(index)"
            >
              <!-- 时间显示 - 仅当activity.time存在时显示 -->
              <div
                :style="Language === 'en' ? { left: '-300px' } : ''"
                class="time"
                v-if="activity.time && activity.time.length >= 7"
              >
                <div class="timeItem">
                  <div class="yearText">
                    <span
                      v-if="
                        processedList[index]?.time?.substring(0, 5) !==
                        processedList[index - 1]?.time?.substring(0, 5)
                      "
                      >{{ activity.time.split("-")[0] }}
                    </span>
                  </div>
                  <div class="month" v-if="!activity.noneTime">
                    {{ activity.time.split("-")[1] }}
                  </div>
                </div>
              </div>
              <!-- 内容 -->
              <div class="ml10">
                <div class="list-desc">
                  <div class="list-desc-text module-hover1">
                    {{ activity.content }}
                  </div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, nextTick } from "vue";

// 定义组件属性
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  list: {
    type: Array,
    default: () => [],
  },
});
const Language = ref(localStorage.getItem("Language") || "zh");

// 存储每个时间线项的实际高度
const itemHeights = ref([]);

// 处理后的列表数据
const processedList = computed(() => {
  // 这里可以对props.list进行任何处理
  return props.list.map((item, index) => {
    // 示例处理：确保时间格式正确
    if (!item.time) {
      // 添加处理逻辑，比如转换日期格式
      // console.log("当前有没有---->", item.time? formatTime(item.time) : formatTime(props.list[index-1].time));
      console.log("当前有时间的---->", item);

      return {
        ...item,
        time: formatTime(props.list[index - 1].time),
        noneTime: true, // 标记为没有时间显示
      };
    } else {
      // console.log("当前是没有事件的---->", item);

      return item;
    }

    // return item;
  });
});

// 生成动画延迟样式
const getAnimationDelay = (index) => {
  // 从0.5s开始，每个项目增加0.1s延迟
  const delay = 0.5 + index * 0.1;
  return { "--animation-delay": `${delay}s` };
};

// 辅助函数：格式化时间（如果需要）
function formatTime(timeStr) {
  // 这里添加您的日期格式化逻辑
  return timeStr; // 暂时返回原值
}

// 在组件挂载后计算每个项目的高度
onMounted(() => {
  nextTick(() => {
    // 获取所有时间线项的高度
    const items = document.querySelectorAll(".el-timeline-item");
    items.forEach((item, index) => {
      itemHeights.value[index] = item.offsetHeight;
    });
  });
});
</script>

<style lang="scss" scoped>
/* 保持原有的样式不变 */
.homePageContent {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}

.main-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #333;
  position: relative;
}

.time-line-container {
  display: flex;
  margin-top: 50px;
  position: relative;
  opacity: 0;
  transform: translateY(-30px);
  animation: fadeInDown 1s ease-out forwards;
  animation-delay: 0.3s;
}

// 年份时间线样式
.year-timeline {
  width: 150px;
  margin-right: 30px;
  position: relative;
  min-height: 900px;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.5s;
}

.year-item {
  position: absolute;
  left: -30px;
  display: flex;
  align-items: center;
  z-index: 2;
  opacity: 0;
  animation: fadeInUpItem 0.6s ease-out forwards;
  animation-delay: var(--animation-delay, 0.5s);

  .year-text {
    color: #0b0b0b;
    font-size: 28px;
    font-weight: bold;
    border-radius: 20px;
    white-space: nowrap;
  }
}

.time-line {
  flex: 1;
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: 0.5s;

  :deep(.el-timeline) {
    padding-left: 10px; // 为时间线留出空间
  }

  :deep(.el-timeline-item) {
    padding: 0;
    margin-bottom: 20px;
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUpItem 0.6s ease-out forwards;
    animation-delay: var(--animation-delay, 0.5s);

    // 修复时间线位置，从节点中心开始
    &:not(:last-child) .el-timeline-item__tail {
      top: 10px; // 从节点中心开始
      height: calc(100% + 10px); // 延伸到下一个节点的中心
      border-left: 2px solid #aeaeae;
      left: 8px;
      // opacity: 0;
      // animation: drawLine 0.8s ease-out forwards;
      // animation-delay: calc(var(--animation-delay, 0.5s) + 0.2s);
    }

    // 最后一个项目不需要时间线
    &:last-child .el-timeline-item__tail {
      display: none;
    }
  }

  :deep(.el-timeline-item__timestamp.is-bottom) {
    margin: 0;
  }

  // 自定义时间线节点样式 - 红色实心带外圈
  :deep(.el-timeline-item__node) {
    background-color: #ff3838;
    border: 3px solid #fff;
    box-shadow: 0 0 0 2px #ff3838;
    top: 0;
    left: 0;
    transform: translate(-50%, 0);
    opacity: 0;
    animation: fadeInUpItem 0.6s ease-out forwards;
    animation-delay: var(--animation-delay, 0.5s);

    &.el-timeline-item__node--large {
      width: 16px;
      height: 16px;
    }
  }
}

.list-title {
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #181b1e;
}

.list-company {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2991ff;
  margin-top: 15px;
  margin-bottom: 15px;
}

.list-desc {
  min-height: 80px;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  margin-bottom: 20px;
  .list-desc-text {
    box-shadow: 0 7px 20px #bebebe;
    padding: 20px 30px;
    border-radius: 10px;
    line-height: 1.6;
  }
}

//左侧时间
.time {
  color: #409eff;
  position: absolute;
  left: -200px;
  top: 1px;
  .timeItem {
    display: flex;
    .yearText {
      font-size: 30px;
      color: #000000;
      width: 130px;
      position: relative;
      top: -20px;
    }
    .month {
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #20354a;
    }
  }

  .day {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #596878;
    text-align: center;
    margin-top: 10px;
  }
}

.ml10 {
  margin-left: 10px;
}

@media (max-width: 768px) {
  .time-line-container {
    flex-direction: column;
  }

  .year-timeline {
    width: 100%;
    margin-right: 0;
    margin-bottom: 30px;
    min-height: auto;
    height: auto;
  }

  .year-item {
    position: relative;
    margin-bottom: 20px;
    left: auto !important;
    top: auto !important;
  }

  .time-line {
    margin-left: 0;
    padding-left: 20px;
  }

  .time {
    position: static;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .day {
      margin-top: 0;
      margin-left: 10px;
    }
  }
}

// 时间线绘制动画

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUpItem {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>