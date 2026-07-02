/* ==========================================================================
   EVER:READY V2 — Hyper-Mobility Dashboard Application Logic (2nd Redesign)
   ========================================================================== */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const store = {
  get(key, fallback = "") { 
    try { 
      return JSON.parse(localStorage.getItem(`everready:${key}`)) ?? fallback; 
    } catch { 
      return fallback; 
    } 
  },
  set(key, value) { 
    localStorage.setItem(`everready:${key}`, JSON.stringify(value)); 
  }
};

/* 1. Track & Job Position Database */
const tracks = {
  mobility: {
    icon: "M", label: "MOBILITY DIGITAL", title: "움직이는 제품을 안정적인 서비스로",
    summary: "차량 SW 플랫폼, 차량 연동 서비스, 내비게이션과 정밀지도처럼 차량 안팎의 경험을 연결하는 영역입니다.",
    evidence: [
      "C/C++·Java·Python 등으로 만든 동작 결과물 (기능 중심)",
      "API·위치·센서 데이터 처리 로직 및 비정상/예외 상황 대응 설계",
      "테스트 자동화·성능 최적화·장애 근본 원인 분석 기록"
    ],
    questions: [
      "네트워크 음영 지역 및 연결이 유실되었을 때 데이터 정합성 보장 방안은?",
      "위치 정확도 필터링과 응답속도 향상 중 무엇을 더 우선했는가?",
      "현대오토에버 모빌리티 도메인을 학습하기 위해 어떤 소스를 참고했는가?"
    ],
    example: "“위치 데이터 수집 오차를 25% 감축한 프로젝트 경험을 바탕으로, 끊김 없고 신뢰할 수 있는 차량 연동 서비스 품질에 기여하겠습니다.”",
    essay: "저는 [사용자/현장]이 겪는 이동 경험의 단절을 소프트웨어 기술로 해결하고자 모빌리티 SW 직무에 지원했습니다. [프로젝트명]에서 [내 역할]을 수행하며 [동시 접속 폭주/지연 문제]를 인지했고, [선택한 아키텍처/판단]을 적용해 [수치적 개선 결과]를 달성했습니다. 특히 [실패나 제약 극복 과정]을 겪으면서 단순 구현 이상의 안정성과 데이터 정합성의 중요성을 뼈저리게 배웠습니다.\n\n현대오토에버는 차량 임베디드 SW 플랫폼인 mobilgene부터 커넥티드 카(In-Car) 서비스, 대용량 정밀지도 인프라(Out-Car)까지 유기적인 차량 생태계를 구축하고 있습니다. 제가 가진 [핵심 역량 및 데이터 핸들링 경험]을 이 통합 지점에 적용하여, 입사 1년 차에는 [도메인 기초 목표]를 완벽히 숙지하고 3년 차에는 [특정 모빌리티 서비스 전문 엔지니어]로 단단히 성장해 나가겠습니다."
  },
  enterprise: {
    icon: "IT", label: "ENTERPRISE DIGITAL", title: "복잡한 비즈니스를 단순하고 안전하게",
    summary: "그룹웨어, ERP·CRM, 비즈니스 자동화(RPA)처럼 기업의 프로세스를 이해하고 시스템으로 연결하는 영역입니다.",
    evidence: [
      "Java·Spring·SQL 기반 기업용 웹 서비스/업무 시스템 구현 경험",
      "복잡한 기획/요구사항 명세를 화면 설계 및 DB 데이터 모델로 정의한 문서",
      "운영 프로세스 리팩토링으로 장애율 또는 수작업 공수를 줄인 경험"
    ],
    questions: [
      "현업 부서의 모호하고 잦은 요구사항 변경에 어떻게 대응하고 명세화했나?",
      "분산 데이터베이스 트랜잭션과 데이터 정밀 무결성을 어떻게 검증했나?",
      "사용자의 편의성 증진과 비즈니스 표준 보안 규격이 충돌할 경우의 타협안은?"
    ],
    example: "“사용자 관리 메뉴 리팩토링으로 일평균 수작업 업무를 40% 단축시킨 경험으로, 현업이 체감하는 업무 효율을 극대화하겠습니다.”",
    essay: "저는 복잡하게 꼬인 업무 흐름을 정교한 시스템 구조로 번역하고 해결하는 데 깊은 보람을 느껴 엔터프라이즈 IT 직무를 선택했습니다. [프로젝트명]에서 [다양한 부서 사용자들]이 겪는 [수작업 지연/조회 병목 현상]을 직접 관찰했고, [내 역할]로서 [설계 개선 및 신규 모듈 도입]을 완수했습니다. 결과적으로 [업무 처리 시간]을 [수치]% 단축시켰고, 기술적 기교에 앞서 업무 도메인 규칙을 명확히 정의하는 것이 견고한 아키텍처의 기본임을 체득했습니다.\n\n현대오토에버는 글로벌 현대자동차그룹의 IT 핵심 파트너로서 비즈니스 전체의 프로세스 지능화를 리드하고 있습니다. 입사 후 현업의 언어를 기품 있고 확장성 있는 클린 코드로 구현해 내는 가교가 되겠으며, 3년 내 대용량 비즈니스 데이터를 기반으로 시스템 구조 혁신을 선제적으로 건의할 수 있는 인재가 되겠습니다."
  },
  factory: {
    icon: "F", label: "MANUFACTURING DIGITAL", title: "현장 데이터가 최적의 품질을 만들도록",
    summary: "MES, IoT, 설비 데이터 파이프라인과 제조실행시스템(SDF) 등을 연결해 지능형 스마트팩토리 환경을 만드는 영역입니다.",
    evidence: [
      "센서·시리얼 통신 데이터 수집 및 실시간 모니터링 시각화 프로젝트",
      "공정 흐름(MES)과 자재/물류 관리 구조를 반영해 설계한 시스템 포트폴리오",
      "열악한 공업 현장 등 제약 조건 하에서 중단 없는 무장애 배포/운영 경험"
    ],
    questions: [
      "대용량 센서 데이터 파이프라인에서 데이터 누락이나 지연을 탐지하는 방식은?",
      "산업용 제어설비(OT)와 일반 전산시스템(IT) 융합 시 예상되는 가장 큰 리스크는?",
      "24시간 가동되어야 하는 공장 시스템의 무중단 패치 및 롤백 전략은 무엇인가?"
    ],
    example: "“설비 패킷 유실률을 0.1% 이하로 낮춘 안정화 경험을 기반으로, 공장이 신뢰하는 지능형 SDF 아키텍처를 구현하겠습니다.”",
    essay: "저는 화면 속 대시보드 지표가 실제 제조 생산라인의 품질 혁신과 물리적 제어 안정성으로 구현되는 데 매료되어 스마트팩토리 직무에 지원했습니다. [프로젝트명]에서 [설비/공정] 데이터의 [지연/누락/가시성] 문제를 맡아 [수집·처리·시각화 방법]을 구현했고, [수치 결과]를 만들었습니다. 이 과정에서 제조 시스템은 새 기능보다 중단 없는 운영과 추적 가능성이 중요하다는 점을 배웠습니다.\n\n현대오토에버의 SDF는 4M+2E를 통합하고 MES·IoT·FactoryBI 등 제조 전 영역을 연결합니다. 입사 후 현장 용어와 데이터 흐름을 빠르게 익히고, 3년 내 장애를 예방하고 개선 과제를 제안하는 제조 IT 전문가로 성장하겠습니다."
  },
  foundation: {
    icon: "D", label: "DIGITAL FOUNDATION", title: "데이터와 클라우드 인프라를 믿고 쓸 수 있게",
    summary: "AI·빅데이터 엔지니어링, 멀티 클라우드 아키텍처 및 철저한 보안 체계는 글로벌 비즈니스의 무너지지 않는 뼈대입니다.",
    evidence: [
      "Python·SQL 기반 데이터 분석 가공 파이프라인 혹은 AI 모델링 적용 결과",
      "Linux 인프라 환경 구축, Docker/K8s 기반 마이크로서비스 컨테이너 배포 경험",
      "보안 취약점 진단, 실시간 접근 로그 감시 및 이상 트래픽 탐지 모듈 구현 기록"
    ],
    questions: [
      "학습용 AI 모델의 과적합 방지와 실 서비스 적용 시 오차 분석(Loss) 관리 방안은?",
      "클라우드 가상 시스템의 서버 인프라 장애 발생 시 원인 격리(Triage) 순서는?",
      "개발 편의성을 극대화하기 위한 오픈 아키텍처와 엄격한 제로트러스트 보안 정책의 조화점은?"
    ],
    example: "“클라우드 인프라 자원 최적화로 월별 운영 비용을 18% 절감시킨 노하우로, 최적의 인프라 효율성을 입증하겠습니다.”",
    essay: "저는 서비스가 커질수록 보이지 않는 데이터·인프라의 품질이 사용자 경험의 신뢰 한도를 결정한다고 믿어 Digital Foundation 분야에 지원했습니다. [프로젝트명]에서 [비정상적인 트래픽/메모리 릭 및 비용 누출 문제]를 발견하여 [내 역할]을 통해 [인프라 진단 및 컨테이너 모니터링 체계]를 빌드하였고 [성능 향상 및 가용 자원 최적화 결과]를 증명해 냈습니다. 이 과정에서 리소스 트레이드오프를 수치로 환산해 판단하는 습관을 들였습니다.\n\n현대오토에버는 커넥티드 카가 생성하는 초대용량 모빌리티 데이터를 빅데이터 인프라 및 전용 하이브리드 클라우드와 결합하여 고도의 비즈니스 기회로 전환하고 있습니다. 입사 초기에는 사내 표준 보안 수칙과 인프라 파이프라인 매뉴얼을 확실히 소화하고, 3년 내 데이터 흐름 병목 현상을 선제 예방하는 플랫폼 최적화 리더로 성장하겠습니다."
  },
  business: {
    icon: "B", label: "BUSINESS & CORPORATE", title: "비즈니스 기회와 다양한 가치를 매끄럽게 연결하기",
    summary: "사업기획·IT 영업·마케팅·회계·노무·HRD 등은 문제를 논리적으로 쪼개고 여러 조직의 실행을 효과적으로 돕는 역할입니다.",
    evidence: [
      "IT/모빌리티 트렌드 분석을 기반으로 시장/고객의 니즈를 계량 분석한 제안서",
      "서로 다른 이해관계를 가진 구성원 간의 합의안을 도출해낸 프로젝트 조율 경험",
      "프로젝트의 비용, 리스크, 일정 진척률을 수치 및 성과 지표로 가시화한 장표"
    ],
    questions: [
      "신뢰할 만한 통계 자료나 정량 데이터가 극도로 부족할 때 어떻게 판단 기준을 정했나?",
      "내 주장에 회의적인 다수의 이해관계자들을 어떤 객관적 근거로 설득했나?",
      "비개발 직무로서 현대오토에버가 다루는 고도의 모빌리티 SW 기술을 어떻게 따라잡았나?"
    ],
    example: "“철저한 고객 행동 데이터를 근거로 서비스 유치 제안 성공률을 32% 올렸던 성과로, 오토에버의 가치를 고객에게 증명하겠습니다.”",
    essay: "저는 흩어진 정보와 이해관계를 정리해 실행 가능한 선택지로 만드는 데 강점이 있어 [사업기획/영업/지원] 직무에 지원하게 되었습니다. [경험명] 활동 당시 [의견 불합치/전략 방향성 부재]로 표류하던 문제를 해결하기 위해 [내 역할]로써 [시장 트렌드 정밀 분석 및 정량 지표 설계]를 시행하여 [목표 수치 달성]이라는 결과를 만들어 냈습니다. 특히 부서 간의 이견을 조율하며, 명확한 문서화와 데이터 중심의 팩트 기반 커뮤니케이션이 완벽한 조화를 만들어 냄을 배웠습니다.\n\n현대오토에버는 현대차그룹 모빌리티 혁신의 조율사이자 스마트 솔루션 공급자입니다. 입사 후 최우선적으로 오토에버의 기술 제품 라인업과 도메인 지식을 흡수해 영업과 제안의 엣지를 강화할 것이며, 3년 차에는 사업 리스크를 상시 감시하고 기회 영역을 숫자로 포착해 전략적 의사결정의 성공 가능성을 비약적으로 높이겠습니다."
  }
};

