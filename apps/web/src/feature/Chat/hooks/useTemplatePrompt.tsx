import { useState } from "react";

const useTemplatePrompt = () => {
  const [templatePrompt, setTemplatePrompt] = useState<string>("");

  return {
    templatePrompt: templatePrompt,
    setTemplatePrompt,
  };
};

export default useTemplatePrompt;
