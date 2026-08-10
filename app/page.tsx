'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Linkedin, Mail } from 'lucide-react';

type Language = 'en' | 'ko';
type NavTab = 'home' | 'team' | 'services' | 'news' | 'contact';

type TeamMember = {
  id: string;
  name: { en: string; ko: string };
  role: { en: string; ko: string };
  image: string;
  fallbackImage: string;
  linkedIn?: string;
  bullets: {
    en: string[];
    ko: string[];
  };
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'wonku-lee',
    name: { en: 'Wonku Lee', ko: '이원구' },
    role: { en: 'CEO', ko: '대표' },
    image: 'https://drive.google.com/thumbnail?id=1wfXFEsR7ughP17zR2d9qST5HrsuVsOqz&sz=w1280',
    fallbackImage: 'https://drive.google.com/thumbnail?id=1wfXFEsR7ughP17zR2d9qST5HrsuVsOqz&sz=w1280',
    linkedIn: 'https://www.linkedin.com/in/william-wonku-lee',
    bullets: {
      en: [
        'Chartered Financial Analyst (CFA)',
        'U.S. & Canada CPA',
        'Canada Business Valuator (CBV)',
        'University of Waterloo, B.Math & B.Acc.',
        'University of Waterloo, M.Acc.',
        'University of Seoul, M.S. in Taxation',
        'Korea University, MBA'
      ],
      ko: [
        'Chartered Financial Analyst (CFA)',
        '미국·캐나다 공인회계사',
        '캐나다 기업가치평가사',
        '워터루대학교, 수학·회계 학사',
        '워터루대학교, 회계학 석사',
        '서울시립대학교, 세무학 석사',
        '고려대학교, 경영학 석사'
      ]
    }
  },
  {
    id: 'janghoon-kim',
    name: { en: 'Janghoon Kim', ko: '김장훈' },
    role: { en: 'Vice Chairman', ko: '부대표' },
    image: 'https://drive.google.com/thumbnail?id=1RMOadnGgmPl2bz3dfcCuouN04SDtL2Bb&sz=w1280',
    fallbackImage: 'https://drive.google.com/thumbnail?id=1RMOadnGgmPl2bz3dfcCuouN04SDtL2Bb&sz=w1280',
    bullets: {
      en: [
        'NYU, M.S. in Financial Engineering',
        'Seoul National University, MBA',
        'Seoul National University, B.A. in Statistics'
      ],
      ko: [
        'NYU, 금융공학 석사',
        '서울대학교, 경영학 석사',
        '서울대학교, 통계학 학사'
      ]
    }
  },
  {
    id: 'moonhyun-kang',
    name: { en: 'Moonhyun Kang', ko: '강문현' },
    role: { en: 'Senior Advisor', ko: '고문' },
    image: 'https://drive.google.com/thumbnail?id=13NzBPNsk3mFJMdPFt2RrD5jfLOsUNkm-&sz=w1280',
    fallbackImage: 'https://drive.google.com/thumbnail?id=13NzBPNsk3mFJMdPFt2RrD5jfLOsUNkm-&sz=w1280',
    bullets: {
      en: [
        'U.S. CPA',
        'London Business School, M.S. in Finance',
        'Inha University, Ph.D. in Business Administration'
      ],
      ko: [
        '미국 공인회계사',
        'LBS (런던 비즈니스 스쿨), 금융학 석사',
        '인하대학교, 경영학 박사'
      ]
    }
  },
  {
    id: 'traves-lee',
    name: { en: 'Traves Lee', ko: '이기현' },
    role: { en: 'Analyst', ko: '애널리스트' },
    image: 'https://lh3.googleusercontent.com/d/1mPStub5yTrt-aTavXbCPItYIftA6TTcr=s1000',
    fallbackImage: 'https://drive.google.com/thumbnail?id=1mPStub5yTrt-aTavXbCPItYIftA6TTcr&sz=w1000',
    linkedIn: 'https://www.linkedin.com/in/traves-lee-30207521a/',
    bullets: {
      en: [
        'University of Southern California, B.S. in International Business & Finance',
        'CFA Level 1 Candidate'
      ],
      ko: [
        '서던캘리포니아대학교 (USC), 국제경영·금융',
        'CFA Level 1 Candidate'
      ]
    }
  }
];

type ServiceItem = {
  id: string;
  num: string;
  title: { en: string; ko: string };
  desc: { en: string; ko: string };
};

const SERVICES: ServiceItem[] = [
  {
    id: 'buy-side',
    num: '01',
    title: { en: 'Buy-side Advisory', ko: '인수자문' },
    desc: {
      en: 'We provide advisory services across the entire acquisition process, from target search matching acquisition criteria to deal execution for corporate clients. We advise private equity clients on bolt-on, buyout, and growth capital investment opportunities.',
      ko: '기업 고객들에게 인수 요건에 부합하는 국내외 매물 발굴 및 딜종결까지 인수의 전 과정에서 자문을 제공합니다. 사모펀드 고객들에게 볼트온, 바이아웃 및 성장 자본 투자 기회에 대해 자문을 제공합니다.'
    }
  },
  {
    id: 'sell-side',
    num: '02',
    title: { en: 'Sell-side Advisory', ko: '매각자문' },
    desc: {
      en: 'We provide sell-side advisory for founders seeking company exit. For corporate clients, we advise on divestitures of subsidiaries or business units, and for private equity funds, portfolio company exit advisory.',
      ko: '저희는 창업자의 회사 매각을 위한 자문을 제공합니다. 기업 고객들의 경우 자회사 또는 사업 부문 매각 관련 자문을 제공하며, 사모펀드의 경우 포트폴리오 회사 매각을 위한 자문을 제공합니다.'
    }
  },
  {
    id: 'capital-raising',
    num: '03',
    title: { en: 'Capital Raising / Fundraising', ko: '투자유치' },
    desc: {
      en: 'We advise startups and corporate clients on securing external investment. Based on extensive experience, we assist in raising capital under optimal terms through structured financial advisory.',
      ko: '저희는 스타트업 및 기업 고객들의 외부 투자유치를 자문합니다. 많은 경험을 토대로 적절한 자문을 통해 합리적인 조건에 투자 받을 수 있도록 도와드립니다.'
    }
  },
  {
    id: 'strategic-advisory',
    num: '04',
    title: { en: 'Strategic Advisory', ko: '전략자문' },
    desc: {
      en: 'We provide diverse strategic advisory services tailored to founder and corporate requests, including exit strategy formulation and internal portfolio reviews to derive value-enhancement initiatives.',
      ko: '저희는 성공적인 매각을 위한 전략 방안 수립, 내부 전략 검토를 통해 개선 방안 도출 등 창업자와 기업 고객들의 요청에 따라 다양한 전략자문 서비스를 제공합니다.'
    }
  },
  {
    id: 'valuation',
    num: '05',
    title: { en: 'Valuation Advisory', ko: '가치평가' },
    desc: {
      en: 'To facilitate successful M&A and fundraising, we provide expected realistic valuation assessments based on market dynamics and offer strategic advice on key valuation drivers.',
      ko: '성공적인 매각, 인수 및 투자유치를 위해 저희의 경험과 현재 시장 상황을 고려하여 창업자 및 기업 고객들에게 거래 가능할 것으로 예상되는 가치 및 해당 가치를 증진 시키는 방안에 대한 자문을 제공합니다.'
    }
  },
  {
    id: 'startup-advisory',
    num: '06',
    title: { en: 'Startup Advisory', ko: '스타트업 자문' },
    desc: {
      en: 'We serve as an external CFO for startups without dedicated CFO leadership. We assist with IR decks, financial projections, P&L analysis, managerial accounting, and introduce key investor networks including accelerators, VCs, and PE funds.',
      ko: 'CFO가 없는 스타트업을 대상으로 외부 CFO로서 재무 자문을 해드립니다. IR 자료 작성 지원, Financial Projection, 손익분석 및 관리 회계를 지원해드리며, 엑셀러레이터, VC, PE 등 잠재 투자자들을 연결해드립니다.'
    }
  },
  {
    id: 'private-equity',
    num: '07',
    title: { en: 'Private Equity / Investment', ko: '사모투자' },
    desc: {
      en: 'For founders and corporate clients requiring growth capital, we execute principal private equity investments and co-investments in partnership with institutional investors.',
      ko: '성장 도모를 위해 투자를 필요로 하는 창업자들과 기업 고객들을 위해 저희는 타 투자자들과 협업하여 사모 투자를 진행합니다.'
    }
  }
];

type NewsItem = {
  date: string;
  title: { en: string; ko: string };
  desc: { en: string; ko: string };
  link?: string;
};

