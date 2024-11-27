import type { PartnershipStatus } from "@/data/partners/@types"

import type {
    CompanyItem,
    WorkshopItem,
    UserItem,
    UniversityItem,
    PartnerItem,
    LanguageItem,
    FieldOfStudyItem,
    LanguageSkillItem,
    WorkshopMemberItem,
    WorkshopItemStatusEnum,
    PartnerItemPartnerTypeEnum,
    WorkshopMemberItemStatusEnum,
    LanguageSkillItemSkillLevelEnum,
    PartnerItemCreatePartnerTypeEnum,
} from "@/api/api"

export {
    CompanyItem as Company,
    WorkshopItem as Workshop,
    UserItem as User,
    UniversityItem as University,
    PartnerItem as Partner,
    LanguageItem as Language,
    FieldOfStudyItem as FieldOfStudy,
    LanguageSkillItem as LanguageSkill,
    WorkshopMemberItem as WorkshopMember,
    WorkshopItemStatusEnum as WorkshopStatus,
    PartnerItemPartnerTypeEnum as PartnerType,
    WorkshopMemberItemStatusEnum as WorkshopMemberStatus,
    LanguageSkillItemSkillLevelEnum as LanguageSkillLevel,
    PartnerItemCreatePartnerTypeEnum as CreatePartnerType,
}

/**
 * Object representing a partner data need to either **create** or **update** a partner
 */
export interface SavePartner
    extends Required<
        Pick<
            PartnerItem,
            | "name" //
            | "partnerType"
            | "shortDescription"
            | "longDescription"
            | "websiteUrl"
        >
    > {
    published: PartnershipStatus
    displayPriority: number
}
