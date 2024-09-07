import { useState } from "react";

const useTemplatePrompt = () => {
  const [templatePrompt, setTemplatePrompt] = useState<string>("");

  return {
    templateText: templatePrompt,
    setTemplateText: setTemplatePrompt,
  };
};

export default useTemplatePrompt;
