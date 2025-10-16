<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 标题 -->
      <h1 class="main-title">{{ contactData.title }}</h1>

      <!-- 左右卡片布局 -->
      <div class="cards-container">
        <!-- 左侧卡片 -->
        <div class="card">
          <div class="card-content">
            <!-- <div class="icon-wrapper">
              <component :is="contactData.leftCard.icon" class="icon" />
            </div> -->
            <div class="contact-type">{{ contactData.leftCard.type }}</div>
            <div class="contact-info">{{ contactData.leftCard.phone }}</div>
            <div class="contact-info" v-if="contactData.leftCard.WhatsApp">
              {{ contactData.leftCard.WhatsApp }}
            </div>
            <div class="contact-email">{{ contactData.leftCard.email }}</div>
            <div class="contact-email" v-if="contactData.leftCard.address">
              {{ contactData.leftCard.address }}
            </div>
            <div class="contact-desc">{{ contactData.leftCard.desc }}</div>
          </div>
        </div>

        <!-- 右侧卡片 -->
        <div class="card">
          <div class="card-content">
            <!-- <div class="icon-wrapper">
              <component :is="contactData.rightCard.icon" class="icon" />
            </div> -->
            <div class="contact-type">{{ contactData.rightCard.type }}</div>
            <div class="contact-info">{{ contactData.rightCard.phone }}</div>
            <div class="contact-info" v-if="contactData.rightCard.WhatsApp">
              {{ contactData.rightCard.WhatsApp }}
            </div>
            <div class="contact-email">{{ contactData.rightCard.email }}</div>
            <div class="contact-email" v-if="contactData.rightCard.address">
              {{ contactData.rightCard.address }}
            </div>
            <div class="contact-desc">{{ contactData.rightCard.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  contactData: {
    type: Object,
    default: () => ({
      title: "联系我们",
      leftCard: {
        icon: "SalesIcon",
        type: "销售咨询",
        phone: "400-123-4567",
        email: "sales@company.com",
        desc: "工作日 9:00-18:00",
      },
      rightCard: {
        icon: "SupportIcon",
        type: "技术支持",
        phone: "400-987-6543",
        email: "support@company.com",
        desc: "7×24小时服务",
      },
    }),
  },
});

// 图标组件 - 在实际项目中可以从外部导入
const SalesIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
    </svg>
  `,
};

const SupportIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  `,
};
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  padding: 40px 0;
  background-color: #f8f9fa;

  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;

    .main-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 50px;
      color: #333;
      position: relative;
    }

    .cards-container {
      display: flex;
      justify-content: space-between;
      gap: 30px;

      .card {
        flex: 1;
        background: #fff;
        border-radius: 16px;
        padding: 50px 40px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          text-align: left;
          justify-content: center;

          div {
            margin: 0;
            padding: 0;
          }
          .icon-wrapper {
            margin-bottom: 25px;

            .icon {
              width: 50px;
              height: 50px;
              color: #4e73df;
            }
          }

          .contact-type {
            font-size: 1.5rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 15px;
          }

          .contact-info {
            font-size: 1.35rem;
            font-weight: 600;
            color: #4e73df;
            margin-bottom: 12px;
          }

          .contact-email {
            font-size: 1.1rem;
            color: #555;
            margin-bottom: 10px;
          }

          .contact-desc {
            font-size: 0.95rem;
            color: #777;
            margin-top: 5px;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 992px) {
  .homePageContent {
    .container {
      .cards-container {
        gap: 20px;

        .card {
          padding: 30px 25px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .homePageContent {
    .container {
      .cards-container {
        flex-direction: column;

        .card {
          .card-content {
            .icon-wrapper .icon {
              width: 45px;
              height: 45px;
            }

            .contact-type {
              font-size: 1.3rem;
            }

            .contact-info {
              font-size: 1.2rem;
            }

            .contact-email {
              font-size: 1rem;
            }

            .contact-desc {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .homePageContent {
    padding: 30px 0;

    .container {
      padding: 15px;

      .main-title {
        font-size: 2rem;
        margin-bottom: 40px;
      }

      .cards-container {
        .card {
          padding: 25px 20px;

          .card-content {
            .icon-wrapper {
              margin-bottom: 20px;

              .icon {
                width: 40px;
                height: 40px;
              }
            }

            .contact-type {
              font-size: 1.2rem;
            }

            .contact-info {
              font-size: 1.1rem;
            }
          }
        }
      }
    }
  }
}
</style>