/* 2. State & Initialization variables */
let selectedTrack = store.get("track", "mobility");
let bookmarks = store.get("bookmarks", []);

/* 3. Track Render Logic */
function renderTrack(key) {
  selectedTrack = key; 
  store.set("track", key);
  const t = tracks[key];
  
  // Update Active Button Style
  $$(".track").forEach(el => el.classList.toggle("active", el.dataset.track === key));
  
  // Bind Text Contents
  $("#trackIcon").textContent = t.icon; 
  $("#trackLabel").textContent = t.label; 
  $("#trackTitle").textContent = t.title;
  $("#trackSummary").textContent = t.summary; 
  $("#trackExample").textContent = t.example;
  
  // Render Bullet Points
  $("#trackEvidence").innerHTML = t.evidence.map(x => `<li>${x}</li>`).join("");
  $("#trackQuestions").innerHTML = t.questions.map(x => `<li>${x}</li>`).join("");
}

$$(".track").forEach(el => {
  el.addEventListener("click", () => renderTrack(el.dataset.track));
});
renderTrack(selectedTrack);

/* 4. D-Day Precise Countdown System (1 second unit) */
function updateDeadline() {
  const end = new Date("2026-07-13T13:00:00+09:00");
  const now = new Date();
  let diff = end - now;
  
  if (diff <= 0) {
    $("#dDay").textContent = "마감됨";
    $("#countdown").innerHTML = `<div style='grid-column:1/-1; padding: 20px 0;'><strong>공식 전형 마감</strong><span>다음 기회를 조속히 준비하세요</span></div>`;
    return;
  }
  
  // Calculate Days, Hours, Minutes, Seconds
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const mins = Math.floor(diff / 60000);
  diff %= 60000;
  const secs = Math.floor(diff / 1000);
  
  // Set D-Day text
  $("#dDay").textContent = `D-${Math.ceil((end - now) / 86400000)}`;
  
  // Set Countdown values HTML
  $("#countdown").innerHTML = [
    [days, "일"],
    [hours, "시간"],
    [mins, "분"],
    [secs, "초"]
  ].map(([n, unit]) => `
    <div class="cd-item">
      <strong class="cd-num">${String(n).padStart(2, "0")}</strong>
      <span class="cd-label">${unit}</span>
    </div>
  `).join("");
}
updateDeadline();
setInterval(updateDeadline, 1000); // 1-second precision ticking

