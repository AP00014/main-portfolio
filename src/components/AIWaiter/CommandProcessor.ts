import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { AIResponse } from "@/lib/ai-config";

interface CommandInput {
  response: AIResponse;
  router: AppRouterInstance;
}

export function runCommand({ response, router }: CommandInput) {
  if (response.action === "navigate" && response.target) {
    router.push(response.target);
    return;
  }

  if (response.action === "scroll" && response.target) {
    const element = document.querySelector(response.target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  if (response.action === "highlight" && response.target) {
    const element = document.querySelector(response.target);
    if (element) {
      element.classList.add("ring-2", "ring-primary");
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-primary");
      }, 2000);
    }
  }
}
