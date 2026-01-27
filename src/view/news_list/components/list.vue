<template>
  <div class="items-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="item"
      @mouseenter="hoverIndex = index"
      @mouseleave="hoverIndex = -1"
      @click="goToNewsDetail(item)"
    >
      <!-- 左侧图片 - 加大尺寸 -->
      <div class="item-left">
        <img
          :src="item.image"
          :alt="item.title"
          class="item-image"
          :class="{ 'image-hover': hoverIndex === index }"
        />
      </div>

      <!-- 中间文字区域 -->
      <div class="item-center">
        <h3 class="item-title">{{ item.title }}</h3>
        <h3 class="item-title item-title2">{{ item.title_2 }}</h3>
        <p class="item-content">{{ item.content }}</p>
      </div>

      <!-- 右侧时间 -->
      <div class="item-right">
        <div class="days">{{ formatDays(item.time) }}</div>
        <div class="date">{{ formatDate(item.time) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// 定义 props
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const router = useRouter();
const hoverIndex = ref(-1);

// 跳转到新闻详情页
const goToNewsDetail = (item) => {
  console.log("跳转详情页面--》", item);
  // 方式1: 直接跳转到固定路由
  // router.push({
  //   path: "/news_detail",
  //   query: {
  //     data: JSON.stringify(item),
  //   },
  // });
  // 将对象转换成JSON字符串并存入sessionStorage
  sessionStorage.setItem("newsItemData", JSON.stringify(item));
  window.location.href = "/news_detail";
};

// 从时间字段中提取天数
const formatDays = (time) => {
  if (!time) return "0";
  // 假设时间格式为 "2024-06-15" 或时间戳
  if (typeof time === "string" && time.includes("-")) {
    return time.split("-")[2]; // 获取天数
  } else if (typeof time === "number") {
    // 如果是时间戳，转换为日期并获取天数
    const date = new Date(time);
    return date.getDate().toString();
  }
  return "0";
};

// 格式化日期为 YYYY/MM
const formatDate = (time) => {
  if (!time) return "2024/06";

  let date;
  if (typeof time === "string" && time.includes("-")) {
    date = new Date(time);
  } else if (typeof time === "number") {
    date = new Date(time);
  } else {
    return "2024/06";
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}/${month}`;
};
</script>

<style scoped>
.items-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.item {
  display: flex;
  align-items: stretch;
  background-color: #eff1f5;
  padding: 0;
  margin-bottom: 40px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  min-height: 240px;
  cursor: pointer;
}

/* 悬浮效果 - 阴影加深 */
.item:hover {
  background-color: #ffffff;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  border: 1px solid #e8e8e8;
  transform: translateY(-4px);
}

/* 左侧图片区域 */
.item-left {
  flex: 0 0 300px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 图片悬浮效果 - 更明显 */
.image-hover {
  transform: scale(1.12);
  filter: brightness(1.05);
}

/* 中间文字区域 */
.item-center {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 默认状态标题颜色，悬浮时改为蓝色 */
.item-title {
  color: #333333;
  font-size: 22px !important;
  margin: 0 0 12px 0;
  line-height: 1.3;
  transition: all 0.3s ease;
  font-weight: 600;
}

.item:hover .item-title {
  color: #d8b280; /* 悬浮时改为蓝色 */
  transform: translateX(2px);
}
.item-title2 {
  font-size: 20px !important;
  font-weight: 400;
}

/* 内容文字减小8px */
.item-content {
  color: #707070;
  font-size: 16px;
  margin: 0;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.item:hover .item-content {
  color: #555555;
  transform: translateX(2px);
}

/* 右侧时间区域 */
.item-right {
  flex: 0 0 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  /* border-left: 1px solid rgba(0, 0, 0, 0.1); */
  transition: all 0.3s ease;
}

/* 默认状态时间颜色，悬浮时改为蓝色 */
.days {
  font-size: 42px;
  font-weight: 800;
  color: #333333;
  margin-bottom: 6px;
  transition: all 0.3s ease;
}

.item:hover .days {
  color: #d8b280;
  transform: scale(1.05);
}

.date {
  font-size: 18px;
  color: #707070;
  transition: all 0.3s ease;
}

.item:hover .date {
  color: #d8b280;
  transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .item {
    flex-direction: column;
    min-height: auto;
  }

  .item-left {
    flex: 0 0 220px;
    width: 100%;
  }

  .item-image {
    height: 220px;
  }

  .item-center {
    padding: 18px 15px;
  }

  .item-title {
    font-size: 22px;
  }

  .item-content {
    font-size: 15px;
  }

  .item-right {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    border-left: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px;
  }

  .item:hover .item-right {
    border-top-color: rgba(32, 70, 132, 0.2);
  }

  .days {
    font-size: 36px;
    margin-bottom: 0;
  }

  .date {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .items-container {
    padding: 10px;
  }

  .item {
    margin-bottom: 15px;
  }

  .item-left {
    flex: 0 0 180px;
  }

  .item-image {
    height: 180px;
  }

  .item-title {
    font-size: 20px;
  }

  .item-content {
    font-size: 14px;
  }

  .days {
    font-size: 32px;
  }

  .date {
    font-size: 18px;
  }
}
</style>