/* 5. SVG Score Gauge Ring System with Animation */
const checks = $$("#checklist input[type='checkbox']");
const savedChecks = store.get("checks", []);

checks.forEach((el, i) => {
  el.checked = !!savedChecks[i];
  el.addEventListener("change", updateScore);
});

function updateScore() {
  const total = checks.reduce((s, e) => s + Number(e.dataset.weight), 0);
  const got = checks.reduce((s, e) => s + (e.checked ? Number(e.dataset.weight) : 0), 0);
  const score = Math.round((got / total) * 100) || 0;
  
  // Bind Text
  $("#scoreValue").textContent = score;
  
  // SVG circular gauge calculation
  const circumference = 263.893;
  const offset = circumference - (score / 100) * circumference;
  
  const progressCircle = $("#scoreProgressCircle");
  if (progressCircle) {
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = offset;
  }
  
  // State messages according to score ranges
  const states = 
    score < 30 ? ["기반 다지기 단계", "지원 직무의 본질을 정하고 대표적인 경험 1개를 선별해 보세요."] :
    score < 60 ? ["체계적 초안 빌딩", "각 경험을 수치와 극복 스토리 중심으로 보완하면 훌륭해집니다."] :
    score < 85 ? ["제출 안정권 진입", "자소서 실전 코칭 노트를 점검하고, 면접 예행 리허설에 임하세요."] :
                 ["합격 최종 카운트", "모든 첨부 서류 링크 권한과 개인 정보 정밀 검사를 마치고 최종 제출하십시오!"];
  
  $("#scoreMessage").textContent = states[0];
  $("#scoreAdvice").textContent = states[1];
  
  store.set("checks", checks.map(e => e.checked));
}
updateScore();