const NEWS_LIST: NewsItem[] = [
  {
    date: '2026 May',
    title: {
      ko: '국내 건설업 IT 자동화 솔루션 업체의 인적분할을 위한 Valuation 수행',
      en: 'Valuation for Spin-off of Domestic Construction IT Automation Solution Provider'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 인적분할을 하려는 국내 건설업 IT 자동화 솔루션 업체의 분할 비율 산정을 위해 Valuation 업무를 수행했습니다.',
      en: 'William Lee, Representative of William Hansan, conducted valuation advisory to determine the spin-off ratio for a domestic construction IT automation solution provider.'
    }
  },
  {
    date: '2026 May',
    title: {
      ko: '[한경비즈니스] 삼성·SK와 나란히…교직원공제회는 어떻게 ‘대기업 집단\'이 됐나',
      en: '[Hankyung Business] Alongside Samsung & SK... How KTCU Became a Major Business Group'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 2026년 5월 13일 한경비즈니스 기사에서, 한국교직원공제회의 대기업집단 신규 지정에 관해 회원 복지조직에서 출발한 공제회가 글로벌 대형 연기금으로 진화해 가는 자연스러운 단계라는 견해를 밝혔습니다.',
      en: 'In a Hankyung Business feature (May 13, 2026), William Lee shared insights on KTCU\'s new designation as a major business group, highlighting its natural evolution into a global institutional investor.'
    },
    link: 'https://n.news.naver.com/article/050/0000106072'
  },
  {
    date: '2026 April',
    title: {
      ko: '국내 전기차 충전 플랫폼 업체와 재생에너지 발전소 솔루션 업체의 합병을 위한 Valuation 수행',
      en: 'Valuation for Merger between EV Charging Platform and Renewable Energy Solution Provider'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 양사 간의 합병 비율 산정을 위해 Valuation 업무를 수행했습니다.',
      en: 'William Lee performed valuation services to evaluate the swap ratio for a merger between an EV charging platform and a renewable energy solution provider.'
    }
  },
  {
    date: '2026 April',
    title: {
      ko: '국내 상장사의 서빙 로봇 업체 인수 관련 재무실사 및 Valuation 업무 수행',
      en: 'Financial Due Diligence & Valuation for Acquisition of Serving Robotics Firm'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 상장사의 서빙 로봇 업체 인수 검토를 위해 재무실사 및 Valuation 업무를 수행했습니다.',
      en: 'William Lee executed financial due diligence and valuation for a Korean listed company reviewing the acquisition of a serving robotics firm.'
    }
  },
  {
    date: '2026 February',
    title: {
      ko: '국내 중견 의류 브랜드 업체의 Call Option 파생 계약에 대해 평가 업무 수행',
      en: 'Fair Value Valuation of Call Option Derivatives for Domestic Apparel Brand'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 중견 의류 브랜드 업체가 관계사와의 Call Option 파생 계약에 대해 공정가치 평가 업무를 수행했습니다.',
      en: 'William Lee conducted fair value valuation on call option derivative contracts between a mid-sized Korean apparel brand and its affiliate.'
    }
  },
  {
    date: '2025 December',
    title: {
      ko: '재무적 투자자의 프리미엄 디저트 브랜드 업체 인수를 위한 Financial Due Diligence 업무 수행',
      en: 'Financial Due Diligence for Financial Investor\'s Acquisition of Premium Dessert Brand'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 재무적 투자자의 프리미엄 디저트 브랜드 업체 인수 검토를 위해 재무실사 업무를 수행했습니다.',
      en: 'William Lee performed financial due diligence for a financial investor considering the acquisition of a premium dessert brand.'
    }
  },
  {
    date: '2025 October',
    title: {
      ko: '[CFA 피플즈] 이원구 윌리엄한산 대표 "국내외 100건 이상의 M&A 자문 경험이 자산"',
      en: '[CFA Peoples] William Lee, CEO of William Hansan: "Over 100 M&A Advisory Deals as Core Asset"'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 한국 CFA 협회의 소개로 블로터와 인터뷰를 했습니다.',
      en: 'William Lee was interviewed by Bloter following recommendation by the CFA Society Korea.'
    },
    link: 'https://www.bloter.net/news/articleView.html?idxno=646033'
  },
  {
    date: '2025 July & August',
    title: {
      ko: '11번가의 기프티콘 사업부에 대한 재무실사 및 Valuation 업무 수행',
      en: 'Financial Due Diligence & Valuation on 11st\'s Gifticon Business Division'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 11번가의 기프티콘 사업부 인수를 검토하는 고객을 위해 재무실사 및 Valuation 업무를 수행했습니다.',
      en: 'William Lee conducted financial due diligence and valuation for a client assessing the acquisition of 11st\'s gifticon business unit.'
    }
  },
  {
    date: '2025 July & August',
    title: {
      ko: '국내 유튜브 및 콘텐츠 커머스 업체 스튜디오에피소드의 Financial Projection 모델 작성 용역 수행',
      en: 'Financial Projection Modeling for Content Commerce Firm Studio Episode'
    },
    desc: {
      ko: '윌리엄한산은 유튜브 및 콘텐츠 커머스 업체 스튜디오에피소드의 5개년 Financial Projection 용역 업무를 수행하였습니다.',
      en: 'William Hansan developed a 5-year financial projection model for content commerce and YouTube media company Studio Episode.'
    }
  },
  {
    date: '2025 July & August',
    title: {
      ko: '국내 상장사가 보유한 미국 Analog Processing Chip 디자인 및 개발 업체 지분에 대해 Valuation 업무 수행',
      en: 'Valuation of Equity Stake in US Analog Processing Chip Developer'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 상장사가 보유한 미국 업체의 지분에 대해 Valuation 업무를 수행하였습니다.',
      en: 'William Lee performed valuation on an equity stake in a US analog processing chip design firm owned by a Korean listed company.'
    }
  },
  {
    date: '2025 May',
    title: {
      ko: '국내 상장사 대기업의 신사업 개발 및 사업 기획에 대한 Financial Modeling 자문 용역 수행',
      en: 'Financial Modeling Advisory for Conglomerate\'s New Business Development'
    },
    desc: {
      ko: '윌리엄한산은 국내 상장사 대기업의 향후 신사업 개발 및 기획에 대한 재무 자문을 제공하였습니다. 다양한 시나리오에 대한 simulation이 가능한 financial model을 작성 및 구현했습니다.',
      en: 'William Hansan provided financial advisory for a major listed conglomerate\'s new business planning, building scenario-simulated financial models.'
    }
  },
  {
    date: '2025 March',
    title: {
      ko: '국내 대기업 상장사의 장비 제조 업체 인수 검토 관련 Financial Due Diligence 업무 수행',
      en: 'Financial Due Diligence for Proposed Acquisition of Industrial Equipment Manufacturer'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 상장사 대기업의 장비 제조 업체 인수 검토를 위해 재무 및 세무 실사 업무를 수행하였습니다.',
      en: 'William Lee executed financial and tax due diligence for a major listed conglomerate evaluating an equipment manufacturer target.'
    }
  },
  {
    date: '2025 February',
    title: {
      ko: '국내 상장사 대기업의 제조업체 인수 관련 재무/세무실사 및 Valuation 자문 수행',
      en: 'Financial/Tax Due Diligence, Valuation & Advisory for Manufacturer Acquisition'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 상장사 대기업의 제조업체 인수 과정에서 재무 및 세무 실사, Valuation, 기타 인수 관련 재무 자문을 제공하였습니다. Deal은 성공적으로 종결되었습니다.',
      en: 'William Lee provided financial/tax due diligence, valuation, and M&A advisory for a listed conglomerate\'s successful acquisition of a manufacturer.'
    }
  },
  {
    date: '2025 January',
    title: {
      ko: '국내 가상화폐 거래소의 연말 가상자산 실사 수행',
      en: 'Year-End Crypto Asset Due Diligence for Domestic Cryptocurrency Exchange'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 2024년 12월 31일 기준 국내 가상화폐 거래소의 가상자산 실사 업무를 수행하였습니다. 이원구 대표는 과거 가상화폐 거래소에서 파트타임 CFO로 근무한 경험이 있으며, 가상화폐 거래소의 M&A 자문 및 가상자산 실사 경험을 통해 깊은 시장 이해도를 갖추고 전문적인 자문을 제공하고 있습니다.',
      en: 'William Lee conducted crypto asset verification as of Dec 31, 2024 for a domestic cryptocurrency exchange, drawing on deep exchange CFO and advisory experience.'
    }
  },
  {
    date: '2024 December',
    title: {
      ko: '국내 상장사 대기업에게 M&A Deal 검토 지원 업무 수행',
      en: 'M&A Deal Screening & Advisory for Major Listed Conglomerate'
    },
    desc: {
      ko: '윌리엄한산은 국내 상장사 대기업의 M&A 매물 검토 과정에서 사업개발팀과 협업하여 검토를 지원하는 업무를 수행하였습니다. 고객사는 본 용역을 기반으로 인수 후보 기업들과 MOU를 성공적으로 체결하였습니다.',
      en: 'William Hansan collaborated with a listed conglomerate\'s business development team to review M&A targets, resulting in successful MOUs.'
    }
  },
  {
    date: '2024 December',
    title: {
      ko: '전기차 충전 플랫폼 스타트업 간 합병 비율 산정을 위한 Valuation 수행',
      en: 'Valuation for Merger Swap Ratio Determination Between EV Charging Startups'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 전기차 충전 플랫폼 스타트업 2개사의 합병 비율 산정을 위해 기업가치 평가 업무를 수행하였습니다.',
      en: 'William Lee performed valuation to calculate the merger ratio between two EV charging platform startups.'
    }
  },
  {
    date: '2024 August',
    title: {
      ko: '국내 콘텐츠 커머스 스타트업인 스튜디오에피소드에 관리회계 및 재무 자문 개시',
      en: 'Initiated Managerial Accounting & Financial Advisory for Studio Episode'
    },
    desc: {
      ko: '윌리엄한산은 콘텐츠와 커머스를 결합하여 운영하는 스튜디오에피소드에게 관리회계 및 재무 자문 서비스를 제공하기 시작했습니다. 외부 재무 자문사로서 제품 및 콘텐츠별 수익성 분석을 기반으로 개선 방향을 도출하고, 기업의 수익성 증진을 지원할 계획입니다.',
      en: 'William Hansan commenced managerial accounting and financial advisory services for content-commerce startup Studio Episode.'
    }
  },
  {
    date: '2024 July',
    title: {
      ko: '국내 상장사 대기업의 IT 업체 인수 후 Purchase Price Allocation 업무 수행',
      en: 'Purchase Price Allocation (PPA) Post-Acquisition of IT Firm'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 상장사 대기업의 IT 업체 인수 후 해당 업체에 대해 PPA 업무를 수행하였습니다.',
      en: 'William Lee executed PPA valuation following a major conglomerate\'s acquisition of an IT enterprise.'
    }
  },
  {
    date: '2024 July',
    title: {
      ko: '사모펀드 운용사인 크레센도에쿼티파트너스에서 Valuation에 대한 강의',
      en: 'Corporate Valuation Lecture at Crescendo Equity Partners'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 사모펀드 운용사인 크레센도에쿼티파트너스에서 Valuation 강의를 진행하였습니다. 사모펀드 운용사 대표님을 포함하여 전 임직원분들께서 참석하여 강의를 들었습니다.',
      en: 'William Lee delivered a valuation lecture for all executives and team members at Crescendo Equity Partners.'
    }
  },
  {
    date: '2024 May',
    title: {
      ko: '국내 상장사 대기업의 IT 업체 인수에 대해 재무/세무실사 및 Valuation 과 더불어 인수 관련 재무 자문 업무 수행',
      en: 'Financial/Tax Due Diligence, Valuation & Advisory for IT Acquisition'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 상장사 대기업의 IT 업체 인수 관련 재무/세무실사, Valuation 및 기타 인수 관련 재무 자문 업무를 수행하였습니다.',
      en: 'William Lee conducted comprehensive financial/tax due diligence and valuation for a listed conglomerate\'s IT acquisition.'
    }
  },
  {
    date: '2024 February',
    title: {
      ko: '국내 중견기업의 이태리 소재 부티끄 유통 업체 인수 후 Purchase Price Allocation 업무 수행',
      en: 'Post-Acquisition Purchase Price Allocation for Italian Luxury Boutique Distributor'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 중견기업의 이태리 소재 부띠크 유통 업체 인수 후 해당 업체에 대해 PPA 업무를 수행하였습니다.',
      en: 'William Lee performed Purchase Price Allocation for a Korean firm following its acquisition of an Italian luxury distributor.'
    }
  },
  {
    date: '2023 March',
    title: {
      ko: '[2023 APFF] 이원구 대표 "지속가능한 경쟁력·수익성 요소를 모두 갖춘 회사가 바로 알짜기업"',
      en: '[2023 APFF] William Lee: "Companies with Sustainable Competitiveness & Profitability are Prime Targets"'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 2023 아시아·태평양금융포럼(APFF)에서 복합위기 시대에 투자자 관점에서 알짜기업 선별 시 고려할 사항에 대해 강연을 했습니다.',
      en: 'William Lee presented at the 2023 Asia Pacific Financial Forum on evaluating prime corporate targets during economic uncertainty.'
    },
    link: 'https://www.ajunews.com/view/20230321165532731'
  },
  {
    date: '2023 March',
    title: {
      ko: '국내 상장사 대기업의 캐나다 자회사 내부통제 및 경영 진단 업무 수행',
      en: 'Internal Controls & Managerial Diagnosis for Canadian Subsidiary'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 국내 상장사 대기업의 캐나다 자회사에 대한 내부통제 및 경영 진단 업무를 수행하였습니다.',
      en: 'William Lee performed internal control and managerial diagnostic reviews for the Canadian subsidiary of a listed Korean conglomerate.'
    }
  },
  {
    date: '2022 November',
    title: {
      ko: '[Disruption Banking] What challenges are Korea’s private equity firms facing?',
      en: '[Disruption Banking] What challenges are Korea’s private equity firms facing?'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 Disruption Banking과 한국 사모펀드 시장의 현황에 대해 인터뷰를 했습니다. 당시 이원구 대표는 사모펀드 J&M 파트너스에서 상무로도 업무를 병행하는 중이였습니다.',
      en: 'William Lee was interviewed by Disruption Banking regarding current challenges and dynamics in the South Korean private equity market.'
    },
    link: 'https://www.disruptionbanking.com/2022/11/08/what-challenges-are-koreas-private-equity-firms-facing/'
  },
  {
    date: '2022 May',
    title: {
      ko: '모바일 동영상 어플 업체 얼라이트크리에이티브(주)를 유럽 중견기업에 매각 자문 업무 수행',
      en: 'Sell-Side Advisory for Sale of Alight Creative Inc. to European Enterprise'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 모바일 동영상 어플 업체를 유럽 중견기업에 매각하는 자문 업무를 수행하여 딜을 성공적으로 마무리했습니다.',
      en: 'William Lee successfully advised mobile video app provider Alight Creative Inc. on its sell-side M&A to a European enterprise.'
    }
  },
  {
    date: '2022 March',
    title: {
      ko: '사모펀드 투자사의 캐나다 소재 물류 회사 지분 투자와 관련 Due Diligence 업무 수행',
      en: 'On-Site Due Diligence for PE Investment in Canadian Logistics Forwarder'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 사모펀드 투자자 고객을 위해 고속 성장하고 있는 캐나다 물류 Forwarding 업체 지분 투자를 위해 현장 실사 업무를 수행하였습니다.',
      en: 'William Lee conducted on-site due diligence for a PE client investing in a fast-growing Canadian freight forwarding company.'
    }
  },
  {
    date: '2021 June',
    title: {
      ko: '스튜디오에피소드의 투자 유치 자문 성공적으로 수행',
      en: 'Successful Investment Advisory for Studio Episode (Equity Investment by HK inno.N)'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 한국콜마 관계사인 HK이노엔으로부터 스튜디오에피소드에 지분 투자하는 거래를 자문하여 성공적으로 딜종결을 했습니다.',
      en: 'William Lee successfully advised Studio Episode on securing equity investment from HK inno.N (Kolmar Korea affiliate).'
    }
  },
  {
    date: '2020 June',
    title: {
      ko: 'GS건설 영국 건축 모듈러 업체 엘리멘츠 유럽 인수 관련 Financial & Tax Due Diligence, Deal Structuring 및 SPA Advisory 업무 수행',
      en: 'Financial/Tax Due Diligence & SPA Advisory for GS E&C Acquisition of Elements Europe'
    },
    desc: {
      ko: '윌리엄한산의 이원구 대표는 2019년 7월에서 2020년 4월까지 삼정회계법인 이사로 근무하면서 GS건설 의 영국 소재 건축 모듈러 업체 엘리멘츠 유럽 인수에 대한 재무/세무실사, Deal Structuring 및 SPA 자문 업무를 수행하였습니다.',
      en: 'While serving as Director at KPMG Samjong, William Lee advised GS E&C on its acquisition of UK-based modular construction provider Elements Europe.'
    }
  },
  {
    date: '2019 June',
    title: {
      ko: '국내 VC 투자사의 미국 SW 개발 Start Up 업체 지분 투자와 관련 Financial Due Diligence 업무 수행',
      en: 'Financial Due Diligence for Korean VC Investment in US Software Startup'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표는 미국 SW 개발 스타트업 업체 지분 투자와 관련하여 재무실사 업무를 수행하였습니다.',
      en: 'William Lee performed financial due diligence for a Korean VC firm investing in a US software development startup.'
    }
  },
  {
    date: '2019 March',
    title: {
      ko: '국내 대기업의 미국 업체 인수 검토와 관련 Financial Due Diligence 업무 수행',
      en: 'Financial Due Diligence for Major Korean Conglomerate\'s Proposed US Acquisition'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표는 국내 대기업의 미국 업체 인수 검토와 관련하여 재무실사 업무를 수행하였습니다.',
      en: 'William Lee conducted financial due diligence for a Korean conglomerate evaluating a US target company.'
    }
  },
  {
    date: '2019 February',
    title: {
      ko: '국내 IT 업체 지분 투자와 관련 Financial Due Diligence 및 Valuation 업무 수행',
      en: 'Financial Due Diligence & Valuation for Investment in Domestic IT Firm'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표는 국내 IT 업체 지분 투자와 관련하여 재무실사 및 Valuation 업무를 수행하였습니다.',
      en: 'William Lee executed financial due diligence and valuation for equity investment in a domestic IT company.'
    }
  },
  {
    date: '2019 January',
    title: {
      ko: '스타트업 IT 업체 Outsourcing CFO 업무 수행',
      en: 'Outsourced CFO Services for High-Growth IT Startup'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 2018년 4월 시작한 IT 스타트업의 CFO 업무가 2019년 1월 완료되었습니다. 7개월 가량 이원구 대표는 신사업 추진 지원, 국내외 Strategic Investor 및 Venture Capital 투자 유치와 관련하여 실사 대응, 협상 지원, 계약서 검토 등의 업무와 내부 회계 및 세무 신고에 대한 자문을 하며 CFO 역할을 담당하였습니다.',
      en: 'William Lee completed a 7-month outsourced CFO engagement for an IT startup, leading strategic fundraising, due diligence, and financial reporting.'
    }
  },
  {
    date: '2018 December',
    title: {
      ko: 'William Hansan Group in Korea\'s theBell M&A League Table 2018',
      en: 'William Hansan Group Ranked #36 in Korea\'s theBell M&A League Table 2018'
    },
    desc: {
      ko: '윌리엄한산그룹은 2018년 더벨 M&A 리그테이블에서 국내 M&A 자문사 중 36위를 하였습니다.',
      en: 'William Hansan Group ranked 36th among financial advisors in Korea\'s 2018 theBell M&A League Table.'
    }
  },
  {
    date: '2018 October',
    title: {
      ko: '국내 업체의 특정 제품군에 대하여 Product Valuation 업무 수행',
      en: 'Product Valuation & English Report for Patented Manufacturer Line'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 국내 제조업체가 자체 R&D를 통해 개발 완료 및 특허권을 보유하여 제조 및 판매하고 있는 특정 제품군에 대해 Valuation 업무를 수행하였습니다. Product Valuation에 대한 업무 수행 후 보고서를 영문으로 작성하여 제공하였습니다.',
      en: 'William Lee performed product valuation and authored a comprehensive English appraisal report for a manufacturer\'s patented product line.'
    }
  },
  {
    date: '2018 October',
    title: {
      ko: '해외 업체의 국내 투자 관련 계약 조건과 거래 구조에 대한 자문',
      en: 'Transaction Structuring Advisory for Foreign Investment in Korea'
    },
    desc: {
      ko: '윌리엄한산그룹이 미국업체의 국내 지분투자와 관련한 계약 조건과 거래 구조에 대해 자문 업무를 제공하였습니다.',
      en: 'William Hansan provided structuring and contract advisory for a US investor\'s equity investment in South Korea.'
    }
  },
  {
    date: '2018 August',
    title: {
      ko: '해외 VC의 국내 스타트업체 지분 투자와 관련 재무실사 업무 수행 및 세무실사 업무 지원',
      en: 'Financial & Tax Due Diligence for Foreign VC Investment in Domestic Startup'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 해외 VC의 국내 스타트업체 지분 투자와 관련하여 재무실사 업무를 총괄하여 수행하였으며 세무실사 업무 수행을 지원하였습니다. 이번 실사건과 관련하여 영문 보고서 작성 및 실사 주요 이슈들에 대한 call 및 email communication을 담당하였습니다.',
      en: 'William Lee led financial and tax due diligence for a foreign VC investing in a Korean startup, delivering full English documentation.'
    }
  },
  {
    date: '2018 August',
    title: {
      ko: 'IB 재무교육 전문 Wall Street Training에서 회계 및 재무 강의',
      en: 'Accounting & Finance Lecture at Wall Street Training'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 IB 재무교육 전문 학원 Wall Street Training에서 제공하는 "Finance 핵심개념 과정"의 회계 및 재무에 대해 강의를 진행하였습니다.',
      en: 'William Lee lectured on core accounting and corporate finance concepts for investment banking professionals at Wall Street Training.'
    }
  },
  {
    date: '2018 June',
    title: {
      ko: 'LG화학에서 M&A Execution에 대한 강의',
      en: 'M&A Execution Lecture at LG Chem'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 LG화학에서 두번 째 강의로 M&A 실사, Tax Structuring, Share Purchase Agreement 및 기타 M&A 실행과 관련된 주제로 강의를 진행하였습니다. 약 20여명의 임직원분들께서 강의를 들으셨습니다.',
      en: 'William Lee delivered an executive masterclass on M&A due diligence, tax structuring, and SPA execution at LG Chem.'
    }
  },
  {
    date: '2018 June',
    title: {
      ko: 'LG화학에서 M&A Overview에 대한 강의',
      en: 'M&A Overview & Process Lecture at LG Chem'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 LG화학에서 M&A 절차, 전략, Deal Sourcing 방법, 실사, 협상 및 실무적인 조언 등 M&A의 전반적인 내용에 대해 강의를 진행하였습니다. 약 20여명의 다양한 부서 임직원분들께서 강의를 들으셨으며 임직원들의 강의 만족도가 매우 높았습니다.',
      en: 'William Lee delivered comprehensive training on end-to-end M&A processes and deal negotiations for LG Chem executives.'
    }
  },
  {
    date: '2018 May',
    title: {
      ko: '매일경제 M&A 전문가 과정에서 Cross Border M&A에 대한 강의',
      en: 'Cross-Border M&A Lecture at Maeil Business Newspaper M&A Program'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 매일경제 M&A 전문가 과정의 강사로써 Cross Border M&A에 대한 강의를 진행하였습니다. 약 30여명의 다양한 대기업 및 중견기업 임직원분들께서 강의를 들으셨으며 수강하신 분들의 강의 만족도가 매우 높았습니다.',
      en: 'William Lee presented on cross-border M&A strategies for corporate executives at Maeil Business Newspaper\'s M&A Master Program.'
    }
  },
  {
    date: '2018 May',
    title: {
      ko: '미래에셋증권에서 Valuation 강의',
      en: 'Corporate Valuation Lecture at Mirae Asset Securities'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 미래에셋증권 센터원 빌딩에서 Valuation 강의를 진행하였습니다. 약 40여명의 다양한 부서 임직원분들께서 참석하셔서 강의를 들으셨습니다.',
      en: 'William Lee conducted valuation training at Mirae Asset Securities Center 1 headquarters.'
    }
  },
  {
    date: '2018 April',
    title: {
      ko: '스타트업 IT업체에 Outsourcing CFO 서비스 제공',
      en: 'Outsourced CFO Services for IT Startup'
    },
    desc: {
      ko: '윌리엄한산그룹이 약 직원 25명 가량의 스타트업 IT 업체에 Outsourcing CFO 서비스 제공을 시작하였습니다.',
      en: 'William Hansan initiated outsourced CFO advisory services for an IT startup with ~25 employees.'
    }
  },
  {
    date: '2018 April',
    title: {
      ko: '베트남 Joint Venture에 대한 조건과 구조에 대한 자문',
      en: 'Joint Venture Structuring Advisory for Vietnam Hotel Construction'
    },
    desc: {
      ko: '윌리엄한산그룹이 국내 개발사가 베트남 업체와 호텔 건설을 위해 체결한 Joint Venture에 대한 조건과 구조에 대해 자문 업무를 제공하였습니다.',
      en: 'William Hansan provided structuring advisory for a joint venture between a Korean developer and Vietnamese partner for hotel construction.'
    }
  },
  {
    date: '2018 March',
    title: {
      ko: '미국 의류장비 국내 독점권 계약에 대한 협상 자문',
      en: 'Negotiation Advisory for US Apparel Equipment Exclusive Distribution Rights'
    },
    desc: {
      ko: '윌리엄한산그룹이 국내 유통사가 체결한 미국 의류장비의 국내 독점권 계약에 대해 자문 업무를 수행하였습니다. 미국 파트너사가 제시한 독점권 계약의 주요 조건에 대해 상세한 설명을 통해 고객이 계약을 원활히 체결할 수 있도록 협상을 지원하였습니다.',
      en: 'William Hansan supported a Korean distributor in negotiating exclusive Korea distribution rights with a US apparel equipment manufacturer.'
    }
  },
  {
    date: '2018 March',
    title: {
      ko: '바운스 트램폴린 파크 매각 자문',
      en: 'Sell-Side M&A Advisory for Vaunce Trampoline Park Sale to IS Dongseo'
    },
    desc: {
      ko: '윌리엄한산그룹이 바운스 트램폴린 파크 매각 자문을 성공적으로 수행하였습니다. 이원구 대표와 강충현 고문이 공동 자문을 수행하여 티져 및 Investment Memorandum 작성, 인수자 아이에스동서 발굴, 주요 조건 협상 및 SPA 자문 등을 통해 Deal을 성공적으로 마무리 하였습니다.',
      en: 'William Hansan successfully advised on the sell-side M&A of Vaunce Trampoline Park to IS Dongseo.'
    },
    link: 'https://www.hankyung.com/amp/2018031147631'
  },
  {
    date: '2018 February',
    title: {
      ko: '국내 제조업체의 미국 파트너사 지분 투자를 위한 Valuation 및 Deal 자문',
      en: 'Valuation & Deal Advisory for Foreign Partner Investment in Domestic Manufacturer'
    },
    desc: {
      ko: '미국 파트너의 국내 제조업체 지분 투자와 관련 윌리엄한산그룹이 Valuation 및 Deal 주요 조건에 대한 자문 지원 서비스를 제공하였습니다. Deal 주요 조건의 경우 영문으로 계약 문구 작성 서비스를 제공하였습니다.',
      en: 'William Hansan provided valuation and English contract drafting for a US partner\'s equity investment in a Korean manufacturer.'
    }
  },
  {
    date: '2018 February',
    title: {
      ko: '국내 화장품 업체 에이피알의 해외 투자 유치를 위한 Financial Projection 업무 수행',
      en: 'Financial Projection Modeling for APR Cosmetics Overseas Fundraising'
    },
    desc: {
      ko: '윌리엄한산그룹이 국내 화장품 업체 에이피알의 Financial Projection 모델링 업무를 수행하였습니다. 회사의 다양한 부서들과의 협업을 통해 회사의 향후 5개년 재무제표 작성 및 현금흐름에 대한 추정을 모델화 하였습니다. 또한 해외 투자 유치가 원활하도록 모두 영문으로 모델링 및 분석 작업을 수행하였습니다.',
      en: 'William Hansan constructed a 5-year English financial projection model for APR Cosmetics to facilitate international fundraising.'
    }
  },
  {
    date: '2018 February',
    title: {
      ko: '국내 IT업체 5개들의 주식 및 영업권 Valuation 업무 수행',
      en: 'Valuation of Equity & Goodwill for 5 Domestic IT Enterprises'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 국내 IT 업체 5개들의 주식 및 영업권 Valuation 업무를 수행하였습니다. 각 회사별 엑셀 모델과 워드 보고서 파일을 전달하고 Valuation에 대해 고객의 감사인 대응을 지원하였습니다.',
      en: 'William Lee executed valuation of equity and goodwill for 5 domestic IT firms and supported auditor defense.'
    }
  },
  {
    date: '2018 January',
    title: {
      ko: 'IB 재무교육 전문 Wall Street Training에서 강의',
      en: 'Corporate Valuation Lecture at Wall Street Training'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 IB 재무전문 교육 학원 Wall Street Training에서 Valuation 강의를 진행하였습니다.',
      en: 'William Lee conducted valuation training at Wall Street Training.'
    }
  },
  {
    date: '2017 December',
    title: {
      ko: '국내 제과 업체의 International Tax Structuring에 대한 자문',
      en: 'International Tax Structuring Advisory for Domestic Confectionery Enterprise'
    },
    desc: {
      ko: '윌리엄한산그룹이 국내 제과 업체의 아시아 법인들과 관련 구조 및 이와 관련된 국제조세 이슈에 대한 자문 업무를 수행하였습니다.',
      en: 'William Hansan advised a domestic confectionery company on Asian subsidiary structures and international tax considerations.'
    }
  },
  {
    date: '2017 November',
    title: {
      ko: '국내 제조 업체의 미국 진출 및 법인 설립을 위한 Tax Structuring 자문',
      en: 'Tax Structuring Advisory for US Market Expansion of Domestic Manufacturer'
    },
    desc: {
      ko: '윌리엄한산그룹이 국내 제조 업체의 미국 진출과 관련 법인 설립과 구조 및 이와 관련된 한국/미국 세무 이슈에 대한 자문 업무를 수행하였습니다.',
      en: 'William Hansan provided US entity incorporation and cross-border tax structuring for a domestic manufacturer.'
    }
  },
  {
    date: '2017 November',
    title: {
      ko: '오리온에서 임직원 대상으로 Valuation 강의',
      en: 'Corporate Valuation Executive Lectures at Orion Group'
    },
    desc: {
      ko: '윌리엄한산그룹의 이원구 대표가 오리온에서 임직원들을 대상으로 Valuation 강의를 2회 진행하였습니다. 첫 강의 이후 임직원들이 강의에 대한 만족도가 높아 회사 측 요청으로 2회차 강의를 진행하였습니다.',
      en: 'William Lee conducted two valuation masterclasses for executives at Orion Group.'
    }
  },
  {
    date: '2015 August',
    title: {
      ko: '[한국경제] 주력산업의 위기, M&A로 뚫어라',
      en: '[Korea Economic Daily] Breakthrough Industrial Crises Through Strategic M&A'
    },
    desc: {
      ko: '성장 정체 극복할 돌파구 필요… 다각화 통한 리스크 분산 효과도. M&A를 어떤 전략적 이유에서 하는지에 대해 이원구 대표가 한국경제에 아티클을 기고했습니다.',
      en: 'William Lee published an opinion article in the Korea Economic Daily on strategic M&A as a catalyst for breaking growth stagnation.'
    },
    link: 'https://magazine.hankyung.com/business/article/202102226988b'
  },
  {
    date: '2015 March',
    title: {
      ko: '[한국경제] 세계는 넓고 인수할 기업은 많다?',
      en: '[Korea Economic Daily] The World is Wide and Targets are Plentiful: Key Checkpoints to Minimize M&A Failures'
    },
    desc: {
      ko: '해외 인수·합병 시 실패율 최소화를 위한 필수 체크포인트. 많은 M&A가 인수 후에 예상했던 시너지를 창출하지 못하고 실패를 하는 원인과 방지책에 대해 이원구 대표가 기사를 기고했습니다.',
      en: 'William Lee authored a column in the Korea Economic Daily outlining critical checkpoints to prevent post-merger integration failures.'
    },
    link: 'https://n.news.naver.com/mnews/article/050/0000036936?sid=101'
  }
];

