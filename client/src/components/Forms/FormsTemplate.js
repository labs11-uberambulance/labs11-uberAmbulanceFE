const onboardingForm = {
        name: {
          elementType: 'TextField',
          elementAttri: { type: 'text', placeholder: 'Name', label: 'Name', value:'' },
        },
        email: {
          elementType: 'TextField',
          elementAttri: { type: 'text', placeholder: 'Email', label: 'Email', value:'' },
        },
        addressDescription: {
          elementType: 'TextField',
          elementAttri: { type: 'text', placeholder: 'Address', label: 'Address', multiline: true, rows: '3', value:'' }  ,
        },
        addressNearestTown: {
          elementType: 'TextField',
          elementAttri: { type: 'text', placeholder: 'Nearest Town', label: 'Nearest Town', value:'' },
        },
        phoneNumber: {
          elementType: 'TextField',
          elementAttri: { type: 'text', placeholder: 'Phone Number', label: 'Phone Number', value:'' },
        },
        rate: {
          elementType: 'TextField',
          elementAttri: { type: 'number', placeholder: 'Rate per km', label: 'Rate per km', value:'' },
        },
        photo: {
          elementType: 'TextField',
          elementAttri: { type: 'file', label: 'Upload a Photo', value:'' },
        },
        dueDate: {
          elementType: 'TextField',
          elementAttri: { type: 'date', label: 'Due Date', InputLabelProps: {shrink: true}, value:'' },
        },
        careGiver: {
            elementType: 'TextField',
            elementAttri: { type: 'text', placeholder: 'Caregiver', label: 'Caregiver', value:'' },
          },
        mother: {
            elementType: 'TextField',
            elementAttri: { type: 'text', placeholder: 'Mother', label: 'Mother', value:'' },
          },
  }
const user = ["name", "email", "addressDescription", "addressNearestTown", "phoneNumber"]
const mother = ["dueDate", "careGiver", "photo"]
const driver = ["rate"]
const caregiver = ["mother"]

export const fetchOnboardingForm = (filter) => {
    const filteredInputs = {}
    user.forEach(input => {
      filteredInputs[input] = onboardingForm[input]
    })
    if (filter === 'mother') {
      mother.forEach(input => {
        filteredInputs[input] = onboardingForm[input]
      })
    }
    if (filter === 'driver') {
      driver.forEach(input => {
        filteredInputs[input] = onboardingForm[input]
      })
    }
    if (filter === 'caregiver') {
      caregiver.forEach(input => {
        filteredInputs[input] = onboardingForm[input]
      })
    }
    return filteredInputs
}