import { LanguageSkillItemSkillLevelEnum } from "@/api"

export function renderLanguageSkillLevel(skillLevel: LanguageSkillItemSkillLevelEnum) {
    switch (skillLevel) {
        case "NATIVE":
            return "Poziom rodowity"
        case "FLUENT":
            return "Biegły"
        case "INTERMEDIATE":
            return "Średnio Zaawansowany"
        case "BEGINNER":
            return "Początkujący"
        default:
            return "Nieznany"
    }
}