// Reset Checklist handler
$("#resetChecklist").addEventListener("click", () => {
  if (confirm("정착 진행된 체크리스트를 완전히 초기화하시겠습니까?")) {
    checks.forEach(e => e.checked = false);
    updateScore();
  }
});

/* 6. Real-Time HUD Suitability & Target Map Matcher Module */
function updateEligibility() {
  const status = $("#profileStatus").value;
  const strength = $("#profileStrength").value;
  
  const badge = $("#hudStatusBadge");
  const fill = $("#hudBarFill");
  const tip = $("#hudTipText");
  
  // Reset all target cards active states
  $$(".target-card").forEach(card => card.classList.remove("active"));
  
  let percent = 50;
  let statusText = "CHECKING";
  let badgeClass = "fit-check";
  let text = "";
  
  // 1. Determine status matching & active card
  if (status === "student") {
    percent = 85;
    statusText = "RECOMMENDED";
    badgeClass = "fit-opportunity";
    $("#targetCardStudent").classList.add("active");
    text = "2026년 8월 이내 취득 예정인 졸업예정자 정식 전형 대상입니다. HMAT 및 코딩/과제 테스트가 핵심 관문입니다. 스펙 나열보다 개인 포트폴리오 산출물에 개별 기여율을 정확한 수치로 격리해 어필하세요. ";
  } else if (status === "graduate") {
    percent = 90;
    statusText = "QUALIFIED";
    badgeClass = "fit-qualified";
    $("#targetCardStudent").classList.add("active");
    text = "학위를 보유한 기졸업자 정식 지원 요건을 완벽히 충족합니다. 실무 기여가 즉시 가능한 아키텍처 판단 능력을 강조하십시오. 기술을 채택한 비교 기준과 트레이드오프 결정 과정이 1차 면접의 핵심 합격 요인입니다. ";
  } else if (status === "career") {
    percent = 98;
    statusText = "HIGH-FIT";
    badgeClass = "fit-qualified";
    $("#targetCardCareer").classList.add("active");
    text = "중고신입 강력 추천 대상! 채용 공고상 공식적으로 나이 제한이 전혀 없으며, 기존 실무 경력이 매우 훌륭한 협업 자산으로 직접 인정됩니다. 이전 조직에서의 장애 해결 및 위기 대응 스토리를 자소서 2번에 전면 배치해 우위를 선점하세요. ";
  } else if (status === "switch") {
    percent = 75;
    statusText = "MATCH-GUIDE";
    badgeClass = "fit-check";
    $("#targetCardSwitch").classList.add("active");
    text = "전공 무관 기회 제공! 비개발 직군(사업기획, IT영업, 회계, HRD 등 전사공통)을 타겟으로 매칭을 권장합니다. 현대오토에버 비즈니스 솔루션과 모빌리티 도메인에 대한 강한 분석적 관심과 문서를 활용한 부서 간 협업 조율 역량을 중심 가치로 내세우세요. ";
  }
  
  // 2. Add strength-based tactical tip
  if (strength === "build") {
    text += "특히 구현한 프로젝트가 강점이므로 설계 시 직면했던 병목 지점 극복 과정 및 성능 지표 비포&애프터를 구체화해 엣지를 살려주십시오.";
  } else if (strength === "operate") {
    text += "시스템 무장애 배포 및 가동 가용성 유지 노하우는 오토에버 제조 실행/클라우드 운영 파트에서 핵심 우대 사항이 되므로 장애 탐지 원인 규명 위주로 STAR를 분해해 보세요.";
  } else if (strength === "data") {
    text += "대용량 파이프라인 설계 혹은 모델 손실 파라미터 튜닝 기록을 활용해 Digital Foundation 데이터 엔지니어링 영역에 강력한 기여 근거를 입증하십시오.";
  } else if (strength === "collab") {
    text += "의견이 격돌하는 현장 속에서 데이터 실험을 활용해 타협점을 찾아낸 경험을 경험 분해기에 작성해 2차 인성/컬처핏 면접 무기로 구축하십시오.";
  }
  
  // 3. Apply HUD visual updates
  badge.textContent = statusText;
  badge.className = `hud-badge ${badgeClass}`;
  fill.style.width = `${percent}%`;
  tip.textContent = text;
  
  // Store values
  store.set("profileStatus", status);
  store.set("profileStrength", strength);
}

