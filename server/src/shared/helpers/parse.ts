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

    password: user.password,
  }
}