const DEALS = [
  {
    client: 'Samsung Electronics / Quietside',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Samsung_old_logo_before_year_2015.svg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO2KpOsDkGOvt01cCu3vlwwsL581ahPck3RxvZh3MW&s'
    ],
    domain: 'samsung.com',
    desc: 'M&A financial advisory for the acquisition of Quietside, a U.S.-based HVAC distribution company.',
    type: 'Buyside Advisor'
  },
  {
    client: 'Samsung Electronics / PrinterOn',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Samsung_old_logo_before_year_2015.svg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6c/Printeron_logo.png'
    ],
    domain: 'samsung.com',
    desc: 'M&A financial advisory for the acquisition of PrinterOn Corporation, a Canadian online printing software company.',
    type: 'Buyside Advisor'
  },
  {
    client: 'Samsung Electronics / Yesco',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Samsung_old_logo_before_year_2015.svg',
      'https://www.yesco.com/wp-content/uploads/2023/07/YESCO-logo.png'
    ],
    domain: 'samsung.com',
    desc: 'M&A financial advisory for the acquisition of Yesco Electronics, a U.S.-based LED display manufacturer.',
    type: 'Buyside Advisor'
  },
  {
    client: 'National Pension Service (NPS)',
    logos: [
      'https://i.namu.wiki/i/0ld3dPXKptYA83e3Vcdyocvt0itoeUgHh0RewFkvR9vYkCpxHnIwA1xxqLIl42bCiYxBhmdcW99vINnhb5Ol0g.svg'
    ],
    domain: 'nps.or.kr',
    desc: 'Investment feasibility analysis and transaction advisory for an investment in a leading U.S. cable operator.',
    type: 'Financial Advisor'
  },
  {
    client: 'Blackstone',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/The_Blackstone_Group_logo_%282%29.svg/3840px-The_Blackstone_Group_logo_%282%29.svg.png'
    ],
    domain: 'blackstone.com',
    desc: 'Financial due diligence and transaction advisory for an investment in Simone, a Korean handbag original design manufacturer.',
    type: 'Financial Due Diligence'
  },
  {
    client: 'Temasek Holdings / Celltrion',
    logos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP9GjLFPH_LTeYfzQ6utoRupLqby5BsatapR0pEIb79ZpLsOA_Dc7O6L-c&s=10',
      'https://www.celltrion.com/front/assets/common/images/introduce/img_brand_symbol.jpg'
    ],
    domain: 'temasek.com.sg',
    desc: 'Financial due diligence and transaction advisory for an investment in Celltrion, a Korean biopharmaceutical company specializing in biosimilars.',
    type: 'Financial Due Diligence'
  },
  {
    client: 'The Walt Disney Company',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a4/Disney_wordmark.svg'
    ],
    domain: 'thewaltdisneycompany.com',
    desc: 'Financial due diligence for the acquisition of a Korean game development company.',
    type: 'Financial Due Diligence'
  },
  {
    client: 'Doosan Group',
    logos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUciphrX8Z9e9-kvRsxzCyQRooR84kW3o_RCQtGTWBoQ&s'
    ],
    domain: 'doosan.com',
    desc: 'M&A financial advisory for the proposed acquisition of Ansaldo Energia, an Italian power engineering company.',
    type: 'Buyside Advisor'
  },
  {
    client: 'Kolmar Korea',
    logos: [
      'https://www.kolmar.co.kr/data/webedit/20231011144117_okvrvyts.jpg'
    ],
    domain: 'kolmar.co.kr',
    desc: 'M&A advisory for the acquisition of CSR Cosmetic Solutions, a Canadian cosmetics original equipment manufacturer.',
    type: 'Sellside Advisor'
  },
  {
    client: 'Korea Electric Power Corporation (KEPCO)',
    logos: [
      'https://hanasecu.com/data/file/0303/7a5a9fe9e54185c4ff331950b82f0047_zovrqEUS_824c76539fbbc205514831a060f0db4a0901be48.png'
    ],
    domain: 'kepco.co.kr',
    desc: 'Financial due diligence and transaction advisory for an investment in Indonesia’s fourth-largest coal producer.',
    type: 'Financial Due Diligence'
  },
  {
    client: 'Korea Resources Corporation (KORES)',
    logos: [
      'https://i.namu.wiki/i/s0EXqTxFlReaj9YtDWw_agBLvpgSW-0WSWQ8R_qfcMQxtOgidLplp7_9C66c5qi7H4IPB2XqAGXvIWy8-GvRJw.svg'
    ],
    domain: 'kores.or.kr',
    desc: 'Financial due diligence and transaction advisory for the proposed acquisition of an Indonesian coal producer.',
    type: 'Financial Due Diligence'
  },
  {
    client: 'POSCO',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/POSCO_logo.svg/3840px-POSCO_logo.svg.png'
    ],
    domain: 'posco.com',
    desc: 'Valuation advisory for a proposed investment in a Korean lithium-ion battery company.',
    type: 'Valuation Advisor'
  },
  {
    client: 'POSCO',
    logos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/POSCO_logo.svg/3840px-POSCO_logo.svg.png'
    ],
    domain: 'posco.com',
    desc: 'M&A advisory for POSCO and its consortium’s proposed acquisition of Arrium, an Australian steelmaker.',
    type: 'Buyside Advisor'
  },
  {
    client: 'Doosan Group',
    logos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUciphrX8Z9e9-kvRsxzCyQRooR84kW3o_RCQtGTWBoQ&s'
    ],
    domain: 'doosan.com',
    desc: 'M&A financial advisory for the acquisition of a U.K.-based water and wastewater treatment company.',
    type: 'Buyside Advisor'
  },
  {
    client: 'National Pension Service (NPS)',
    logos: [
      'https://i.namu.wiki/i/0ld3dPXKptYA83e3Vcdyocvt0itoeUgHh0RewFkvR9vYkCpxHnIwA1xxqLIl42bCiYxBhmdcW99vINnhb5Ol0g.svg'
    ],
    domain: 'nps.or.kr',
    desc: 'Investment feasibility analysis and transaction advisory for an investment in an industrial products distributor in France.',
    type: 'Strategic Advisor'
  },
  {
    client: 'National Pension Service (NPS)',
    logos: [
      'https://i.namu.wiki/i/0ld3dPXKptYA83e3Vcdyocvt0itoeUgHh0RewFkvR9vYkCpxHnIwA1xxqLIl42bCiYxBhmdcW99vINnhb5Ol0g.svg'
    ],
    domain: 'nps.or.kr',
    desc: 'Investment feasibility analysis and transaction advisory for an investment in a U.S.-based storage and information management software company.',
    type: 'Strategic Advisor'
  }
];