// Bind Simulator Events
$("#profileStatus").addEventListener("change", updateEligibility);
$("#profileStrength").addEventListener("change", updateEligibility);

// Load filters from storage & Initial Run
$("#profileStatus").value = store.get("profileStatus", "student");
$("#profileStrength").value = store.get("profileStrength", "build");
updateEligibility();

/* 7. Advanced Essay Draft Editor & Live AI Coach */
const essay = $("#essayDraft");
if (essay) {
  essay.value = store.get("essay", "");
  
  function analyzeEssay() {
    const text = essay.value;
    $("#charCount").textContent = text.length;
    store.set("essay", text);
    
    let notes = [];
    if (text.length && text.length < 500) {
      notes.push("텍스트가 다소 짧습니다. 500자 이상 확보하여 상황(S)과 행동(A) 과정을 명확히 설명해 보세요.");
    }
    if (text.length > 930) {
      notes.push("분량이 가득 찼습니다. 최종 마감 글자 수 한도를 맞추기 위해 불필요한 수식어를 덜어내 정제하세요.");
    }
    if (text && !/\d/.test(text)) {
      notes.push("구체적인 성과 입증을 위해 백분율, 시간, 회수, 데이터 크기 등 정량적 숫자를 최소 1개 이상 추가하세요.");
    }
    if (text && !/(현대오토에버|mobilgene|SDF|모빌리티|커넥티드|클라우드|보안|MES)/i.test(text)) {
      notes.push("현대오토에버의 공식 브랜드 제품군(mobilgene, SDF 등) 또는 채용 직무 기술 지표 키워드를 녹여 회사 접점을 만드세요.");
    }
    
    $("#coachText").textContent = notes[0] || 
      (text ? "훌륭합니다. 논리적 문맥 설계가 안정적입니다. 오탈자 교정과 링크 유효성 검사만 진행해 보세요." : "초안 작성을 하거나 템플릿을 불러와 수정을 시작해 보세요.");
  }
  
  essay.addEventListener("input", analyzeEssay);
  analyzeEssay();
  
  // Load Template logic
  $("#loadExample").addEventListener("click", () => {
    if (essay.value && !confirm("현재 작성 중인 자소서 초안을 선택한 직무 맞춤 템플릿으로 대체하시겠습니까?")) {
      return;
    }
    essay.value = tracks[selectedTrack].essay;
    analyzeEssay();
    essay.focus();
  });
}

