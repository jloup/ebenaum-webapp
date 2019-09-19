export interface Template {
}

interface TemplateRequestBody {}
interface TemplateRequestResponse {}

export interface API {
  '/': {
    POST: {
      body: TemplateRequestBody
      response: TemplateRequestResponse
    }
  }
}