const content = {
  en: {
    nav: { home: 'Home', team: 'Team', services: 'Services', news: 'News', contact: 'Contact' },
    hero: { title: 'William Hansan', subtitle: 'M&A & Investment Advisory | Cross Border Expansion | Strategic Partnerships' },
    about: {
      title: 'William Hansan',
      p1: 'William Hansan is an M&A and strategic consulting firm that supports not only corporate mergers and acquisitions (M&A), but also strategic investments, joint ventures (JV), and partnerships for market expansion. We advise on customized M&A and investment strategies to help domestic and foreign companies grow.',
      p2: 'We provide domestic and cross-border M&A advisory for a variety of clients, from startups to mid-sized/large companies and private equity (PE) funds, and selectively execute private equity investments when suitable opportunities arise.',
      btn: 'Our Services'
    },
    globalNetwork: {
      title: 'Global Network',
      subtitle: 'Cross border M&A & strategic corporate development advisory',
      p1: 'Our team is comprised of experts with extensive experience in domestic M&A advisory and business development, and has experience advising on more than 100 cross border M&A deals.',
      p2: 'We have a wide range of partnerships and networks with boutique M&A advisors and strategic consulting firms around the world.',
      p3: 'Based on this, we comprehensively advise on the entire acquisition process, from target search for domestic mid-sized or large companies seeking strategic acquisition targets overseas, to secretly contacting potential target companies and inquiring about their intention to sell, through due diligence and valuation, to SPA negotiation and deal closing.',
      p4: 'Through various deal advisory experiences, we act on behalf of our clients in M&A negotiations and strive to protect our clients\' interests as much as possible through advice on contract terms such as various acquisition contracts.'
    },
    transactions: {
      title: 'Selected M&A Transactions',
      subtitle: 'Selected M&A advisory engagements that William has advised in the past are as follows:',
      deals: DEALS
    },
    teamPage: {
      title: 'Key Professionals of William Hansan',
      subtitle: 'Introducing our distinguished team of experts with deep expertise in M&A advisory, private equity, valuation, and international finance.'
    },
    servicesPage: {
      title: 'Our Services',
      subtitle: 'William Hansan provides comprehensive M&A, valuation, strategy, and fundraising advisory services tailored for corporations, private equity funds, and startups.'
    },
    contactPage: {
      title: 'Contact Us',
      subtitle: 'Get in touch with William Hansan for M&A advisory, strategic partnerships, or investment inquiries.',
      addressTitle: 'Office Address',
      address: 'Seoul, South Korea',
      emailTitle: 'Email Inquiries',
      email: 'william@williamhsn.com'
    },
    ceoQuote: {
      quote: "“We pursue strategic opportunities through global expansion, leveraging our cross-border expertise as a distinct competitive advantage.”",
      name: "Wonku William Lee",
      role: "CEO"
    },
    stats: [
      { prefix: "", endValue: 100, suffix: "+", label: "Deals Advised" },
      { prefix: "", endValue: 1, suffix: " Trillion Won+", label: "Aggregate Deal Value" },
      { prefix: "", endValue: 20, suffix: "+ Years", label: "Senior-Level Deal Experience" }
    ],
    footer: {
      location: 'Seoul, South Korea | Global Network',
      copyright: '© 2024 William Hansan. All Rights Reserved. | Privacy Policy'
    }
  },
  ko: {
    nav: { home: '홈', team: '주요 인력', services: '서비스', news: '뉴스', contact: '문의' },
    hero: { title: 'William Hansan', subtitle: 'M&A & Investment Advisory | Cross Border Expansion | Strategic Partnerships' },
    about: {
      title: '윌리엄한산(주)',
      p1: '윌리엄한산은 기업 간 인수합병(M&A)뿐만 아니라, 전략적 투자, 조인트벤처(JV), 그리고 시장 진출을 위한 파트너십을 지원하는 M&A 및 전략 컨설팅 업체입니다. 국내외 기업들의 성장을 돕기 위해 맞춤형 M&A 및 투자 전략을 자문합니다.',
      p2: '스타트업부터 중견·대기업, 사모펀드(PE)까지 다양한 고객을 대상으로 국내 및 크로스보더 M&A 자문을 수행하며, 적절한 기회가 있을 경우 선별적으로 사모펀드 투자도 진행합니다.',
      btn: 'Our Services'
    },
    globalNetwork: {
      title: '글로벌 네트워크',
      subtitle: 'Cross border M&A & strategic corporate development advisory',
      p1: '저희 팀은 국내외 M&A 자문 및 사업개발 경험이 풍부한 전문가들로 구성되어 있으며, 100건 이상의 cross border M&A deal 자문 경험이 있습니다.',
      p2: '저희는 전 세계 부티크 M&A 자문사 및 전략 컨설팅 업체들과 다양한 협업 관계와 네트워크를 보유하고 있습니다.',
      p3: '이를 기반으로 해외에 전략적 인수 대상 회사를 찾고자 하는 국내 중견 또는 대기업을 대상으로 target search 단계부터 potential target 회사에 비밀리에 접촉하여 매각 의사를 타진하고, 실사 및 valuation 후 SPA 협상 등 deal closing 까지 전 단계에서 포괄적으로 인수자문을 하고 있습니다.',
      p4: '다양한 deal 자문 경험을 통해 고객사들을 위해 M&A 협상을 대리하며, 다양한 인수계약서 등의 계약 조건들에 대한 자문을 통해 고객의 이해관계를 최대한 보호하고자 합니다.'
    },
    transactions: {
      title: '주요 M&A 자문 실적',
      subtitle: 'Selected M&A advisory engagements that William has advised in the past are as follows:',
      deals: DEALS
    },
    teamPage: {
      title: '윌리엄한산(주)의 주요 인력을 소개합니다.',
      subtitle: 'M&A, 사모펀드, 기업 가치평가 및 글로벌 금융 시장에서 풍부한 실무 경험을 갖춘 전문가 그룹입니다.'
    },
    servicesPage: {
      title: '서비스 안내',
      subtitle: '기업, 사모펀드 및 스타트업을 위해 M&A 자문, 투자유치, 전략 자문 및 기업 가치평가 등 전방위적 맞춤형 자문 서비스를 제공합니다.'
    },
    contactPage: {
      title: '문의하기',
      subtitle: 'M&A 자문, 전략적 제휴 및 투자 관련 문의는 윌리엄한산(주)으로 연락 주시기 바랍니다.',
      addressTitle: '오피스 위치',
      address: '서울특별시 강남구 테헤란로 (Seoul, Korea)',
      emailTitle: '이메일 문의',
      email: 'william@williamhsn.com'
    },
    ceoQuote: {
      quote: "“우리는 크로스보더 전문성을 차별화된 핵심 경쟁력으로 삼아, 글로벌 확장을 통한 전략적 기회를 창출합니다.”",
      name: "이원구",
      role: "대표"
    },
    stats: [
      { prefix: "", endValue: 100, suffix: "건+", label: "M&A 및 재무자문 실적" },
      { prefix: "", endValue: 1, suffix: "조원+", label: "누적 거래가액" },
      { prefix: "", endValue: 20, suffix: "년+", label: "시니어 자문 경력" }
    ],
    footer: {
      location: 'Seoul, South Korea | Global Network',
      copyright: '© 2024 William Hansan. All Rights Reserved. | Privacy Policy'
    }
  }
};