/* 8. Fullscreen Focus Writing Mode toggle logic */
const focusBtn = $("#focusModeBtn");
if (focusBtn) {
  focusBtn.addEventListener("click", () => {
    document.body.classList.toggle("focus-active");
    const isFocus = document.body.classList.contains("focus-active");
    focusBtn.querySelector("span").textContent = isFocus ? "fullscreen_exit" : "fullscreen";
    focusBtn.title = isFocus ? "집중 쓰기 모드 종료" : "집중 쓰기 모드 켜기";
  });
  
  $("#focusOverlay").addEventListener("click", () => {
    document.body.classList.remove("focus-active");
    focusBtn.querySelector("span").textContent = "fullscreen";
    focusBtn.title = "집중 쓰기 모드 켜기";
  });
}

/* 9. Clipboard Utilities & Notification Toast Alert */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("클립보드에 안전하게 복사되었습니다.");
  } catch {
    showToast("클립보드 복사에 실패했습니다. 직접 복사해 주세요.");
  }
}

if ($("#copyEssay")) {
  $("#copyEssay").addEventListener("click", () => copyText(essay.value));
}

$$("[data-copy-target]").forEach(el => {
  el.addEventListener("click", () => {
    const target = $("#" + el.dataset.copyTarget);
    if (target) copyText(target.textContent);
  });
});

