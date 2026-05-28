export type Locale = "en" | "zh";

export const content = {
  en: {
    nav: ["Services", "AI Platform", "Industries", "Quote", "Contact"],
    heroBadge: "Joma Logistics Incorporated",
    heroTitle: "AI-Powered Freight, Customs & Delivery Solutions",
    heroSubtitle:
      "Ocean freight, air freight, customs clearance support, Amazon delivery coordination, trucking, warehousing, and AI-assisted shipment document review for importers and logistics partners.",
    primaryCta: "Get a Freight Quote",
    secondaryCta: "Upload Shipment Documents",
    trust: ["Freight Forwarding", "Customs Support", "Amazon Delivery", "AI Document Review"],
    servicesTitle: "Integrated Logistics Services",
    servicesSubtitle: "One operating workflow from shipment planning to final delivery.",
    services: [
      ["Ocean Freight", "FCL/LCL coordination, routing support, carrier communication, and delivery planning."],
      ["Air Freight", "Time-sensitive shipment coordination with document and destination support."],
      ["Customs Clearance Support", "Importer documentation review, HTS risk flagging, bond guidance, and broker coordination."],
      ["Amazon FBA / Warehouse Delivery", "Appointment support, ISA tracking, carrier coordination, and delivery exception follow-up."],
      ["Trucking & Drayage", "Port, rail, warehouse, and final-mile delivery coordination across the United States."],
      ["AI Document Review", "Upload invoices, packing lists, and BOLs for OCR extraction and shipment summary creation."]
    ],
    aiTitle: "Joma AI Customs & Freight Assistant",
    aiSubtitle:
      "A smarter front-end workflow for shipment document intake, quote preparation, and customs risk review.",
    aiSteps: [
      "Upload Commercial Invoice / Packing List / BOL",
      "AI OCR extracts shipper, consignee, HTS, value, weight, and carton data",
      "System flags customs risk: missing data, HTS issue, bond need, 301 / AD-CVD review required",
      "Generate a quote-ready shipment summary for the operations team"
    ],
    uploadTitle: "Upload Shipment Documents",
    uploadHelp: "PDF, JPG, PNG, XLSX, DOCX supported. This demo UI can be connected to Vercel Blob + OCR API.",
    industriesTitle: "Industries Served",
    industries: ["Amazon FBA Sellers", "Importers", "E-commerce Brands", "Manufacturers", "Freight Partners", "Warehouses"],
    whyTitle: "Why Joma",
    why: [
      ["Fast response", "Quote and exception workflows designed for time-sensitive logistics."],
      ["Compliance-minded", "Clear document review process before freight or customs problems become expensive."],
      ["U.S.-based support", "Practical communication for importers, carriers, warehouses, and delivery sites."],
      ["AI-ready platform", "Designed to expand into OCR, tariff calculator, shipment dashboard, and customer portal."]
    ],
    quoteTitle: "Request a Quote",
    quoteSubtitle: "Send shipment details and our team will review the route, documents, and delivery requirements.",
    complianceTitle: "Compliance Notice",
    complianceText:
      "AI analysis is for preliminary document review and operational support only. Final customs classification, duty calculation, admissibility, and regulatory determinations should be confirmed by a licensed customs broker or qualified compliance professional.",
    footer: "Efficient Logistics. Smarter Customs. AI-Powered Solutions."
  },
  zh: {
    nav: ["服务", "AI平台", "行业", "询价", "联系"],
    heroBadge: "Joma Logistics Incorporated",
    heroTitle: "AI驱动的物流、清关与派送解决方案",
    heroSubtitle:
      "为进口商和物流合作伙伴提供海运、空运、清关支持、Amazon仓库预约派送、卡车运输、仓储协调，以及AI文件审核。",
    primaryCta: "获取运费报价",
    secondaryCta: "上传运输文件",
    trust: ["国际货代", "清关支持", "Amazon派送", "AI文件审核"],
    servicesTitle: "一体化物流服务",
    servicesSubtitle: "从运输计划、文件审核到最终派送，形成完整操作流程。",
    services: [
      ["海运", "FCL/LCL订舱协调、路线安排、船公司沟通和派送计划。"],
      ["空运", "适合时效要求高的货物，支持文件与目的港派送协调。"],
      ["清关支持", "进口文件审核、HTS风险提示、Bond建议和报关行协调。"],
      ["Amazon FBA / 仓库派送", "预约支持、ISA追踪、承运人协调和异常派送跟进。"],
      ["卡车与拖车", "港口、铁路、仓库、末端派送等美国境内运输协调。"],
      ["AI文件审核", "上传发票、装箱单、BOL，自动OCR提取并生成货物摘要。"]
    ],
    aiTitle: "Joma AI 清关与物流助手",
    aiSubtitle: "用于客户文件上传、报价准备、清关风险初审的智能前端流程。",
    aiSteps: [
      "上传 Commercial Invoice / Packing List / BOL",
      "AI OCR 自动提取发货人、收货人、HTS、货值、重量、箱数等信息",
      "自动提示清关风险：资料缺失、HTS异常、Bond需求、301 / AD-CVD风险",
      "生成可用于报价和操作的 Shipment Summary"
    ],
    uploadTitle: "上传运输文件",
    uploadHelp: "支持 PDF、JPG、PNG、XLSX、DOCX。此上传界面可连接 Vercel Blob + OCR API。",
    industriesTitle: "服务行业",
    industries: ["Amazon FBA卖家", "进口商", "电商品牌", "制造商", "货代伙伴", "仓库"],
    whyTitle: "为什么选择 Joma",
    why: [
      ["响应快", "报价和异常处理流程适合高时效物流场景。"],
      ["重视合规", "在物流或清关问题变贵之前，先做文件和风险审核。"],
      ["美国本地支持", "方便与进口商、车队、仓库和派送站点沟通。"],
      ["可升级AI平台", "未来可扩展 OCR、税率计算器、Shipment Dashboard 和客户门户。"]
    ],
    quoteTitle: "提交询价",
    quoteSubtitle: "发送货物信息后，团队可审核路线、文件和派送要求。",
    complianceTitle: "合规免责声明",
    complianceText:
      "AI分析仅用于初步文件审核和操作支持。最终HTS归类、税费计算、进口合规和监管判断，应由持牌报关行或合规专业人员确认。",
    footer: "高效物流，智能清关，AI驱动供应链。"
  }
} as const;
