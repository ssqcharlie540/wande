export const homeData = {
  // 公司介绍数据
  pageData: {
    title: "公司介绍",
    description: "万德包装是一家集",
    highlightWords: ["研发", "生产", "加工", "销售"],
    description2:
      "于一体,专业生产工业品原料、食品、医药包装的厂家。公司目前拥有厂房占地面积15000㎡,具备集研发、生产、质检、仓储等完备的生产车间,拥有高效的生产流水线、科学的质量管理体系以及成熟的运营模式。",
    galleryItems: [
      {
        image:
          "https://wandepack.com/image/default/6E63AE5D9BB945899ECC259251375C89-6-2.jpg", //https://www.wandepack.com/api/getImage?image=sy_gsjs_1.jpg
        title: "现代化厂房",
        description: "15000平方米标准化厂房，配备先进生产设备",
      },
      {
        image:
          "https://wandepack.com/image/default/7B337EDBADC44726B13A35927ABBC5F6-6-2.jpg", //https://www.wandepack.com/api/getImage?image=sy_gsjs_2.jpg
        title: "生产车间",
        description: "高效流水线作业，严格的生产流程控制",
      },
      {
        image:
          "https://wandepack.com/image/default/A9BF57686B904B9697420CE8CB7CCFFA-6-2.jpg", //https://www.wandepack.com/api/getImage?image=sy_gsjs_3.jpg
        title: "质检中心",
        description: "科学的质量管理体系，确保产品品质",
      },
      {
        image:
          "https://wandepack.com/image/default/FF39780190384F7E9A2077A4878054D7-6-2.jpg", //https://www.wandepack.com/api/getImage?image=sy_gsjs_4.jpg
        title: "仓储物流",
        description: "智能化仓储系统，快速物流配送",
      },
    ],
  },
  // 我们的产品
  productsData: {
    title: "我们的产品",
    productItems: [
      {
        id: 1,
        title: "阀口袋介绍",
        description:
          "阀口袋，俗称糊底袋，从顶部或底部阀口进料，采用专门灌装设备，灌装物料后自动形成长方体，具有灌装高效、堆包整齐、牢固可靠、运输方便、美观大方等特点。广泛应用于食用粉、化工粉末、化肥、合成材料、药品、矿物质等粉状或粒状的固体物料及柔性物品包装，超大尺寸阀口袋被广泛应用于气象法白炭黑行业及超细纳米级粉料的包装。是目前国际主流的环保型包装袋。",
        image: "https://www.wandepack.com/api/getImage?image=sy_fakoudai.png",
      },
      {
        id: 2,
        title: "方底袋",
        description:
          "方底袋又称开口方底袋或单头糊底袋，袋子底部经过对齐折叠胶合，充填后呈矩形，贴上牢固的盖底纸能增加强度。平整的底部在灌装或充填时会立地平稳不易撒漏，具有环保性好、牢固度高、堆垛稳定、便于识别的特点，主要应用于食用粉及添加剂、化工粉末、饲料、塑料等行业的粉粒状产品，在包装行业运用十分广泛。",
        image: "https://www.wandepack.com/api/getImage?image=sy_fangdidai.png",
      },
      {
        id: 3,
        title: "产品名称1",
        subDescription: "PE阀口袋",
        image:
          "https://wandepack.com/image/default/9EF95DCF9354492884A63BEC8911DC31-6-2.png",
      },
      {
        id: 4,
        title: "产品名称2",
        subDescription: "PE方底袋",
        image:
          "https://wandepack.com/image/default/9EF95DCF9354492884A63BEC8911DC31-6-2.png",
      },
      // {
      //   id: 5,
      //   title: "定制服务",
      //   subDescription: "个性化定制解决方案",
      //   image: "../../../assets/首页/产品2.png",
      // },
      // {
      //   id: 6,
      //   title: "快速交付",
      //   subDescription: "高效的物流配送体系",
      //   image: "../../../assets/首页/产品3.png",
      // },
    ],
  },
  // 产品优势数据tab
  tabsData: {
    title: "产品优势",
    tabsItem: [
      {
        title: "密封性好",
        inactiveIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_mfxh_1.png",
        activeIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_mfxh_2.png",
        content:
          "我们的产品采用先进的密封技术，确保包装完全密封，有效防止空气、水分和污染物进入，延长产品保质期。",
      },
      {
        title: "美观性",
        inactiveIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_mgx_1.png",
        activeIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_mgx_2.png",
        content:
          "设计精美，外观时尚，提升产品档次和品牌形象，让您的产品在货架上脱颖而出，吸引消费者目光。",
      },
      {
        title: "提高包装效率",
        inactiveIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_tgbzxl_1.png",
        activeIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_tgbzxl_2.png",
        content:
          "自动化包装流程，大幅提高包装速度，减少人工成本，提高生产效率，满足大批量生产需求。",
      },
      {
        title: "方便运输",
        inactiveIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_fbys_1.png",
        activeIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_fbys_2.png",
        content:
          "轻量化设计，结构合理，便于堆叠和搬运，降低运输成本，减少运输过程中的损坏风险。",
      },
      {
        title: "牢固性强",
        inactiveIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_lgxq_1.png",
        activeIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_lgxq_2.png",
        content:
          "采用高强度材料和加固结构，确保包装在运输和存储过程中不变形、不破损，保护产品完整性。",
      },
      {
        title: "防潮防水",
        inactiveIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_fcfs_1.png",
        activeIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_fcfs_2.png",
        content:
          "特殊防潮防水处理，有效阻隔水分侵入，保护产品免受潮湿环境影响，特别适合食品、电子产品等。",
      },
      {
        title: "绿色环保",
        inactiveIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_lshb_1.png",
        activeIcon:
          "https://www.wandepack.com/api/getImage?image=cpys_lshb_2.png",
        content:
          "采用可回收、可降解的环保材料，减少环境污染，符合国家环保标准，助力企业实现可持续发展。",
      },
    ],
  },
  // 产品应用领域
  contentData: {
    title: "产品应用领域",
    contentItem: [
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_1_tanhei.png",
        caption: "炭黑",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_2_wuyanmei.png",
        caption: "无烟煤",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_3_xiangjiao.png",
        caption: "橡胶化合物",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_4_guolvcailiao.png",
        caption: "过滤材料",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_5_shuzhi.png",
        caption: "树脂",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_6_taibaifen.png",
        caption: "钛白粉",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_7_PE_PVC.png",
        caption: "PE和PVC树脂",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_8_cuihuaji.png",
        caption: "催化剂",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_9_feiliao.png",
        caption: "肥料",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_10_gongyesha.png",
        caption: "工业砂",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_11_naihuocailiao.png",
        caption: "耐火材料",
      },
      {
        image:
          "https://www.wandepack.com/api/getImage?image=cpyyly_12_lajuhewu.png",
        caption: "蜡聚合物",
      },
    ],
  },
  // 合作客户
  heZuoKeHuData: {
    title: "合作客户",
    heZuoKeHuItem: [
      "https://www.wandepack.com/api/getImage?image=hzhb_zh_1.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_hm_2.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_dghg_3.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_xx_4.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_5.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_6.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_7.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_8.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_9.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_10.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_11.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_12.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_13.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_14.jpg",
      "https://www.wandepack.com/api/getImage?image=hzhb_15.jpg",
    ],
  },
};
// 关于万德
export const aboutData = {
  // 顶部
  aboutTopImg: {
    maintitle: "关于万德",
    backgroundImg:
      "https://wandepack.com/image/default/4876B3BECDC9418BBC0BD990E16F0E14-6-2.jpg", // https://www.wandepack.com/api/getImage?image=gywande_banner_1.jpg
  },
  // 公司简介
  gongSiJianJie: {
    leftData: {
      image:
        "https://wandepack.com/image/default/4966E24C56D04ACB98D42E841649AF9D-6-2.jpg",
      imageAlt: "公司背景图",
      content:
        "公司拥有员工100余人，其中专科及以上学历40余人，累计解决家乡劳动就业人员1000+人次;公司设有员工食堂、宿舍、洗浴间等后勤保障场所,持续改善员工工作、生活环境,为家乡经济腾飞、财政收入和乡村劳动力、大学生就业等贡献力量。公司以“做实业、创品牌、兴家乡、福邻里”为目标,科技投入,加快发展,不断提高企业核心竞争力,立志成为“中国包装行业的羚羊企业,国内知名的包装服务品牌企业”",
    },
    rightData: {
      column1: [
        {
          image:
            "https://www.wandepack.com/api/getImage?image=gywande_icon1.png",
          imageAlt: "40+",
          title: "40+",
          content: "专科及以上学历",
        },
        {
          image:
            "https://www.wandepack.com/api/getImage?image=gywande_icon2.png",
          imageAlt: "100+",
          title: "100+",
          content: "公司员工数量",
        },
      ],
      column2: [
        {
          image:
            "https://www.wandepack.com/api/getImage?image=gywande_icon3.png",
          imageAlt: "16+",
          title: "16+",
          content: "实用新型专利",
        },
        {
          image:
            "https://www.wandepack.com/api/getImage?image=gywande_icon4.png",
          imageAlt: "1000+",
          title: "1000+",
          content: "解决劳动就业人员",
        },
        {
          image:
            "https://www.wandepack.com/api/getImage?image=gywande_icon5.png",
          imageAlt: "15000㎡",
          title: "15000㎡",
          content: "拥有厂房占地面积",
        },
      ],
    },
  },
  // 时间线
  shijianxianData: [
    {
      time: "2024年11月",
      content:
        "德国W＆H全自动阀口袋糊底机设备安装调试完成，开启PE阀口袋机械化、智能化量产。",
      // name: "成都有限公司",
      // title: "欧洲天然气期货价格下跌13%至296欧元",
    },
    {
      time: "2024年06月",
      content:
        "在郑州市设立办事处，便于开展国内、国际业务，公司战略调整和业务扩大，更名为“河南万德包装有限公司”。",
      // name: "成都有限公司",
      // title: "欧洲天然气期货价格下跌13%至296欧元",
    },
    {
      time: "2024年03月",
      content: "自主研发出具有排气功能的阀口袋，解决了粉状灌装难题。",
      // name: "成都有限公司",
      // title: "欧洲天然气期货价格下跌13%至296欧元",
    },
    {
      // time: "2024年11月",
      content: "与国内三家上市企业达成年度战略合作。",
      // name: "成都有限公司",
      // title: "欧洲天然气期货价格下跌13%至296欧元",
    },
    {
      time: "2023年11月",
      content: "被评为国家级“高新技术企业”。",
      // name: "成都有限公司",
      // title: "欧洲天然气期货价格下跌13%至296欧元",
    },
    {
      // time: "2023年11月",
      content: "与国内两家知名国企达成年度合作。",
      // name: "成都有限公司",
      // title: "欧洲天然气期货价格下跌13%至296欧元",
    },
    {
      time: "2022年06月",
      content: "自主研发出第一条阀口袋。",
      // name: "成都有限公司",
      // title: "欧洲天然气期货价格下跌13%至296欧元",
    },
    {
      time: "2021年09月",
      content: "注册成立“汤阴县鑫和包装材料有限公司”。",
      // name: "成都有限公司",
      // title: "欧洲天然气期货价格下跌13%至296欧元",
    },
  ],
  // 公司文化
  gongsiwenhuaData: {
    tabs1: {
      titleImg:
        "https://www.wandepack.com/api/getImage?image=gywande_qywh_1.png",
      backimg1:
        "https://wandepack.com/image/default/891269B2B508459D848D5ACD0C5E2397-6-2.jpg",
      tabsData1: [
        {
          name: "以客户为轴心",
          props: {
            content: "超越期待的交付",
          },
        },
        {
          name: "需求精准响应",
          props: {
            content: "建立「1+N」定制服务体系（1套标准化产品+N种增值方案）",
          },
        },
        {
          name: "全周期服务保障",
          props: {
            content:
              "从方案设计、打样测试到物流跟踪，提供7×24小时技术支援，客户投诉处理时效<4小时",
          },
        },
      ],
    },
    tabs2: {
      titleImg:
        "https://www.wandepack.com/api/getImage?image=gywande_qywh_2.png",
      backimg2:
        "https://wandepack.com/image/default/3934903FC698434DB61BB4801D7C5EBF-6-2.jpg",
      tabsData2: [
        {
          name: "创新为魂",
          props: {
            content:
              "以技术突破驱动产业升级，以20项专利为基石，持续引领包装行业变革。",
          },
        },
        {
          name: "匠心为骨",
          props: {
            content:
              "恪守「零缺陷」质量准则，以IS0 9000体系为框架，铸就全国领先品质标杆。",
          },
        },
        {
          name: "绿色为脉",
          props: {
            content:
              "践行绿色发展理念，100%可回收材料应用，推动包装产业低碳转型。",
          },
        },
      ],
    },
    tabs3: {
      titleImg:
        "https://www.wandepack.com/api/getImage?image=gywande_qywh_3.png",
      backimg3:
        "https://www.wandepack.com/api/getImage?image=gywande_qywh_3_bg.jpg",
      tabsData3: [
        {
          name: "技术立企",
          props: {
            content:
              "年研发投入占比5%，整合德国精密设备与自主核心技术（如高精度薄膜打筒机），构建行业技术壁垒。",
          },
        },
        {
          name: "共赢致远",
          props: {
            content:
              "与全球优秀供应商战略协同，打造「质量共控、价值共享」的产业生态圈。",
          },
        },
        {
          name: "精益永恒",
          props: {
            content: "制造执行系统实现设备综合效率90%，持续降低客户综合成本。",
          },
        },
      ],
    },
  },
  // 员工风采
  employeeImagesData: {
    title: "员工风采",
    employeeImagesItem: [
      {
        src: "https://wandepack.com/image/default/19CB1CFFE69B4CA3806B153CD545AD1D-6-2.jpg",
        alt: "员工活动照片1",
      },
      {
        src: "https://wandepack.com/image/default/CE72DF2FAC1F436D82D3626BFECF5C0B-6-2.jpg",
        alt: "员工活动照片2",
      },
      {
        src: "https://wandepack.com/image/default/816A84B52DDA41E4ACAC6072D5CEA084-6-2.jpg",
        alt: "员工活动照片3",
      },
    ],
  },
  // 资质及荣誉
  gongsizizhiData: {
    title: "我们的资质及荣誉",
    images: [
      {
        src: "https://wandepack.com/image/default/C45C1FA7E98248F0842CC21CBEB5CCD4-6-2.jpg",
        alt: "办公室环境",
        // description: "现代化的办公环境，促进团队协作与创新",
      },
      {
        src: "https://wandepack.com/image/default/C9CB5E9D27424C9EA024777ADB3559E9-6-2.jpg",
        alt: "团队会议",
        // description: "专业的团队讨论项目细节，确保高质量交付",
      },
      {
        src: "https://wandepack.com/image/default/23686ACEA4334E579419F8546BD3E181-6-2.jpg",
        alt: "产品展示",
        // description: "我们的核心产品，设计精美且功能强大",
      },
      {
        src: "https://wandepack.com/image/default/643358460DC54D299A478C11AFEF0FBC-6-2.jpg",
        alt: "客户服务",
        // description: "专业的客户服务团队，为客户提供全方位支持",
      },
      {
        src: "https://wandepack.com/image/default/62096C613C7D4590A33519927B10E14F-6-2.jpg",
        alt: "技术研发",
        // description: "技术团队专注研发，持续推动产品创新",
      },
      {
        src: "https://wandepack.com/image/default/33635BA0551841A0859E6ABF79D082FD-6-2.jpg",
        alt: "公司活动",
        // description: "丰富的团队建设活动，增强团队凝聚力",
      },
      {
        src: "https://wandepack.com/image/default/61515261F81642A5A5F2969A90D615C4-6-2.jpg",
        alt: "工作空间",
        // description: "舒适的工作空间，激发创造力与生产力",
      },
      {
        src: "https://wandepack.com/image/default/726A9F847F93429587FC9D6B0F680BA0-6-2.jpg",
        alt: "公司文化",
      },
      {
        src: "https://wandepack.com/image/default/2209BB5C998E42BB9A94198BA3180709-6-2.jpg",
        alt: "客户服务",
        // description: "专业的客户服务团队，为客户提供全方位支持",
      },
      {
        src: "https://wandepack.com/image/default/ED983D87BF1D4D13B1B0D4C1CE0F229C-6-2.jpg",
        alt: "技术研发",
        // description: "技术团队专注研发，持续推动产品创新",
      },
      {
        src: "https://wandepack.com/image/default/21DF233E58B64AC884F808E2A041035E-6-2.jpg",
        alt: "公司活动",
        // description: "丰富的团队建设活动，增强团队凝聚力",
      },
      {
        src: "https://wandepack.com/image/default/42DE6BF224824AE4A3BE77D70997898B-6-2.jpg",
        alt: "工作空间",
        // description: "舒适的工作空间，激发创造力与生产力",
      },

      {
        src: "https://wandepack.com/image/default/FD4FAE2E199F4FD4B938A57EE79E77E8-6-2.jpg",
        alt: "工作空间",
        // description: "舒适的工作空间，激发创造力与生产力",
      },
      {
        src: "https://wandepack.com/image/default/AFD5AE21C57D4E1C806D833AE26705E0-6-2.jpg",
        alt: "工作空间",
        // description: "舒适的工作空间，激发创造力与生产力",
      },
      {
        src: "https://wandepack.com/image/default/83470D07EB9A4483BF8DE00A36C2351B-6-2.jpg",
        alt: "工作空间",
        // description: "舒适的工作空间，激发创造力与生产力",
      },
    ],
    backgroundImage:
      "https://wandepack.com/image/default/DCFD868FB31744B4BB30914F587C6784-6-2.jpg",
  },
  // 锚点 数据 href不可修改
  anchorlinkData: [
    {
      title: "公司简介",
      href: "#aboutPageBrief",
    },
    {
      title: "创新历程",
      href: "#aboutPageCourse",
    },
    {
      title: "公司文化",
      href: "#aboutPageBrief2",
    },
    {
      title: "员工风采",
      href: "#aboutPageBrief3",
    },
    {
      title: "我们的资质及荣誉",
      href: "#aboutPageBrief4",
    },
  ],
};
// 产品及服务
export const projectData = {
  proPageTopData: {
    mainTitl: "万德·PE阀口包装袋",
    subtitle: "智造守护，包装未来",
    mainImage: "https://www.wandepack.com/api/getImage?image=cpfw_banner_2.png",
    subImage: "https://www.wandepack.com/api/getImage?image=cpfw_banner_1.png",
  },
  // 生产线图片
  Imagedata: {
    Images: [
      {
        // url: "../../../../assets/产品及服务/底部1.jpg",
        url: "https://wandepack.com/image/default/1120AF61121E4B40874A3BB30517F7B8-6-2.jpg",
        alt: "Image 1",
        title: "第一张图片",
      },
      {
        // url: "../../../../assets/产品及服务/底部2.jpg",
        url: "https://wandepack.com/image/default/09956F97064B45BD92FB43B6242362D2-6-2.jpg",
        alt: "Image 2",
        title: "第二张图片",
      },
      {
        // url: "../../../../assets/产品及服务/底部3.jpg",
        url: "https://wandepack.com/image/default/62661DF6D5614CF3A950D481C0BDA6C5-6-2.jpg",

        alt: "Image 3",
        title: "第三张图片",
      },
    ],
    ImagesTitle: "匠心工艺，一流制袋生产线",
  },

  // 我们的产品
  productsData: [
    {
      id: 1,
      title: "阀口袋介绍",
      description:
        "阀口袋，俗称糊底袋，从顶部或底部阀口进料，采用专门灌装设备，灌装物料后自动形成长方体，具有灌装高效、堆包整齐、牢固可靠、运输方便、美观大方等特点。广泛应用于食用粉、化工粉末、化肥、合成材料、药品、矿物质等粉状或粒状的固体物料及柔性物品包装，超大尺寸阀口袋被广泛应用于气象法白炭黑行业及超细纳米级粉料的包装。是目前国际主流的环保型包装袋。",
      image: "https://www.wandepack.com/api/getImage?image=sy_fakoudai.png",
    },
    {
      id: 2,
      title: "方底袋",
      description:
        "方底袋又称开口方底袋或单头糊底袋，袋子底部经过对齐折叠胶合，充填后呈矩形，贴上牢固的盖底纸能增加强度。平整的底部在灌装或充填时会立地平稳不易撒漏，具有环保性好、牢固度高、堆垛稳定、便于识别的特点，主要应用于食用粉及添加剂、化工粉末、饲料、塑料等行业的粉粒状产品，在包装行业运用十分广泛。",
      image: "https://www.wandepack.com/api/getImage?image=sy_fangdidai.png",
    },
    {
      id: 3,
      title: "产品名称1",
      subDescription: "PE阀口袋",
      image:
        "https://wandepack.com/image/default/9EF95DCF9354492884A63BEC8911DC31-6-2.png",
    },
    {
      id: 4,
      title: "产品名称2",
      subDescription: "PE方底袋",
      image:
        "https://wandepack.com/image/default/9EF95DCF9354492884A63BEC8911DC31-6-2.png",
    },
    // {
    //   id: 5,
    //   title: "定制服务",
    //   subDescription: "个性化定制解决方案",
    //   image: "../../../assets/首页/产品2.png",
    // },
    // {
    //   id: 6,
    //   title: "快速交付",
    //   subDescription: "高效的物流配送体系",
    //   image: "../../../assets/首页/产品3.png",
    // },
  ],
  // 产品优势
  tabsData: [
    {
      title: "密封性好",
      inactiveIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_mfxh_1.png",
      activeIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_mfxh_2.png",
      content:
        "我们的产品采用先进的密封技术，确保包装完全密封，有效防止空气、水分和污染物进入，延长产品保质期。",
    },
    {
      title: "美观性",
      inactiveIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_mgx_1.png",
      activeIcon: "https://www.wandepack.com/api/getImage?image=cpys_mgx_2.png",
      content:
        "设计精美，外观时尚，提升产品档次和品牌形象，让您的产品在货架上脱颖而出，吸引消费者目光。",
    },
    {
      title: "提高包装效率",
      inactiveIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_tgbzxl_1.png",
      activeIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_tgbzxl_2.png",
      content:
        "自动化包装流程，大幅提高包装速度，减少人工成本，提高生产效率，满足大批量生产需求。",
    },
    {
      title: "方便运输",
      inactiveIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_fbys_1.png",
      activeIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_fbys_2.png",
      content:
        "轻量化设计，结构合理，便于堆叠和搬运，降低运输成本，减少运输过程中的损坏风险。",
    },
    {
      title: "牢固性强",
      inactiveIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_lgxq_1.png",
      activeIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_lgxq_2.png",
      content:
        "采用高强度材料和加固结构，确保包装在运输和存储过程中不变形、不破损，保护产品完整性。",
    },
    {
      title: "防潮防水",
      inactiveIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_fcfs_1.png",
      activeIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_fcfs_2.png",
      content:
        "特殊防潮防水处理，有效阻隔水分侵入，保护产品免受潮湿环境影响，特别适合食品、电子产品等。",
    },
    {
      title: "绿色环保",
      inactiveIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_lshb_1.png",
      activeIcon:
        "https://www.wandepack.com/api/getImage?image=cpys_lshb_2.png",
      content:
        "采用可回收、可降解的环保材料，减少环境污染，符合国家环保标准，助力企业实现可持续发展。",
    },
  ],
};
// 底部数据
export const footerData = {
  about: {
    title: "关于万德",
    description:
      "河南万德包装有限公司成立于2021年，位于中国七朝古都的河南省安阳市，具有5000年文明史、3400多年文字史、2200多年建县史、素有'三圣之乡'(文圣周文王、武圣岳飞、医圣扁鹊)的汤阴县古贤镇新型材料产业园区。万德包装是一家集研发、生产、加工、销售于一体,专业生产工业品原料、食品、医药包装的厂家。公司目前拥有厂房占地面积15000㎡,具备集研发、生产、质检、仓储等完备的生产车间,拥有高效的生产流水线、科学的质量管理体系以及成熟的运营模式。配备了吹膜机、糊底机、制筒机、印刷机等行业先进的制袋设备,形成了门类齐全、品种丰富的生产工艺和生产线,可为客户提供一体化制袋综合服务。",
  },
  services: {
    title: "产品及服务",
    items: ["首页", "关于万德", "全景展示", "联系我们", "ENGLISH"],
  },
  contact: {
    title: "联系方式",
    items: [
      { label: "地址", value: "XX省XX市XX区XX路XX号" },
      { label: "电话", value: "XXX-XXXX-XXXX" },
      { label: "传真", value: "XXX-XXXX-XXXX" },
      { label: "Email", value: "contact@wonder.com" },
    ],
  },
  qrCode: {
    title: "关注公众号",
    imageUrl: "https://www.wandepack.com/api/getImage?image=wande_gsh_code.jpg",
    altText: "万德公众号二维码",
  },
  footerInfo: {
    logoUrl: "https://www.wandepack.com/api/getImage?image=wande_logo_menu.png",
    companyName: "河南万德包装有限公司",
    icpNumber: "豫ICP备2025138376号-1",
  },
  backgroundImg: "https://www.wandepack.com/api/getImage?image=dibu_bg.jpg",
};
// 顶部tab
export const tabsData = [
  {
    title: "首页",
    path: "/",
    hasDropdown: false,
  },
  {
    title: "关于万德",
    path: "/about",
    hasDropdown: false,
  },
  {
    title: "产品及服务",
    path: "/products",
    hasDropdown: false,
  },
  {
    title: "全景展示",
    path: "/services",
    hasDropdown: false,
  },
  {
    title: "联系我们",
    path: "/contact",
    hasDropdown: false,
  },
  {
    title: "ENGLISH",
    // path: "",
    hasDropdown: false,
  },
];

