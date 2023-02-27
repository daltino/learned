export const journeyPath = ({ companyCode, employeeId, journeyId }) => `/${companyCode}/employees/${employeeId}/journeys/${journeyId}`

export const bitePath = ({ companyCode, employeeId, journeyId, biteId }) => `/${companyCode}/employees/${employeeId}/journeys/${journeyId}/bites/${biteId}`

export const eventsPath = ({ companyCode, journeyId }) => `/companies/${companyCode}/journeys/${journeyId}/events`
