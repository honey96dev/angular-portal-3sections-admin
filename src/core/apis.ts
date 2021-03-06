const apis = {
  common: {
    upload: 'common/upload',
    userMgmt: {
      list: 'user-mgmt/list',
      add: 'user-mgmt/add',
      edit: 'user-mgmt/edit',
      delete: 'user-mgmt/delete',
      allow: 'user-mgmt/allow',
      resetPassword: 'user-mgmt/reset-password',
    },
    mediaSlider: {
      list: 'media-slider/list',
      add: 'media-slider/add',
      edit: 'media-slider/edit',
      delete: 'media-slider/delete',
    },
    ourServices: {
      list: 'our-services/list',
      add: 'our-services/add',
      edit: 'our-services/edit',
      delete: 'our-services/delete',
    },
    contactUs: {
      list: 'contact-us/list',
      add: 'contact-us/add',
      edit: 'contact-us/edit',
      delete: 'contact-us/delete',
    },
    businessPartner: {
      list: 'business-partner/list',
      add: 'business-partner/add',
      edit: 'business-partner/edit',
      delete: 'business-partner/delete',
    },
    ourClients: {
      list: 'our-clients/list',
      add: 'our-clients/add',
      edit: 'our-clients/edit',
      delete: 'our-clients/delete',
    },
    directorBoard: {
      list: 'director-board/list',
      add: 'director-board/add',
      edit: 'director-board/edit',
      delete: 'director-board/delete',
    },
    events: {
      list: 'events/list',
      add: 'events/add',
      edit: 'events/edit',
      delete: 'events/delete',
      get: 'events/get',
      applicants: 'events/applicants',
      deleteApplicant: 'events/delete-applicant',
      paid: 'events/paid',
      attend: 'events/attend',
    },
    previousEvents: {
      list: 'previous-events/list',
      add: 'previous-events/add',
      edit: 'previous-events/edit',
      delete: 'previous-events/delete',
    },
    upcomingEvents: {
      list: 'upcoming-events/list',
      add: 'upcoming-events/add',
      edit: 'upcoming-events/edit',
      delete: 'upcoming-events/delete',
    },
    eventPhotos: {
      list: 'event-photos/list',
      add: 'event-photos/add',
      edit: 'event-photos/edit',
      delete: 'event-photos/delete',
      get: 'event-photos/get',
    },
    courses: {
      list: 'courses/list',
      add: 'courses/add',
      edit: 'courses/edit',
      delete: 'courses/delete',
      get: 'courses/get',
      applicants: 'courses/applicants',
      deleteApplicant: 'courses/delete-applicant',
      paid: 'courses/paid',
      attend: 'courses/attend',
      items: {
        list: 'courses/items/list',
        add: 'courses/items/add',
        edit: 'courses/items/edit',
        delete: 'courses/items/delete',
        get: 'courses/items/get',
      }
    },
    courseInstructors: {
      list: 'course-instructors/list',
      add: 'course-instructors/add',
      edit: 'course-instructors/edit',
      delete: 'course-instructors/delete',
      get: 'course-instructors/get',
    },
    prevSponsors: {
      list: 'prev-sponsors/list',
      add: 'prev-sponsors/add',
      edit: 'prev-sponsors/edit',
      delete: 'prev-sponsors/delete',
    },
    qrScanner: {
      get: 'qr-scanner/get',
      post: 'qr-scanner/post',
    },
    aboutUs: {
      load: 'about-us/load',
      save: 'about-us/save',
    },
  },
  auth: {
    signIn: 'auth/sign-in',
    signUp: 'auth/sign-up',
  },
  human: {},
  training: {
    loadAnnualSettings: 'training/load-annual-settings',
    saveAnnualSettings: 'training/save-annual-settings',
  },
  massEmail: {
    sendEmail: 'mass-email/send-email',
  },
};

export {
  apis,
};
