import { CreditCard } from "shared/types";

export const getBillingConfig = ({ creditCardInfo }: { creditCardInfo: CreditCard }) => [
    {
        title: 'user:bankCard.cardHolderName',
        text: creditCardInfo.name_on_card
    },
    {
        title: 'user:bankCard.number',
        text: creditCardInfo.card_number?.replace(/(\d{4}(?!\s))/g, '$1 ')
    },
    {
        title: 'user:bankCard.expiryDate',
        text: creditCardInfo.valid_thru?.split('/').join(' / ')
    },

    {
        title: 'user:bankCard.cvv',
        text: creditCardInfo.cvv
    }
]