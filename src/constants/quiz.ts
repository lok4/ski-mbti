import { Question, QuizResult } from "@/types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "스키장에 처음 도착했을 때, 아이의 반응은?",
    options: [
      { id: "q1_a", text: "와! 눈이다! 빨리 올라가자고 재촉한다.", value: "SPEEDY_CHEETAH" },
      { id: "q1_b", text: "미끄러질까 봐 부모님 손을 꼭 잡고 놓지 않는다.", value: "CAREFUL_PENGUIN" },
      { id: "q1_c", text: "저건 뭐야? 이건 뭐야? 호기심 가득하게 여기저기 탐색한다.", value: "BRAVE_POLAR_BEAR" },
      { id: "q1_d", text: "눈사람 만들자! 친구들이랑 노느라 스키엔 관심이 덜하다.", value: "SOCIAL_DOLPHIN" },
    ],
  },
  {
    id: 2,
    text: "선생님이 새로운 동작을 가르쳐주실 때 아이는?",
    options: [
      { id: "q2_a", text: "설명 듣기 전에 이미 몸부터 움직이고 본다.", value: "BRAVE_POLAR_BEAR" },
      { id: "q2_b", text: "왜 그렇게 해야 해요? 꼼꼼하게 이유를 물어본다.", value: "CAREFUL_PENGUIN" },
      { id: "q2_c", text: "다른 친구들은 어떻게 하나 두리번거린다.", value: "SOCIAL_DOLPHIN" },
      { id: "q2_d", text: "빨리 배우고 더 높은 곳으로 가고 싶어 한다.", value: "SPEEDY_CHEETAH" },
    ],
  },
  {
    id: 3,
    text: "리프트를 타고 올라가는 중, 아이는 무슨 생각을 할까요?",
    options: [
      { id: "q3_a", text: "저기 저 코스 재밌겠다! 나도 저기로 갈래!", value: "SPEEDY_CHEETAH" },
      { id: "q3_b", text: "엄마/아빠랑 같이 사진 찍자! 경치 구경에 신났다.", value: "SOCIAL_DOLPHIN" },
      { id: "q3_c", text: "내려갈 때 안 넘어질 수 있을까? 살짝 긴장한 표정.", value: "CAREFUL_PENGUIN" },
      { id: "q3_d", text: "정상에 가면 내가 대장이다! 자신감 뿜뿜.", value: "BRAVE_POLAR_BEAR" },
    ],
  },
  {
    id: 4,
    text: "스키를 타다가 꽈당! 넘어졌을 때 아이의 반응은?",
    options: [
      { id: "q4_a", text: "울지 않고 씩씩하게 혼자 일어난다.", value: "BRAVE_POLAR_BEAR" },
      { id: "q4_b", text: "아픈 곳은 없는지 꼼꼼히 확인하고 부모님을 찾는다.", value: "CAREFUL_PENGUIN" },
      { id: "q4_c", text: "창피해... 친구들이 봤을까 봐 두리번거린다.", value: "SOCIAL_DOLPHIN" },
      { id: "q4_d", text: "시간 아까워! 빨리 다시 출발하려 한다.", value: "SPEEDY_CHEETAH" },
    ],
  },
];

export const RESULTS: Record<string, QuizResult> = {
  BRAVE_POLAR_BEAR: {
    type: "BRAVE_POLAR_BEAR",
    title: "용감한 북극곰",
    description: "두려움 없는 도전 정신! 우리 아이는 설원 위의 작은 대장님입니다. 넘어지는 것을 두려워하지 않고 끊임없이 도전하는 아이에게는 실전 경험을 많이 쌓게 해주는 강습이 효과적이에요.",
    imageUrl: "/images/polar-bear.png",
    tags: ["#도전정신", "#실전파", "#무한체력"],
    recommendedLesson: "도전이 자신감으로! 1:1 맞춤 성취형 강습",
  },
  CAREFUL_PENGUIN: {
    type: "CAREFUL_PENGUIN",
    title: "신중한 펭귄",
    description: "돌다리도 두들겨 보고 건너는 신중파! 안전이 최우선인 우리 아이는 기초부터 탄탄하게 다져주는 것이 중요합니다. 친절하고 자세한 설명으로 아이를 안심시켜주는 선생님이 필요해요.",
    imageUrl: "/images/penguin.png",
    tags: ["#안전제일", "#이론파", "#꼼꼼함"],
    recommendedLesson: "두려움을 재미로! 아이 눈높이 밀착 안심 강습",
  },
  SPEEDY_CHEETAH: {
    type: "SPEEDY_CHEETAH",
    title: "질주하는 치타",
    description: "속도를 즐기는 스피드 레이서! 답답한 건 못 참는 우리 아이는 빠른 진도와 다이내믹한 코칭을 선호합니다. 아이의 넘치는 에너지를 발산할 수 있는 강습이 딱이에요.",
    imageUrl: "/images/cheetah.png",
    tags: ["#스피드광", "#속전속결", "#에너자이저"],
    recommendedLesson: "에너지를 실력으로! 다이내믹 레벨업 강습",
  },
  SOCIAL_DOLPHIN: {
    type: "SOCIAL_DOLPHIN",
    title: "인싸 돌고래",
    description: "함께하면 즐거움이 두 배! 혼자 배우는 것보다 또래 친구들과 어울려 타는 것을 좋아하는 아이입니다. 재미있는 게임과 눈놀이를 곁들인 그룹 강습이 최고의 선택이에요.",
    imageUrl: "/images/dolphin.png",
    tags: ["#분위기메이커", "#친구조아", "#놀이같은스키"],
    recommendedLesson: "스키와 사회성을 동시에! 즐거운 또래 팀 강습",
  },
};
