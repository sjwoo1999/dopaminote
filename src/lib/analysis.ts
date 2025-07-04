/**
 * 도파민 기록 분석 로직 (목업 버전)
 */

import { MockDopamineRecord, MockAnalysisResult } from "@/types";

/**
 * 목업 데이터를 기반으로 분석 결과를 생성합니다.
 */
export function generateMockAnalysis(): MockAnalysisResult {
  return {
    totalRecords: 12,
    situationBreakdown: {
      "소셜미디어": 5,
      "심심함": 3,
      "습관": 2,
      "스트레스": 1,
      "업무": 1,
    },
    moodBreakdown: {
      "좋음": 4,
      "무감정": 5,
      "나쁨": 3,
    },
    averageMood: 2.3,
    mostCommonSituation: "소셜미디어",
    feedback: [
      "소셜미디어 사용이 많습니다. 디지털 웰빙을 위해 사용 시간을 제한해보세요.",
      "꾸준히 기록하고 계시네요! 패턴을 파악하는 데 도움이 될 것입니다.",
      "건강한 도파민 소비 패턴을 보이고 있습니다. 계속 관찰해보세요!"
    ]
  };
}

/**
 * 목업 회고 데이터를 생성합니다.
 */
export function generateMockJournalEntries() {
  return [
    {
      id: "1",
      date: "2025-01-03",
      reflection: "오늘은 소셜미디어를 너무 많이 사용했다. 특히 점심시간과 저녁시간에 인스타그램을 오래 스크롤했다. 이런 패턴이 반복되고 있는 것 같다.",
      goals: "내일부터는 소셜미디어 사용 시간을 30분으로 제한하고, 대신 책을 읽거나 산책을 하자.",
      created_at: "2025-01-03T20:30:00Z"
    },
    {
      id: "2",
      date: "2025-01-02",
      reflection: "업무 중에 스트레스가 쌓여서 유튜브를 보면서 시간을 보냈다. 하지만 오히려 더 스트레스가 쌓인 것 같다.",
      goals: "스트레스 해소를 위해 명상이나 운동을 해보자. 유튜브 대신 음악을 듣는 것이 좋겠다.",
      created_at: "2025-01-02T19:45:00Z"
    },
    {
      id: "3",
      date: "2025-01-01",
      reflection: "새해 첫날이라 특별한 날이었는데, 온라인 쇼핑을 하면서 많은 시간을 보냈다. 하지만 실제로 필요한 것은 별로 없었다.",
      goals: "구매 전에 24시간 기다리는 규칙을 만들어보자. 충동구매를 줄일 수 있을 것이다.",
      created_at: "2025-01-01T22:15:00Z"
    }
  ];
}