//联系我们
export const contactData = {
  // 顶部
  aboutTopImg: {
    maintitle: "联系我们",
    backgroundImg:
      "https://wandepack.com/image/default/101C55E1F8DE42FB9A79CBE059455D62-6-2.jpg", //https://www.wandepack.com/api/getImage?image=lxwm_banner_1.jpg
  },
  lianxifangshi: {
    // title: "联系我们",
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
  },
  // 公司位置和坐标
  gongsiData: {
    title: "公司位置",
    gongsilatlng: { lat: 35.948993, lng: 114.452938 },
    gongsiLocation: "河南省安阳市汤阴县万德包装有限公司",
  },
  // 留言
  liuyanData: {
    // 标题
    title: "联系我们",
    // 表单输入框内提示
    fields: {
      name: "您的姓名",
      email: "电子邮箱",
      contact: "手机号码",
      company: "工作单位",
      content: "留言内容",
    },
    // 立即提交文字
    submitText: "立即提交",
    // 提交成功弹窗
    dialogTitle: "感谢",
    dialogMessage: "您的留言已提交成功！",
    // 表单验证信息 {field} {maxLength} 不可更换
    validationMessages: {
      required: "请填写{field}",
      maxLength: "内容不能超过{maxLength}个字",
      emailInvalid: "邮箱格式不正确", // 仅邮箱校验格式使用
    },
  },
};

// 全景图
export const qjzsData = {
  // 顶部
  aboutTopImg: {
    maintitle: "全景展示",
    backgroundImg:
      "https://wandepack.com/image/default/2A34A62DECC54B8987270561C989AAC5-6-2.png",
  },
  qjzsTitle: "生产车间",
};