function AnimatedStat({ prefix, endValue, suffix, label }: { prefix: string, endValue: number, suffix: string, label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [currentValue, setCurrentValue] = useState(endValue === 1 ? 1 : 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && endValue !== 1) {
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * endValue);
        
        setCurrentValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentValue(endValue);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, endValue]);

  return (
    <div ref={ref} className="py-6 md:py-2 md:px-8 lg:px-12 first:pl-0 last:pr-0 flex flex-col justify-center text-left">
      <div className="text-4xl sm:text-5xl lg:text-[54px] font-light tracking-tight text-[#0a192f] font-serif leading-none">
        {prefix}{currentValue}{suffix}
      </div>
      <div className="text-xs md:text-sm uppercase tracking-[0.18em] text-zinc-500 font-medium mt-3.5">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>('ko');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const t = content[lang];
  
  const availableYears = ['All Years', ...Array.from(new Set(NEWS_LIST.map(n => n.date.substring(0, 4))))].sort((a, b) => {
    if (a === 'All Years') return -1;
    if (b === 'All Years') return 1;
    return b.localeCompare(a);
  });
  
  const filteredNews = NEWS_LIST.filter(item => selectedYear === 'All Years' || item.date.startsWith(selectedYear));

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      
      {/* Background Vertical Grid Lines - Subtle pattern across the page */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-evenly">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-zinc-50" />
        ))}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-3 md:py-4 w-full mx-auto bg-white/90 backdrop-blur-sm z-50 sticky top-0 border-b border-zinc-100 gap-4 md:gap-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <button onClick={() => setActiveTab('home')} className="flex flex-col text-left">
              <div className="text-xl md:text-2xl font-light tracking-wide text-zinc-900">William Hansan</div>
              <div className="text-[10px] text-zinc-500 font-medium tracking-widest mt-0.5">PRIVATE EQUITY | VC | M&A</div>
            </button>
            <div className="flex md:hidden items-center gap-2 text-sm font-light">
              <button 
                onClick={() => setLang('en')} 
                className={`transition-colors uppercase tracking-wider ${lang === 'en' ? 'text-zinc-900 font-normal' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                EN
              </button>
              <span className="text-zinc-300">|</span>
              <button 
                onClick={() => setLang('ko')} 
                className={`transition-colors uppercase tracking-wider ${lang === 'ko' ? 'text-zinc-900 font-normal' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                KR
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-12 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <nav className="flex items-center gap-6 md:gap-8 text-sm font-light whitespace-nowrap min-w-max">
              <button 
                onClick={() => setActiveTab('home')}
                className={`transition-colors relative pb-1 ${activeTab === 'home' ? 'text-zinc-900 font-normal' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                {t.nav.home}
                {activeTab === 'home' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('team')}
                className={`transition-colors relative pb-1 ${activeTab === 'team' ? 'text-zinc-900 font-normal' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                {t.nav.team}
                {activeTab === 'team' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('services')}
                className={`transition-colors relative pb-1 ${activeTab === 'services' ? 'text-zinc-900 font-normal' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                {t.nav.services}
                {activeTab === 'services' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('news')}
                className={`transition-colors relative pb-1 ${activeTab === 'news' ? 'text-zinc-900 font-normal' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                {t.nav.news}
                {activeTab === 'news' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`transition-colors relative pb-1 ${activeTab === 'contact' ? 'text-zinc-900 font-normal' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                {t.nav.contact}
                {activeTab === 'contact' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900"></span>}
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-2 text-sm font-light">
              <button 
                onClick={() => setLang('en')} 
                className={`transition-colors uppercase tracking-wider ${lang === 'en' ? 'text-zinc-900 font-normal' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                EN
              </button>
              <span className="text-zinc-300">|</span>
              <button 
                onClick={() => setLang('ko')} 
                className={`transition-colors uppercase tracking-wider ${lang === 'ko' ? 'text-zinc-900 font-normal' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                KR
              </button>
            </div>
          </div>
        </header>

        {activeTab === 'services' ? (
          /* SERVICES PAGE VIEW - Minimalist Black & White Thin Typography Box Layout */
          <main className="flex-1 w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-16">
            <div className="max-w-[1400px] mx-auto mb-16 pb-8 border-b border-zinc-200">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-4">
                {t.servicesPage.title}
              </h1>
              <p className="text-zinc-500 text-sm md:text-base max-w-3xl font-light leading-relaxed">
                {t.servicesPage.subtitle}
              </p>
            </div>

            {/* 7 Services in Clean Organized Minimal Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10 max-w-[1400px] mx-auto">
              {SERVICES.map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white border border-zinc-200 p-8 md:p-10 hover:border-zinc-900 transition-colors duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-light text-zinc-900 tracking-tight mb-4">
                      {service.title[lang]}
                    </h2>

                    <div className="w-12 h-[1px] bg-zinc-200 mb-6 group-hover:w-20 group-hover:bg-zinc-900 transition-all duration-300" />

                    <p className="text-zinc-600 text-sm md:text-base font-light leading-relaxed break-keep">
                      {service.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        ) : activeTab === 'team' ? (
          /* TEAM PAGE VIEW - Minimalist Black & White Thin Typography */
          <main className="flex-1 w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-16">
            <div className="max-w-[1400px] mx-auto mb-16 pb-8 border-b border-zinc-200">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-4">
                {t.teamPage.title}
              </h1>
              <p className="text-zinc-500 text-sm md:text-base max-w-3xl font-light leading-relaxed">
                {t.teamPage.subtitle}
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-[1400px] mx-auto">
              {TEAM_MEMBERS.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-white border border-zinc-200 p-6 md:p-8 hover:border-zinc-900 transition-colors duration-300 flex flex-col sm:flex-row gap-8 items-start"
                >
                  {/* Member Photo */}
                  <div className="w-full sm:w-52 h-64 shrink-0 bg-zinc-100 overflow-hidden relative group">
                    <img
                      src={member.image}
                      alt={member.name[lang]}
                      className="w-full h-full object-cover object-top filter grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = member.fallbackImage;
                      }}
                    />
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 flex flex-col justify-between h-full w-full">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-light text-zinc-900 tracking-tight">
                        {member.name[lang]}
                      </h2>
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-normal mt-1 mb-5">
                        {member.role[lang]}
                      </p>
                      
                      <div className="w-full h-[1px] bg-zinc-100 my-4" />

                      {/* Bullets List */}
                      <ul className="space-y-2.5 text-zinc-600 text-xs md:text-sm font-light leading-relaxed">
                        {member.bullets[lang].map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-zinc-300 font-light shrink-0 mt-0.5">—</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* LinkedIn Link */}
                    {member.linkedIn && (
                      <div className="mt-8 pt-2">
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-zinc-300 text-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-200 text-xs font-light tracking-wide"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        ) : activeTab === 'contact' ? (
          /* CONTACT PAGE VIEW */
          <main className="flex-1 w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-16">
            <div className="max-w-[1400px] mx-auto mb-16 pb-8 border-b border-zinc-200">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-4">
                {t.contactPage.title}
              </h1>
              <p className="text-zinc-500 text-sm md:text-base max-w-3xl font-light leading-relaxed">
                {t.contactPage.subtitle}
              </p>
            </div>

            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 lg:gap-24">
              <div className="flex-1 max-w-xl">
                <h2 className="text-2xl md:text-3xl text-zinc-900 font-light tracking-tight mb-8">
                  {lang === 'en' ? 'William Hansan' : '윌리엄한산(주)'}
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium mb-3">
                      {t.contactPage.addressTitle}
                    </h3>
                    <p className="text-base text-zinc-600 font-light leading-relaxed">
                      {t.contactPage.address}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium mb-3">
                      {t.contactPage.emailTitle}
                    </h3>
                    <a 
                      href={`mailto:${t.contactPage.email}`} 
                      className="text-base text-zinc-600 font-light hover:text-zinc-900 transition-colors inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      {t.contactPage.email}
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium mb-3">
                      {lang === 'en' ? 'Business Hours' : '업무 시간'}
                    </h3>
                    <p className="text-base text-zinc-600 font-light">
                      Mon - Fri, 09:00 - 18:00 KST
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <a 
                      href="https://www.linkedin.com/company/william-hansan/" 
                      className="inline-flex items-center gap-3 text-zinc-400 hover:text-zinc-900 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-6 h-6" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'news' ? (
          /* NEWS PAGE VIEW */
          <main className="flex-1 w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-16">
            <div className="max-w-[1200px] mx-auto mb-12 pb-8 border-b border-zinc-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-4">
                    {lang === 'en' ? 'News & Updates' : '뉴스 및 소식'}
                  </h1>
                  <p className="text-zinc-500 text-sm md:text-base max-w-3xl font-light leading-relaxed">
                    {lang === 'en'
                      ? 'Latest announcements, media features, and transaction advisory disclosures from William Hansan.'
                      : '윌리엄한산(주)의 주요 소식, 언론보도 및 자문 실적을 안내해 드립니다.'}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <label htmlFor="year-select" className="text-xs font-light text-zinc-500 uppercase tracking-widest hidden sm:block">
                    {lang === 'en' ? 'Filter by Year' : '연도별 보기'}
                  </label>
                  <select 
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none bg-white border border-zinc-200 text-zinc-700 text-sm font-light py-2 pl-4 pr-10 focus:outline-none focus:border-zinc-500 focus:ring-0 transition-colors cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2318181b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
                  >
                    {availableYears.map(year => (
                      <option key={year} value={year}>{year === 'All Years' ? (lang === 'en' ? 'All Years' : '전체') : year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* List View - Clean & Unboxed */}
            <div className="max-w-[1200px] mx-auto divide-y divide-zinc-200/80">
              {filteredNews.map((item, idx) => (
                <article 
                  key={idx} 
                  className="py-8 md:py-10 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start gap-4 md:gap-12 group transition-colors duration-200"
                >
                  {/* Date Column */}
                  <div className="w-36 shrink-0 pt-0.5">
                    <span className="text-xs md:text-sm font-medium tracking-wider text-zinc-400 uppercase group-hover:text-zinc-900 transition-colors duration-200">
                      {item.date}
                    </span>
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg md:text-xl font-light text-zinc-900 leading-snug tracking-tight">
                      {item.title[lang]}
                    </h3>
                    
                    <p className="text-sm font-light text-zinc-600 leading-relaxed max-w-4xl">
                      {item.desc[lang]}
                    </p>

                    {item.link && (
                      <div className="pt-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 font-light underline underline-offset-4 transition-colors duration-150"
                        >
                          <span>{lang === 'en' ? '[Article Link]' : '[기사 링크]'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </main>
        ) : (
          /* HOME PAGE VIEW */
          <>
            {/* 1. Homepage Hero Image */}
            <section className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] border-b border-zinc-100 overflow-hidden bg-[#FAFAFA]">
              <img
                src="https://lh3.googleusercontent.com/d/1h6zj5YEY7GhtasK39iZBy0yyhSpovFT8"
                alt="Seoul City Skyline"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[1.05]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://drive.google.com/uc?export=view&id=1h6zj5YEY7GhtasK39iZBy0yyhSpovFT8";
                }}
              />
              
              {/* Blur fade effect */}
              <div 
                className="absolute inset-0 backdrop-blur-md pointer-events-none" 
                style={{ maskImage: 'linear-gradient(to right, black 0%, transparent 40%)', WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 40%)' }} 
              />
              
              {/* White gradient for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 via-30% to-transparent pointer-events-none" />
              
              <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-16">
                <div className="max-w-xl">
                  <div className="border-l-[3px] border-[#2A3B5C] pl-6 md:pl-8 py-2">
                    <h1 className="text-4xl md:text-5xl lg:text-[56px] font-light tracking-tight text-zinc-900 leading-tight mb-4">
                      {t.hero.title}
                    </h1>
                    <p className="text-sm md:text-base text-zinc-800 font-light tracking-wide leading-relaxed mb-10 max-w-md">
                      {t.hero.subtitle}
                    </p>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-[#0a192f] text-white hover:bg-zinc-800 transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-light"
                    >
                      <span>Our Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Company Introduction and CEO Quote Section */}
            <section className="w-full bg-white border-b border-zinc-100 overflow-hidden">
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[320px]">
                {/* Left side: Company Introduction */}
                <div className="lg:col-span-6 xl:col-span-7 px-6 md:px-12 lg:px-16 py-10 md:py-16 flex flex-col justify-center text-left">
                  <div className="max-w-2xl">
                    <div className="space-y-6 text-zinc-600 leading-[1.85] text-sm md:text-base font-light break-keep">
                      <p>{t.about.p1}</p>
                      <p>{t.about.p2}</p>
                    </div>
                  </div>
                </div>

                {/* Right side: CEO Photo and Quote Overlay */}
                <div className="lg:col-span-6 xl:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden bg-zinc-900">
                  <img
                    src="https://lh3.googleusercontent.com/d/1QL4-mdRZDRBH37aSZdIQpyM1YSdK8rGw"
                    alt="Wonku William Lee - CEO"
                    className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.85]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://drive.google.com/uc?export=view&id=1QL4-mdRZDRBH37aSZdIQpyM1YSdK8rGw";
                    }}
                  />
                  
                  {/* Dark gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                  
                  {/* Quote Content overlay */}
                  <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-10">
                    <div className="text-white text-3xl md:text-4xl mb-1 font-serif leading-none opacity-90">“</div>
                    <p className="text-sm md:text-base font-light leading-relaxed text-white tracking-wide break-keep max-w-3xl">
                      {t.ceoQuote.quote.replace(/“|”/g, '')}”
                    </p>
                    <div className="pt-4 mt-4 border-t border-white/20 flex flex-col max-w-3xl">
                      <span className="text-sm font-light tracking-wider text-white">
                        {t.ceoQuote.name}
                      </span>
                      <span className="text-xs text-zinc-300 font-light mt-1">
                        {t.ceoQuote.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Company Statistics Section */}
            <section className="w-full bg-zinc-50/70 border-b border-zinc-200 py-12 md:py-16 px-6 md:px-12 lg:px-16">
              <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200/90">
                  {t.stats.map((stat, idx) => (
                    <AnimatedStat 
                      key={idx}
                      prefix={stat.prefix}
                      endValue={stat.endValue}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Global Network Section */}
            <section className="px-8 md:px-16 py-16 md:py-20 w-full mx-auto bg-white border-y border-zinc-100">
              <div className="max-w-[1400px] mx-auto">
                <h2 className="text-2xl md:text-4xl font-light text-zinc-900 mb-8 md:mb-10 tracking-tight">
                  {t.globalNetwork.title}
                </h2>

                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
                  {/* Left: Map image with smooth gradient bottom fade into white */}
                  <div className="w-full lg:w-1/2 relative h-[280px] sm:h-[340px] lg:h-[400px] overflow-hidden rounded-sm group shrink-0">
                    <img
                      src="https://img.magnific.com/premium-vector/global-network-connection-world-map-point_41981-1194.jpg"
                      alt="Global Network Map"
                      className="w-full h-full object-cover filter grayscale contrast-[1.05] opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Fading bottom edge into white */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                    {/* Soft fading right edge on desktop */}
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none hidden lg:block" />
                  </div>

                  {/* Right: Text content next to image */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h3 className="text-lg md:text-xl font-light text-zinc-900 tracking-wide border-b border-zinc-100 pb-3">
                      {t.globalNetwork.subtitle}
                    </h3>
                    <div className="space-y-4 text-zinc-600 leading-[1.8] text-[14px] md:text-[15px] font-light break-keep text-left">
                      <p>{t.globalNetwork.p1}</p>
                      <p>{t.globalNetwork.p2}</p>
                      <p>{t.globalNetwork.p3}</p>
                      <p>{t.globalNetwork.p4}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Transactions Slider Section */}
            <section className="py-24 w-full overflow-hidden">
              <div className="px-8 md:px-16 max-w-[1600px] mx-auto mb-10">
                <h2 className="text-2xl md:text-4xl font-light text-zinc-900 tracking-tight">
                  {t.transactions.title}
                </h2>
              </div>

              {/* Marquee Wrapper */}
              <div className="flex w-full overflow-hidden bg-white py-4 relative group">
                <div className="flex items-center animate-marquee group-hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
                  {[...t.transactions.deals, ...t.transactions.deals, ...t.transactions.deals].map((deal: any, i) => (
                    <div key={i} className="w-[300px] h-[360px] border border-zinc-200 flex flex-col justify-between bg-white shrink-0 mr-8 p-6 relative hover:shadow-md transition-shadow">
                      <div className="flex-1 flex flex-col items-center justify-start">
                        {/* Logo Box */}
                        <div className="h-20 flex items-center justify-center gap-3 w-full px-2 mt-2 overflow-hidden">
                          {deal.logos && deal.logos.length > 0 ? (
                            deal.logos.map((logoUrl: string, idx: number) => {
                              let sizeClass = 'max-h-14 max-w-[85%]';
                              const lowerUrl = logoUrl.toLowerCase();
                              if (deal.logos.length > 1) {
                                sizeClass = 'max-h-11 max-w-[42%]';
                              } else if (lowerUrl.includes('posco')) {
                                sizeClass = 'max-h-8 max-w-[60%]';
                              } else if (lowerUrl.includes('kores') || lowerUrl.includes('s0exqtxflreaj9ytdw')) {
                                sizeClass = 'max-h-8 max-w-[60%]';
                              } else if (lowerUrl.includes('kolmar')) {
                                sizeClass = 'max-h-20 max-w-full scale-125';
                              }
                              return (
                                <img
                                  key={idx}
                                  src={logoUrl}
                                  alt={`${deal.client} Logo ${idx + 1}`}
                                  className={`object-contain ${sizeClass}`}
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              );
                            })
                          ) : (
                            <img
                              src={deal.logoUrl || `https://logo.clearbit.com/${deal.domain}`}
                              alt={`${deal.client} Logo`}
                              className="max-h-14 max-w-[85%] object-contain"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                        </div>

                        {/* Deal Description */}
                        <p className="text-sm md:text-[15px] text-zinc-700 font-light leading-relaxed text-center mt-4">
                          {deal.desc}
                        </p>
                      </div>

                      {/* Specific Advisory Role */}
                      <div className="pt-4 text-center w-full">
                        <span className="text-xs md:text-sm font-light text-zinc-800 tracking-wider uppercase border-t border-zinc-100 pt-3 block">
                          {deal.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* 5. Footer Section */}
        <footer className="bg-zinc-900 text-white py-12 px-8 md:px-16 w-full mt-auto font-light">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
              <div className="flex flex-col items-center md:items-start">
                <div className="text-xl md:text-2xl font-light tracking-tight text-white mb-1">William Hansan</div>
                <div className="text-xs md:text-sm text-zinc-400 font-light">
                  {t.footer.location}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <nav className="flex flex-wrap justify-center items-center gap-6 text-xs md:text-sm font-light text-zinc-400">
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">{t.nav.home}</button>
                <button onClick={() => setActiveTab('team')} className="hover:text-white transition-colors">{t.nav.team}</button>
                <button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors">{t.nav.services}</button>
                <button onClick={() => setActiveTab('news')} className="hover:text-white transition-colors">{t.nav.news}</button>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">{t.nav.contact}</button>
              </nav>
            </div>

          </div>
          
          <div className="max-w-[1600px] mx-auto mt-10 pt-6 border-t border-zinc-800 text-center md:text-left text-xs font-light text-zinc-500 flex flex-col md:flex-row items-center justify-between">
            <span>{t.footer.copyright}</span>
          </div>
        </footer>

      </div>
    </div>
  );
}