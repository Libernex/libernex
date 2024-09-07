interface SampleTemplateSectionProps {
  setTemplateText: (text: string) => void;
}

function SampleTemplateSection({
  setTemplateText,
}: SampleTemplateSectionProps): JSX.Element {
  return (
    <div className="container mx-auto mt-24">
      <div className="flex justify-between">
        {cardData.map((card, index) => (
          <Card
            key={index}
            src={card.src}
            title={card.title}
            description={card.description}
            onClick={() => setTemplateText(card.prompt)}
          />
        ))}
      </div>
    </div>
  );
}

function Card({
  src,
  title,
  description,
  onClick,
}: {
  src: string;
  title: string;
  description: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <div className="flex flex-col my-2 group" onClick={onClick}>
      <div className="w-40 h-40 relative">
        <div
          className="absolute inset-0"
          style={{
            filter: "drop-shadow(30px 30px 100px rgba(16, 45, 97, 0.16))",
          }}
        >
          <img
            src={src}
            className="w-full h-full object-contain group-hover:hover-grow"
          />
        </div>
      </div>
      <span className="text-xl font-bold mb-2">{title}</span>
      <span className="w-40 text-sm" style={{ wordBreak: "keep-all" }}>
        {description}
      </span>
    </div>
  );
}

// 카드 데이터를 오브젝트 형태로 정의
const cardData = [
  {
    src: "L-Folder.svg",
    title: "이전동일사례 검색",
    description: "동일한 사례가 이전에 있는지 간단하게 확인해볼 수 있어요",
    prompt: "사례를 찾아줘",
  },
  {
    src: "L-Email.svg",
    title: "메일 관련 기능",
    description: "메일과 관련된 무엇가 개쩌는 기능",
    prompt: "메일 좀 빨리 찾아줘",
  },
  {
    src: "L-Chat Bubbles.svg",
    title: "연락 어쩌구",
    description: "연락관련한 간편한 검색 기능",
    prompt: "연락 같은 좋은 기능 해줘",
  },
  {
    src: "L-User.svg",
    title: "담당자 찾기",
    description: "하 담당자가 누구더라. 이제는 그만~ 우리 서비스를 이용해",
    prompt: "담당자 좀 찾아줘",
  },
];

export default SampleTemplateSection;
