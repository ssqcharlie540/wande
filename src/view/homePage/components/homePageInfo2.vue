<template>
  <div class="gray-layout">
    <div class="container">
      <!-- 第一部分：关于万德 -->
      <div class="section about-section">
        <h2 class="section-title">关于万德</h2>
        <p class="section-description">
          河南万德包装有限公司成立于2021年，位于中国七朝古都的河南省安阳市，具有5000年文明史、3400多年文字史、2200多年建县史、素有“三圣之乡”(文圣周文王、武圣岳飞、医圣扁鹊)的汤阴县古贤镇新型材料产业园区。万德包装是一家集研发、生产、加工、销售于一体,专业生产工业品原料、食品、医药包装的厂家。
          公司目前拥有厂房占地面积15000㎡,具备集研发、生产、质检、仓储等完备的生产车间,拥有高效的生产流水线、科学的质量管理体系以及成熟的运营模式。配备了吹膜机、糊底机、制筒机、印刷机等行业先进的制袋设备,形成了门类齐全、品种丰富的生产工艺和生产线,可为客户提供一体化制袋综合服务。
        </p>
      </div>

      <!-- 第二部分：产品及服务 -->
      <div class="section products-section">
        <h2 class="section-title">产品及服务</h2>
        <ul class="service-list">
          <li
            v-for="(service, index) in services"
            :key="index"
            class="service-item"
          >
            {{ service }}
          </li>
        </ul>
      </div>

      <!-- 第三部分：联系方式 -->
      <div class="section contact-section">
        <h2 class="section-title">联系方式</h2>
        <div class="contact-info">
          <div class="contact-item">
            <h3 class="contact-subtitle">地址</h3>
            <p class="contact-content">XX省XX市XX区XX路XX号</p>
          </div>
          <div class="contact-item">
            <h3 class="contact-subtitle">电话</h3>
            <p class="contact-content">XXX-XXXX-XXXX</p>
          </div>
          <div class="contact-item">
            <h3 class="contact-subtitle">传真</h3>
            <p class="contact-content">XXX-XXXX-XXXX</p>
          </div>
          <div class="contact-item">
            <h3 class="contact-subtitle">Email</h3>
            <p class="contact-content">contact@wonder.com</p>
          </div>
        </div>
      </div>

      <!-- 第四部分：关注公众号 -->
      <div class="section qrcode-section">
        <h2 class="section-title">关注公众号</h2>
        <div class="qrcode-container">
          <img
            src="@/assets/首页/详情图1.png"
            alt="万德公众号二维码"
            class="qrcode-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const services = ref([
  "智能硬件解决方案",
  "工业自动化设备",
  "物联网技术开发",
  "企业定制化服务",
  "技术咨询与支持",
  "售后维护服务",
  "专业培训课程",
]);
</script>

<style scoped>
.gray-layout {
  background-color: rgb(69, 69, 69);
  /* background-color: rgb(255, 255, 255); */

  min-height: 50vh;
  padding: 40px 0;
  display: flex;
  justify-content: center;
}

.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1400px;
  width: 90%;
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
}

/* 关于万德部分 */
.about-section .section-description {
  color: #7b7b7b;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 产品及服务部分 */
.service-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.service-item {
  color: white;
  padding: 12px 0;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 0.95rem;
}

.service-item:hover {
  cursor: pointer;
}

/* 联系方式部分 */
.contact-subtitle {
  color: white;
  /* padding: px 12px; */
  font-size: 0.9rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 2px;
}

.contact-content {
  color: #7b7b7b;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

/* 公众号部分 */
.qrcode-container {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.qrcode-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
  }

  .about-section {
    grid-column: 1 / 2;
  }

  .products-section {
    grid-column: 2 / 3;
  }

  .contact-section {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  .qrcode-section {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 20px;
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

  .service-item,
  .contact-subtitle {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .gray-layout {
    padding: 20px 0;
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
}
</style>