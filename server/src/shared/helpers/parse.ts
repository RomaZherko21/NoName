export const prettifyUserData = (user: any) => {
  return {
    basic: {
      id: user.id,
      name: user.name,
      surname: user.surname,
      middle_name: user.middle_name,

      email: user.email,
      tel_number: user.tel_number,
      role: user.role,
    },

    meta: {
      gender: user.gender,
      date_of_birth: user.date_of_birth,

      job_title: user.job_title,
      avatar: user.avatar,
      profile_background: user.profile_background,
    },

    credit_card: {
      card_number: user.card_number,
      name_on_card: user.name_on_card,
      valid_thru: user.valid_thru,
      cvv: user.cvv,
    },

    place: {
      native_country: user.native_country,
      native_city: user.native_city,
      residence_country: user.residence_country,
      residence_city: user.residence_city,
    },

    security: {
      is_email_verified: Boolean(user.is_email_verified),
      is_phone_verified: Boolean(user.is_phone_verified),

      is_two_factor_auth_active: Boolean(user.is_two_factor_auth_active),
      is_sms_alerts_active: Boolean(user.is_sms_alerts_active),
      is_email_alerts_active: Boolean(user.is_email_alerts_active),
    },

    password: user.password,
  }
}
