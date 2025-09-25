<template>
  <div
    class="footer-container"
    :style="{
      backgroundImage: `url(${getImageUrl(footerData.backgroundImg)})`,
    }"
  >
    <div class="gray-layout">
      <div class="container">
        <!-- 第一部分：关于万德 -->
        <div class="section about-section">
          <h2 class="section-title">{{ footerData?.about?.title }}</h2>
          <p class="section-description">
            {{ footerData?.about?.description }}
          </p>
        </div>

        <!-- 第二部分：产品及服务 -->
        <div class="section products-section">
          <ul class="service-list">
            <li
              v-for="(service, index) in footerData?.services?.items"
              :key="index"
              class="service-item"
              @click="navigateTo(service.path)"
            >
              <span class="service-text">
                {{ service.title }}
              </span>
            </li>
          </ul>
        </div>

        <!-- 第三部分：联系方式 -->
        <div class="section">
          <h2 class="section-title">{{ footerData?.contact?.title }}</h2>
          <div class="contact-info">
            <div
              v-for="(item, index) in footerData?.contact?.items"
              :key="index"
              class="contact-item"
            >
              <div class="contact-subtitle">{{ item.label }}</div>
              <div class="contact-content">{{ item.value }}</div>
            </div>
          </div>
        </div>

        <!-- 第四部分：关注公众号 -->
        <div class="section qrcode-section">
          <h2 class="section-title">{{ footerData?.qrCode?.title }}</h2>
          <div>
            <img
              :src="getImageUrl(footerData?.qrCode?.imageUrl)"
              :alt="footerData?.qrCode?.altText"
              class="qrcode-image"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="Divider" />
    <div class="gray-layout">
      <div class="buttomItem">
        <div class="buttomItem-left">
          <img
            :src="getImageUrl(footerData?.footerInfo?.logoUrl)"
            class="tab-logo"
            :alt="footerData?.footerInfo?.companyName"
          />
          <span class="tabSpan">{{ footerData?.footerInfo?.companyName }}</span>
        </div>
        <div class="ICPCla">{{ footerData?.footerInfo?.icpNumber }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getImageUrl } from "@/util/utils.js";
const router = useRouter();
// 定义组件属性
const props = defineProps({
  footerData: {
    type: Object,
    default: () => ({}),
  },
});
const navigateTo = (path) => {
  console.log("Navigating to:", path);

  router.push(path);
};
</script>

<style scoped lang="scss">
.footer-container {
  .Divider {
    height: 1px;
    background-color: #707070;
  }
  // 背景图片样式
  .gray-layout {
    // background-image: url("dibu_bg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    // 添加半透明遮罩，提高文字可读性
    position: relative;

    // &::before {
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   background: rgba(0, 0, 0, 0.7); // 深色半透明遮罩
    //   z-index: 1;
    // }

    > * {
      position: relative;
      z-index: 2;
    }
  }
}

.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 70%;
  margin: 0 auto;
}

.section {
  border-radius: 8px;
  padding: 25px;
}

.section-title {
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  position: relative;
}

// 关于万德部分
.about-section {
  width: 700px;
  .section-description {
    width: 100%;
    max-width: 700px;
    color: #cccccc;
    line-height: 1.8;
    font-size: 0.95rem;
    text-align: justify;
  }
}

// 产品及服务部分
.service-list {
  list-style-type: none;
  padding: 10px 0;
  margin: 0;
}

.service-item {
  color: #ffffff;
  padding: 12px 0;
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  padding-left: 20px;

  .service-text {
    position: relative;
    padding-bottom: 5px;
    cursor: pointer;
    transition: color 0.3s ease;

    // 下划线初始状态
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%; // 从中心开始
      width: 0%; // 初始宽度为0
      height: 2px;
      background: rgb(255, 0, 0);
      opacity: 0;
      transition: all 0.4s ease;
      transform: translateX(-50%); // 居中定位
    }

    // 悬停效果
    &:hover {
      color: #d8b280;

      &::before {
        width: 100%; // 扩展到100%宽度
        opacity: 1;
      }
    }
  }
}
// 联系方式部分
.contact-item {
  margin-bottom: 15px;
}

.contact-subtitle {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.contact-content {
  color: #cccccc;
  font-size: 0.9rem;
  line-height: 1.4;
}

// 公众号部分
.qrcode-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

// 底部信息
.buttomItem {
  display: flex;
  width: 70%;
  padding: 20px 0;
  align-items: center;
  justify-content: space-between;
  .buttomItem-left {
    display: flex;
    align-items: center;
  }

  .tab-logo {
    width: 200px;
    margin-right: 10px;
    position: relative;
    top: -5px;
  }

  .tabSpan {
    font-size: 30px;
    color: #ffffff;
    font-weight: bold;
  }
}

.ICPCla {
  color: #ffffff;
  font-size: 0.9rem;
}

// 响应式设计
@media (max-width: 1200px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
    width: 85%;
  }

  .about-section {
    grid-column: 1 / 3;
  }

  .products-section {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  .contact-section {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  .qrcode-section {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    text-align: center;
  }

  .buttomItem {
    width: 85%;
    flex-direction: column;
    gap: 20px;
    text-align: center;

    .tabSpan {
      font-size: 24px;
    }
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 20px;
    width: 90%;
  }

  .about-section,
  .products-section,
  .contact-section,
  .qrcode-section {
    grid-column: auto;
    grid-row: auto;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .service-item {
    font-size: 1.1rem;
  }

  .buttomItem {
    width: 90%;

    .tab-logo {
      width: 180px;
    }

    .tabSpan {
      font-size: 20px;
    }
  }
}

@media (max-width: 480px) {
  .footer-container {
    .gray-layout {
      padding: 20px 0;
    }
  }

  .container {
    width: 95%;
  }

  .section {
    padding: 15px;
  }

  .qrcode-image {
    width: 120px;
    height: 120px;
  }

  .buttomItem {
    width: 95%;

    .tab-logo {
      width: 150px;
    }

    .tabSpan {
      font-size: 18px;
    }

    .ICPCla {
      font-size: 0.8rem;
    }
  }
}
</style>