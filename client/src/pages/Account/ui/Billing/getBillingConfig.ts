
export const getBillingConfig = ({ cardNumber, nameOnCard, validThru, cvv }: any) => [
    {
        title: 'user:bankCard.number',
        text: cardNumber.replace(/(\d{4}(?!\s))/g, '$1 ')
    },
    {
        title: 'user:bankCard.cardHolderName',
        text: nameOnCard
    },
    {
        title: 'user:bankCard.expiryDate',
        text: validThru.split('/').join(' / ')
    },

    {
        title: 'user:bankCard.cvv',
        text: cvv
    }
]