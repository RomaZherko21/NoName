import { CreditCard } from "shared/types";

export const getBillingConfig = () => [
    {
        title: 'user:bankCard.cardHolderName',
        field: 'name_on_card'
    },
    {
        title: 'user:bankCard.number',
        field: 'card_number'
    },
    {
        title: 'user:bankCard.expiryDate',

        field: 'valid_thru'
    },

    {
        title: 'user:bankCard.cvv',
        field: 'cvv'
    }
]