function showToast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2000);
}

/* 10. Question Bank Strategy System with Bookmarking */
const questions = {
  project: ["PROJECT DEEP DIVE", "“그 기술을 선택한 이유와 다른 대안은 무엇이었나요?”", "단순 구현 경험이 아니라 제약 속에서 판단한 기준과 기술적 깊이", "제약조건 → 비교한 대안 2개 → 선택 기준 → 결과 → 지금 다시 한다면", "“처리량보다 장애 복구 시간이 중요한 서비스였습니다. A와 B를 비교했고, 운영 복잡도가 낮은 B를 선택해 평균 복구 시간을 35% 줄였습니다.”"],
  company: ["WHY AUTOEVER", "“왜 다른 IT 대기업이 아니라 현대오토에버에 지원했습니까?”", "단순한 인지도 찬양이 아니라 본인의 지향 가치와 오토에버 기술 생태계의 접점", "내가 풀고 싶은 도메인 문제 → 나의 유효 경험 → 현대오토에버 비즈니스의 조화 → 기여 지점", "“스마트 공장 센서 로그 처리 속도를 개선해 본 후, IT와 OT를 연결하여 SDF 핵심 데이터 파이프라인에서 실제 필드 성능 최적화를 완성하고 싶어졌습니다.”"],
  failure: ["FAILURE & CONFLICT", "“의견 대립이 심할 때 본인의 주장을 포기하거나 타협한 경험은?”", "독단적 자존심 경쟁이 아닌, 객관적 데이터와 공동의 가치를 최우선으로 두는 태도", "상황 충돌 요인 → 공동 목표 확인 → 실험/검증 기준 합의 → 양보 및 대안 적용 → 결과 배움", "“배포 일정과 성능 튜닝 범위가 충돌했을 때, 성능 병목 실험을 3시간 동안 팀원들과 같이 검증하여 핵심 결함 부위만 타이트하게 수정하고 정상 출시했습니다.”"],
  culture: ["CULTURE FIT", "“스스로의 기술 성장을 위해 지속적으로 하고 있는 습관은?”", "피드백을 가치 있게 소화하고, 일상 속에서 자기주도적으로 학습을 이어가는 프로세스", "부족함 인지 → 루틴 설정 및 계량화 → 성장 피드백 수렴 → 개선된 개발 패턴", "“팀원 코드 리뷰 때 가독성이 낮다는 피드백을 기록한 뒤로, 매주 1시간씩 오픈소스 코드의 리팩토링 유형을 분석하여 커밋 메시지와 디자인 가이드를 재정비했습니다.”"]
};

let currentQuestionKey = "project";

function updateQuestionUI(key) {
  currentQuestionKey = key;
  
  // If not bookmark tab, render standard question details
  if (key !== "bookmark") {
    $("#bookmarkListContainer").classList.add("hidden");
    
    // Show text fields
    $("#questionTag").style.display = "block";
    $("#bookmarkToggleBtn").style.display = "block";
    $("#questionText").style.display = "block";
    $(".intent-box").style.display = "flex";
    $(".frame-box").style.display = "flex";
    $("#questionExample").style.display = "block";
    
    const q = questions[key];
    $("#questionTag").textContent = q[0];
    $("#questionText").textContent = q[1];
    $("#questionIntent").innerHTML = `<b>면접관 평가 포인트:</b> ${q[2]}`;
    $("#questionFrame").innerHTML = `<b>답변 구조화 공식:</b><p>${q[3]}</p>`;
    $("#questionExample").textContent = q[4];
    
    // Toggle Bookmark active star
    const isBookmarked = bookmarks.includes(key);
    $("#bookmarkToggleBtn").classList.toggle("bookmarked", isBookmarked);
    $("#bookmarkToggleBtn").querySelector("span").textContent = isBookmarked ? "star" : "star_rate";
  } else {
    // Show Bookmark list view
    $("#questionTag").style.display = "none";
    $("#bookmarkToggleBtn").style.display = "none";
    $("#questionText").style.display = "none";
    $(".intent-box").style.display = "none";
    $(".frame-box").style.display = "none";
    $("#questionExample").style.display = "none";
    
    $("#bookmarkListContainer").classList.remove("hidden");
    renderBookmarkList();
  }
}

// Handler for Question Tabs
$$(".question-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".question-buttons button").forEach(x => x.classList.toggle("active", x === btn));
    updateQuestionUI(btn.dataset.question);
  });
});

// Bookmark Add/Remove action
const bookmarkToggleBtn = $("#bookmarkToggleBtn");
if (bookmarkToggleBtn) {
  bookmarkToggleBtn.addEventListener("click", () => {
    const isBookmarked = bookmarks.includes(currentQuestionKey);
    if (isBookmarked) {
      bookmarks = bookmarks.filter(x => x !== currentQuestionKey);
      showToast("보관함에서 제거되었습니다.");
    } else {
      bookmarks.push(currentQuestionKey);
      showToast("자주 연습할 면접 질문 보관함에 보관되었습니다.");
    }
    store.set("bookmarks", bookmarks);
    updateBookmarkBadge();
    updateQuestionUI(currentQuestionKey);
  });
}

function updateBookmarkBadge() {
  $("#bookmarkCount").textContent = bookmarks.length;
}

function renderBookmarkList() {
  const container = $("#bookmarkList");
  const emptyState = $("#bookmarkEmptyState");
  container.innerHTML = "";
  
  if (bookmarks.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }
  
  emptyState.classList.add("hidden");
  
  bookmarks.forEach(key => {
    const q = questions[key];
    const li = document.createElement("li");
    li.className = "bookmark-item";
    li.innerHTML = `
      <div class="bookmark-item-text">
        <span style="color: var(--accent-cyan); font-size: 0.72rem; display: block;">[${q[0]}]</span>
        ${q[1]}
      </div>
      <button class="remove-bookmark-btn" type="button" data-key="${key}" title="보관함에서 삭제">
        <span class="material-symbols-rounded">delete</span>
      </button>
    `;
    
    // Event listener for remove button inside list
    li.querySelector(".remove-bookmark-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      bookmarks = bookmarks.filter(x => x !== key);
      store.set("bookmarks", bookmarks);
      updateBookmarkBadge();
      renderBookmarkList();
      showToast("보관함에서 삭제되었습니다.");
    });
    
    container.appendChild(li);
  });
}

updateBookmarkBadge();
updateQuestionUI("project");

/* 11. Reference Card Image Zooming Dialog Control */
const dialog = $("#imageDialog");
const dialogImage = $("#dialogImage");

if (dialog && dialogImage) {
  $$("[data-image]").forEach(btn => {
    btn.addEventListener("click", () => {
      dialogImage.src = btn.dataset.image;
      dialogImage.alt = $("img", btn).alt;
      dialog.showModal();
    });
  });

  $("#closeDialog").addEventListener("click", () => dialog.close());
  
  // Click backdrop zone to close dialog
  dialog.addEventListener("click", e => {
    if (e.target === dialog) dialog.close();
  });
}

/* 12. Modern Light/Dark Mode Switcher */
const themeToggle = $("#themeToggle");
const currentTheme = store.get("theme", "dark");
document.documentElement.setAttribute("data-theme", currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", nextTheme);
    store.set("theme", nextTheme);
    showToast(`${nextTheme === "dark" ? "다크 테마" : "라이트 테마"}로 변경되었습니다.`);
  });
}

/* 13. System Share Feature (Web Share API) */
async function shareDashboard() {
  const shareData = {
    title: "EVER:READY V2 — 현대오토에버 지원 가이드 대시보드",
    text: "현대오토에버 2026년 3분기 채용 준비를 원스톱으로 관리하는 개인 대시보드를 공유합니다.",
    url: location.href
  };
  
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await copyText(location.href);
    }
  } catch (e) {
    if (e.name !== "AbortError") {
      showToast("공유하기 동작을 진행할 수 없습니다.");
    }
  }
}

const shareBtn = $("#shareButton");
if (shareBtn) {
  shareBtn.addEventListener("click", shareDashboard);
}
